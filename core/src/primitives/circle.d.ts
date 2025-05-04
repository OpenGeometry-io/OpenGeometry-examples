import { CircleArc } from "./../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
import { IBaseCircleOptions } from "../base-types";
export declare class BaseCircle extends THREE.Line {
    ogid: string;
    circleArc: CircleArc;
    options: IBaseCircleOptions;
    nodeOperation: String;
    set color(color: number);
    constructor(options: IBaseCircleOptions);
    setConfig(): void;
    generateGeometry(): void;
    discardGeoemtry(): void;
    set radius(radius: number);
}
