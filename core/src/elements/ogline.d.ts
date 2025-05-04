import { Vector3D } from "opengeometry/pkg/opengeometry";
import * as THREE from "three";
/**
 * Simple Line defined by Two Points
 */
export declare class SimpleLine extends THREE.Line {
    ogid: string;
    points: Vector3D[];
    constructor(start?: Vector3D, end?: Vector3D);
    addPoint(point: Vector3D): void;
    private generateGeometry;
}
