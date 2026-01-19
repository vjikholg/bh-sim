import { Vector3 } from "three/src/Three.Core.js";
import { Particle } from "../particles/particle";
import { MU, SAG_RS } from "../const";

/**
 * Describes general form acceleration function should take. Passing only the position vector (modifible mu, epsilon)
 * ensures we aren't passing or calculating too many values at once. important for perf. Tempted to inline 
 */
type accelFunc = (posn: Vector3, mu: number, eps2?: number) => Vector3;

/**
 * Helper func that returns unit vector of given pos'n vector r. 
 * @param r 
 * @returns 
 */
function UnitVector(r: Vector3) : Vector3{
    return r.multiplyScalar(1/r.length())
}

/**
 * Determines the newtonian acceleration of the given particle. 
 * Gm/|r|^{3/2}
 * @param r position vector of the particle 
 * @param mu G*M_{bh} (Gravitational Contant * Mass of black hole)
 * @param eps2 ("small" term to prevent acceleration from blowing up at |r| = 0)
 * @returns Vector3 describing instantaneous acceleration at a single point 
 */
export function newtonAcceleration(r: Vector3, mu: number = MU, eps2: number = 0.0001) : Vector3 { 
    const radial_accel_mag : number = -mu / (r.length() + eps2)^2
    const radial_vector : Vector3 = UnitVector(r); 
    const radial_accel : Vector3 = radial_vector.multiplyScalar(radial_accel_mag);
    return radial_accel;
}
/**
 * Pacyznski-Witta acceleration derived from Paczynski-Witta potential. 
 * r-hat is derived from a particle's cartesian coordinates. 
 *  
 * @param r a particle's position
 * @param rs schwartzchild radius
 * @param mu gravitational constant * central mass 
 * @param eps clamping constant = 0.001, avoid acceleration explosion
 * @returns 
 */

export function PWAccel(r: Vector3,  mu: number = MU,  eps: number = 0.001) : Vector3 { 
    const radial_accel_mag : number = mu / (r.length() - SAG_RS + eps)^2 // epsilon term = avoid explosion
    const radial_vector : Vector3 = UnitVector(r) // grab radial unit vector
    const radial_accel : Vector3 = radial_vector.multiplyScalar(radial_accel_mag); // grab radial acceleration
    return radial_accel; 
}

/**
 * advances the simulation by dt "ticks". 
 * @param r 
 * @param dt 
 * @param accelFn 
 * @param particle 
 */
export function LeapFrogIntegrate(particle: Particle, dt: number, accelFn: accelFunc) : void { 
    // integrate over given dt-interval

    const accel : Vector3 = accelFn(particle.position, MU, 0.0001); // allows us to define multiple acceleration models in the future. 
    const vHalf : Vector3 = (particle.velocity).add(accel.multiplyScalar(dt/2));
    const dHalf : Vector3 = vHalf.add(vHalf.multiplyScalar(dt/2));
    const xNew  : Vector3 = (particle.position).add(vHalf.multiplyScalar(dt));
    const aNew  : Vector3 = accelFn(xNew, MU);

    particle.velocity.add(aNew.multiplyScalar(dt/2)); 
    particle.position.add(dHalf);
}