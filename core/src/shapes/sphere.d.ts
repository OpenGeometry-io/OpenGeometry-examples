import { Vector3 } from "../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
export interface ISphereOptions {
    ogid?: string;
    center: Vector3;
    radius: number;
    widthSegments: number;
    heightSegments: number;
    color: number;
}
export declare class Sphere extends THREE.Mesh {
    #private;
    ogid: string;
    options: ISphereOptions;
    private sphere;
    set radius(value: number);
    set color(color: number);
    constructor(options?: ISphereOptions);
    validateOptions(): void;
    setConfig(options: ISphereOptions): void;
    cleanGeometry(): void;
    generateGeometry(): void;
    getBrep(): any;
    set outline(enable: boolean);
    get outlineMesh(): THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | null;
    discardGeometry(): void;
}
