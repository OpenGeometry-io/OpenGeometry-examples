import { OGCube, Vector3 } from "../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
interface ICubiodOptions {
    width: number;
    height: number;
    depth: number;
    center?: Vector3;
}
export declare class Cubiod extends THREE.Mesh {
    #private;
    ogid: string;
    options: ICubiodOptions;
    cube: OGCube;
    private _geometryCenterOffset;
    set width(value: number);
    constructor(options: ICubiodOptions);
    validateOptions(): void;
    setConfig(): void;
    cleanGeometry(): void;
    generateGeometry(): void;
    getBrepData(): string | null;
    set outline(enable: boolean);
    get outlineMesh(): THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | null;
}
export {};
