import { Vector3 } from "three";
export class Particle {
    position: Vector3;
    velocity: Vector3;

    constructor(r: Vector3) {
        this.position = r; 
        this.velocity = new Vector3(0,0,0);
    }
}