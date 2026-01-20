import { ByteVector } from "./ByteVector";
import { Particle } from "../particles/particle";
import { MU, SAG_RS } from "../const";

/**
 * Describes general form acceleration function should take. Passing only the position vector (modifible mu, epsilon)
 * ensures we aren't passing or calculating too many values at once. important for perf. Tempted to inline 
 */
export type accelFunc = (posn: ByteVector, mu: number, eps2?: number) => ByteVector;

/**
 * Determines the newtonian acceleration of the given particle. 
 * Gm/|r|^{3/2}
 * @param r position vector of the particle 
 * @param mu G*M_{bh} (Gravitational Contant * Mass of black hole)
 * @param eps2 ("small" term to prevent acceleration from blowing up at |r| = 0)
 * @returns Vector3 describing instantaneous acceleration at a single point 
 */
export function newtonAcceleration(r: ByteVector, mu: number = MU, eps2: number = 0.0001) : ByteVector { 
    const radial_accel_mag : number = -mu / (r.magnitude() + eps2)^2
    const radial_vector : ByteVector = r.unit();
    const radial_accel : ByteVector = radial_vector.scalar(radial_accel_mag);
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
export function PWAccel(r: ByteVector,  mu: number = MU,  eps: number = 0.001) : ByteVector { 
    const radial_accel_mag : number = mu / (r.magnitude() - SAG_RS + eps)^2 // epsilon term = avoid explosion
    const radial_vector : ByteVector = r.unit() // grab radial unit vector
    const radial_accel : ByteVector = radial_vector.scalar(radial_accel_mag); // grab radial acceleration
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
    // we'll want to do this in place, i.e., the particle is updated given constraints. 


    const accel : ByteVector = accelFn(particle.position, MU, 0.0001); // allows us to define multiple acceleration models in the future.
    // get vhalf
    
    const vHalf : ByteVector = (particle.velocity).add(accel.scalar(dt/2));
    const dHalf : ByteVector = vHalf.add(vHalf.scalar(dt/2));
    const xNew  : ByteVector = (particle.position).add(vHalf.scalar(dt));
    const aNew  : ByteVector = accelFn(xNew, MU);

    particle.velocity.add(aNew.scalar(dt/2)); 
    particle.position.add(dHalf);
}