import { IRectangeOptions } from "../base-types";
import { BaseLinePrimitive } from "./base-line-primitive";
export declare class Rectangle extends BaseLinePrimitive {
    ogid: string;
    options: IRectangeOptions;
    private polyLineRectangle;
    set color(color: number);
    constructor(options?: IRectangeOptions);
    validateOptions(): void;
    setConfig(): void;
    getConfig(): IRectangeOptions;
    generateGeometry(): void;
    getBrep(): any;
    discardGeometry(): void;
}
