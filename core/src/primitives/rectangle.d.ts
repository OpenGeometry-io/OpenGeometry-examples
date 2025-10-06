import { Vector3 } from "./../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
export interface IRectangleOptions {
    ogid?: string;
    center: Vector3;
    width: number;
    breadth: number;
    color: number;
}
export declare class Rectangle extends THREE.Line {
    ogid: string;
    options: IRectangleOptions;
    private polyLineRectangle;
    set color(color: number);
    constructor(options?: IRectangleOptions);
    validateOptions(): void;
    setConfig(options: IRectangleOptions): void;
    getConfig(): IRectangleOptions;
    private generateGeometry;
    getBrep(): any;
    discardGeometry(): void;
}
