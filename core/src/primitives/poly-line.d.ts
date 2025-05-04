import * as THREE from 'three';
import { Vector3D } from '../../../opengeometry/pkg/opengeometry';
/**
 * PolyLine defined by multiple points
 */
export declare class PolyLine extends THREE.Line {
    ogid: string;
    points: Vector3D[];
    isClosed: boolean;
    private polyline;
    set color(color: number);
    constructor(points?: Vector3D[]);
    setConfig(points: Vector3D[]): void;
    addPoint(point: Vector3D): void;
    private clearGeometry;
    private generateGeometry;
}
