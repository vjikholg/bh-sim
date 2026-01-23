export const PARTICLE_COUNT : number = 1_000_000;
export const POSITION_FIELDS : number = 3; 
export const VELOCITY_FIELDS : number = POSITION_FIELDS;
export const MASS_FIELDS : number = 1; 
export const GRAVITY_FIELDS : number = 3;
export const MAX_GRAVITY_SOURCES : number = 100; 
export const CPU_COUNT : number = navigator.hardwareConcurrency;

// Raw particle data buffers 
export const RawPositionBuffers : SharedArrayBuffer = new SharedArrayBuffer(4 * PARTICLE_COUNT * POSITION_FIELDS);
export const RawVelocityBuffers : SharedArrayBuffer = new SharedArrayBuffer(4 * PARTICLE_COUNT * VELOCITY_FIELDS);
export const RawMassBuffers : SharedArrayBuffer = new SharedArrayBuffer(PARTICLE_COUNT * MASS_FIELDS);
export const RawGravityBuffer : SharedArrayBuffer = new SharedArrayBuffer(MAX_GRAVITY_SOURCES * (GRAVITY_FIELDS + MASS_FIELDS))