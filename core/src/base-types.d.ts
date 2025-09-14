import * as THREE from 'three';
import { Vector3 } from "./../../opengeometry/pkg/opengeometry";
export declare const OPEN_GEOMETRY_THREE_VERSION = "0.0.1";
export interface OpenGeometryOptions {
    container: HTMLElement;
    scene: THREE.Scene;
    camera: THREE.Camera;
    wasmURL: string;
}
export interface IArcOptions {
    radius: number;
    segments: number;
    startAngle: number;
    endAngle: number;
}
export interface IRectangeOptions {
    ogid?: string;
    width: number;
    breadth: number;
    center: Vector3;
    color: number;
}
