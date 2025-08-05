import { OGCube, Vector3 } from "./../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
interface ICubeOptions {
    width: number;
    height: number;
    depth: number;
    center?: Vector3;
}
export declare class Cube extends THREE.Mesh {
    #private;
    ogid: string;
    options: ICubeOptions;
    cube: OGCube;
    private _geometryCenterOffset;
    constructor(options: ICubeOptions);
    validateOptions(): void;
    setConfig(): void;
    generateGeometry(): void;
    set outline(enable: boolean);
    get outlineMesh(): THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | null;
}
export {};
