import { OGCube, Vector3 } from "./../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
interface IOpeningOptions {
    width: number;
    height: number;
    depth: number;
    center?: Vector3;
}
export declare class Opening extends THREE.Mesh {
    #private;
    ogid: string;
    options: IOpeningOptions;
    cube: OGCube;
    private _geometryCenterOffset;
    set width(value: number);
    set height(value: number);
    set depth(value: number);
    get dimensions(): {
        width: number;
        height: number;
        depth: number;
    };
    constructor(options: IOpeningOptions);
    validateOptions(): void;
    setConfig(): void;
    cleanGeometry(): void;
    generateGeometry(): void;
    set outline(enable: boolean);
    get outlineMesh(): THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | null;
}
export {};
