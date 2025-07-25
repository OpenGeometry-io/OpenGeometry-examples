import * as THREE from 'three';
interface BasePrimitiveOptions {
    [key: string]: any;
}
export declare abstract class BasePrimitive extends THREE.Line {
    abstract setConfig(options: BasePrimitiveOptions): void;
    abstract getConfig(): any;
    abstract generateGeometry(): void;
    abstract discardGeometry(): void;
}
export {};
