import * as THREE from 'three';
import { Vector3 } from '../../../opengeometry/pkg/opengeometry';
interface IPolyLineOptions {
    points: Vector3[];
}
export declare class Polyline extends THREE.Line {
    #private;
    ogid: string;
    options: IPolyLineOptions;
    isClosed: boolean;
    private polyline;
    transformationMatrix: THREE.Matrix4;
    set color(color: number);
    constructor(options?: IPolyLineOptions);
    validateOptions(): void;
    setConfig(): void;
    addPoint(point: Vector3): void;
    /**
     * Every time there are property changes, geometry needs to be discarded and regenerated.
     * This is to ensure that the geometry is always up-to-date with the current state.
     */
    private clearGeometry;
    saveTransformationToBREP(): void;
    private generateGeometry;
}
export {};
