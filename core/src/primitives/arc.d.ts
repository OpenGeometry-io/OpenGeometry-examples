import { Vector3 } from "../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
export interface IArcOptions {
    ogid?: string;
    center: Vector3;
    radius: number;
    startAngle: number;
    endAngle: number;
    segments: number;
}
export declare class Arc extends THREE.Line {
    #private;
    ogid: string;
    options: IArcOptions;
    private arc;
    set color(color: number);
    constructor(options?: IArcOptions);
    validateOptions(): void;
    setConfig(options: IArcOptions): void;
    getConfig(): IArcOptions;
    private generateGeometry;
    getBrep(): any;
    discardGeometry(): void;
}
