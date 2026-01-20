import { ByteVector } from "../physics/ByteVector";
import { LeapFrogIntegrate, accelFunc, PWAccel} from "../physics/gravity";
export class Particle {
    position: ByteVector;
    velocity: ByteVector;

    constructor(r?: Float32Array) {
        this.position = new ByteVector();
        this.velocity = new ByteVector();
    }
    
    /**
     * Integrates the particle by dt. default is PWAcceleration (most stable) but we can play around with it.
     * @param dt time-interval to integrate over
     * @param func acceleration function to use 
     */
    integrate(dt: number, func: accelFunc = PWAccel) : void {
        LeapFrogIntegrate(this, dt, func);
    }
}