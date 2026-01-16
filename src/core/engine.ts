import { Camera, Scene } from "three";
import { Renderer } from "./renderer";
import { Time } from "./time";
import { Resize } from "./resize";
import { BlackHole } from "../sim/bh/blackhole";
import { ParticleSystem } from "../sim/particles/particlesystem";
import { PostProcess } from "../render/postprocess";

export class Engine { 
    scene: Scene; 
    camera: Camera; 
    renderer: Renderer; 
    time: Time; 
    resize: Resize;

    blackHole: BlackHole; 
    particles: ParticleSystem; 
    postprocess: PostProcess;

    constructor(canvas: HTMLCanvasElement) {
        // hook onto canvas in HTML, init fields
        this.scene = new Scene();
    }

    /**
     * Updates the simulation by a given tick amount. Decoupled from physics engine so logic + fps are separated. i am not noob!
     * @param dt number of ticks to advance, expect 1.
     */
    update(dt: number = 1) : void {

    }
    
    /**
     * Handles rendering
     */
    render() : void {

    }


}