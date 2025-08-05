import { OGCylinderOld, Vector3 } from "../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
interface ICylinderOptions {
    radius: number;
    height: number;
    segments: number;
    angle: number;
    center?: Vector3;
}
export declare class CylinderOld extends THREE.Mesh {
    #private;
    ogid: string;
    options: ICylinderOptions;
    cylinder: OGCylinderOld;
    private _geometryCenterOffset;
    constructor(options: ICylinderOptions);
    validateOptions(): void;
    setConfig(): void;
    generateGeometry(): void;
    set outline(enable: boolean);
    getBrepData(): void;
}
export {};
