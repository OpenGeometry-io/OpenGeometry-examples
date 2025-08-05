import { Vector3 } from "../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
interface ILineOptions {
    start: Vector3;
    end: Vector3;
}
/**
 * Simple Line defined by Two Points
 */
export declare class Line extends THREE.Line {
    ogid: string;
    options: ILineOptions;
    private line;
    set color(color: number);
    constructor(options: ILineOptions);
    validateOptions(): void;
    setConfig(): void;
    private generateGeometry;
}
export {};
