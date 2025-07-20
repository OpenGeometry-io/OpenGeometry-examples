import * as THREE from 'three';
import { Vector3 } from '../../../opengeometry/pkg/opengeometry';
/**
 * PolyLine defined by multiple points
 */
export declare class PolyLine extends THREE.Line {
    ogid: string;
    points: Vector3[];
    isClosed: boolean;
    private polyline;
    set color(color: number);
    constructor(points?: Vector3[]);
    addMultiplePoints(points: Vector3[]): void;
    translate(translation: Vector3): void;
    set_position(position: Vector3): void;
    addPoint(point: Vector3): void;
    private clearGeometry;
    private generateGeometry;
    getBrepData(): string | null;
    createOffset(offset: number): any;
    dispose(): void;
}
