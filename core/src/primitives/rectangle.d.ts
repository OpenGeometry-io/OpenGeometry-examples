import { OGRectangle } from "./../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
import { RectangeOptions } from "../base-types";
/**
 * Rectangle
 */
export declare class Rectangle extends THREE.Line {
    #private;
    ogid: string;
    polyLineRectangle: OGRectangle;
    options: RectangeOptions;
    nodeOperation: String;
    set width(width: number);
    set breadth(breadth: number);
    set color(color: number);
    constructor(options: RectangeOptions);
    setConfig(): void;
    generateGeometry(): void;
    discardGeometry(): void;
}
