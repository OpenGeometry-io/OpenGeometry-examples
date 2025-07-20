import { Vector3 } from "./../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
/**
 * Simple Line defined by Two Points
 */
export declare class SimpleLine extends THREE.Line {
    ogid: string;
    points: Vector3[];
    set color(color: number);
    constructor(start?: Vector3, end?: Vector3);
    addPoint(point: Vector3): void;
    private generateGeometry;
}
