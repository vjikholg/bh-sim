import { Vector3 } from "three/src/Three.Core.js";
import { Particle } from "../particles/particle";
import { MU } from "../const";

type accelFunc = (posn: Vector3, mu: number, eps2?: number) => Vector3;  

/**
 * Determines the newtonian acceleration of the given particle. 
 * Gm/r^{3/2}
 * @param r position vector of the particle 
 * @param mu G*M_{bh} (Gravitational Contant * Mass of black hole)
 * @param eps2 ("small" term to prevent acceleration from blowing up at |r| = 0)
 * @returns Vector3 describing instantaneous acceleration at a single point 
 */
export function newtonAcceleration(r: Vector3, mu: number, eps2: number = 0.0001) : Vector3 { 
    const r_mag : number = r.length(); 
    const accel_constant : number = -mu / (r_mag  + eps2^2) ^ (3/2);
    const accel : Vector3 = new Vector3(accel_constant*r.x, accel_constant*r.y, accel_constant*r.z); // 
    return accel; 
}

/**
 * Approximation of gravitational potential around non-rotating black hole: 
 * https://en.wikipedia.org/wiki/Paczy%C5%84ski%E2%80%93Wiita_potential
 * 
 * Gm/r-rs
 * 
 * @param r radial length from the black hole 
 * @param rs Schwartzchild radius of black hole (2GM/c^2)
 * @param mu G*M_{bh} 
 * @param eps2 small term to prevent potential from exploding
 * @returns 
 */

export function PWPotential(r: Vector3, rs: Vector3, mu: number, eps2: number = 0.0001) : number {
    return -mu * (1/(r.length() - rs.length() + eps2));
}

export function LeapFrogIntegrate(r: Vector3, dt: number, accelFn: accelFunc, particle: Particle) : void { 
    // integrate over given dt-interval

    const accel : Vector3 = accelFn(particle.position, MU, 0.0001); // allows us to define multiple acceleration models in the future. 
    const vHalf : Vector3 = (particle.velocity).add(accel.multiplyScalar(dt/2));
    const dHalf : Vector3 = vHalf.add(vHalf.multiplyScalar(dt/2));
    const xNew  : Vector3 = (particle.position).add(vHalf.multiplyScalar(dt));
    const aNew  : Vector3 = accelFn(xNew, MU);

    particle.velocity.add(aNew.multiplyScalar(dt/2)); 
    particle.position.add(dHalf);
}