export class        ByteVector {
    contents: Float32Array; 
    constructor(x?: number, y?: number, z?: number) { 
        this.contents = new Float32Array(3)
        this.contents[0] = x || 0;
        this.contents[1] = y || 0; 
        this.contents[2] = z || 0;
    }

    magnitude() : number { 
        return this.contents[0]*this.contents[0] + 
        this.contents[1]*this.contents[1] + 
        this.contents[2]*this.contents[2];
    }


    scalar(n: number) : ByteVector {
        return new ByteVector(
            this.contents[0] * n, 
            this.contents[1] * n, 
            this.contents[2] * n, 
        )
    }

    toUnit() : void {
        const inv_mag : number = 1/this.magnitude();
        this.scalar(inv_mag);
    }

    unit() : ByteVector {
        const c : Float32Array = this.contents;
        const inv_mag : number = 1/this.magnitude();
        return new ByteVector(c[0]*inv_mag, c[1]*inv_mag, c[2]*inv_mag);
    }
    
    dot(v: ByteVector) : number { 
        const c: Float32Array = v.contents;
        let sol : number = 0; 
        for (let i = 0; i < 3; i++) {
            sol += c[i] * this.contents[i];
        }
        return sol;
    }

    add(v: ByteVector) : void{
        this.contents[0] += v.contents[0];
        this.contents[1] += v.contents[1];
        this.contents[2] += v.contents[2];
    }
}