import { Vector3 } from "../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
export interface ICuboidOptions {
    ogid?: string;
    center: Vector3;
    width: number;
    height: number;
    depth: number;
    color: number;
}
export declare class Cuboid extends THREE.Mesh {
    #private;
    ogid: string;
    options: ICuboidOptions;
    private cuboid;
    private _geometryCenterOffset;
    set width(value: number);
    set color(color: number);
    constructor(options?: ICuboidOptions);
    validateOptions(): void;
    setConfig(options: ICuboidOptions): void;
    cleanGeometry(): void;
    generateGeometry(): void;
    getBrepData(): any;
    set outline(enable: boolean);
    get outlineMesh(): THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | null;
    discardGeometry(): void;
}
