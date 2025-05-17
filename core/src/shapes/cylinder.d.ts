import { OGCylinder, Vector3D } from "./../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
interface ICylinderOptions {
    radius: number;
    height: number;
    segments: number;
    angle: number;
    center?: Vector3D;
}
export declare class Cylinder extends THREE.Mesh {
    #private;
    ogid: string;
    options: ICylinderOptions;
    cylinder: OGCylinder;
    private _geometryCenterOffset;
    constructor(options: ICylinderOptions);
    validateOptions(): void;
    setConfig(): void;
    generateGeometry(): void;
    set outline(enable: boolean);
    getBrepData(): void;
}
export {};
