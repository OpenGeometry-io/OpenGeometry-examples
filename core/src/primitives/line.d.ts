import { Vector3 } from "../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
export interface ILineOptions {
    ogid?: string;
    start: Vector3;
    end: Vector3;
    color: number;
}
/**
 * Simple Line defined by Two Points
 */
export declare class Line extends THREE.Line {
    ogid: string;
    options: ILineOptions;
    private line;
    set color(color: number);
    constructor(options?: ILineOptions);
    validateOptions(): void;
    setConfig(options: ILineOptions): void;
    /**
     * Every time there are property changes, geometry needs to be discarded and regenerated.
     * This is to ensure that the geometry is always up-to-date with the current state.
     */
    discardGeometry(): void;
    private generateGeometry;
}
