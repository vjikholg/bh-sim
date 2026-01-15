import { Vector3 } from "three/src/Three.Core.js";

/**
 * Determines the newtonian acceleration of the given particle. 
 * 
 * @param r position vector of the particle 
 * @param mu G*M_{bh} (Gravitational Contant * Mass of black hole)
 * @param eps2 ("small" term to prevent acceleration from blowing up at |r| = 0)
 * @returns Vector3 describing instantaneous acceleration at a single point 
 */
export function newtonAcceleration(r: Vector3, mu: number, eps2: number = 0.001) : Vector3 { 
    const r_mag : number = r.length(); 
    const accel_constant : number = -mu / (r_mag  + eps2^2) ^ (3/2);
    const accel : Vector3 = new Vector3(accel_constant*r.x, accel_constant*r.y, accel_constant*r.z); // 
    return accel; 
}

