import * as THREE from 'three';
import { Vector3 } from '../../../opengeometry/pkg/opengeometry';
export interface IPolylineOptions {
    ogid?: string;
    color: number;
    points: Vector3[];
}
export declare class Polyline extends THREE.Line {
    #private;
    ogid: string;
    options: IPolylineOptions;
    isClosed: boolean;
    private polyline;
    transformationMatrix: THREE.Matrix4;
    set color(color: number);
    constructor(options?: IPolylineOptions);
    validateOptions(): void;
    setConfig(options: IPolylineOptions): void;
    addPoint(point: Vector3): void;
    /**
     * Every time there are property changes, geometry needs to be discarded and regenerated.
     * This is to ensure that the geometry is always up-to-date with the current state.
     */
    discardGeometry(): void;
    private generateGeometry;
}
