import { Vector3 } from "./../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
interface IOpeningOptions {
    ogid?: string;
    center: Vector3;
    width: number;
    height: number;
    depth: number;
    color: number;
}
export declare class Opening extends THREE.Mesh {
    #private;
    ogid: string;
    options: IOpeningOptions;
    private opening;
    private _geometryCenterOffset;
    set width(value: number);
    set height(value: number);
    set depth(value: number);
    get dimensions(): {
        width: number;
        height: number;
        depth: number;
    };
    constructor(options?: IOpeningOptions);
    validateOptions(): void;
    setConfig(options: IOpeningOptions): void;
    cleanGeometry(): void;
    generateGeometry(): void;
    getBrepData(): any;
    set outline(enable: boolean);
    get outlineMesh(): THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | null;
    discardGeometry(): void;
}
export {};
