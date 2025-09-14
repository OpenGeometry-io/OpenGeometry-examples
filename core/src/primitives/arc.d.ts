import { Vector3 } from "../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
interface IArcOptions {
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
    constructor(options: IArcOptions);
    validateOptions(): void;
    setConfig(): void;
    private generateGeometry;
    discardGeoemtry(): void;
}
export {};
