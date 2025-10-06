import { Vector3 } from "../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
export interface ICylinderOptions {
    ogid?: string;
    center: Vector3;
    radius: number;
    height: number;
    segments: number;
    angle: number;
    color: number;
}
export declare class Cylinder extends THREE.Mesh {
    #private;
    ogid: string;
    options: ICylinderOptions;
    private cylinder;
    set radius(value: number);
    set color(color: number);
    constructor(options?: ICylinderOptions);
    validateOptions(): void;
    setConfig(options: ICylinderOptions): void;
    cleanGeometry(): void;
    generateGeometry(): void;
    getBrep(): any;
    set outline(enable: boolean);
    discardGeometry(): void;
}
