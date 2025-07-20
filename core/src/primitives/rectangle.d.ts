import { Vector3 } from "./../../../opengeometry/pkg/opengeometry";
import { RectangeOptions } from "../base-types";
import { BasePrimitive } from "./base-primitive";
/**
 * Rectangle
 */
export declare class Rectangle extends BasePrimitive {
    private polyLineRectangle;
    options: RectangeOptions;
    set width(width: number);
    set breadth(breadth: number);
    set center(center: Vector3);
    set color(color: number);
    constructor(options?: RectangeOptions);
    setConfig(options: RectangeOptions): void;
    getConfig(): RectangeOptions;
    generateGeometry(): void;
    discardGeometry(): void;
}
