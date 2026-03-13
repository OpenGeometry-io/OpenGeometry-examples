import * as THREE from "three";
import { OGSweptShape, Vector3 } from "../../../opengeometry/pkg/opengeometry";
interface ISweptShapeOptions {
    ogid?: string;
    color?: number;
    profileVertices?: Vector3[];
    pathPoints?: Vector3[];
}
/**
 * SweptShape class that extends THREE.Mesh
 * Creates a 3D shape by sweeping a 2D profile along a 3D path
 */
export declare class SweptShape extends THREE.Mesh {
    #private;
    ogid: string;
    options: ISweptShapeOptions;
    sweptShape: OGSweptShape;
    transformationMatrix: THREE.Matrix4;
    get color(): number;
    set color(color: number);
    constructor(options?: ISweptShapeOptions);
    validateOptions(): void;
    setConfig(options?: ISweptShapeOptions): void;
    /**
     * Generate geometry from the swept shape
     */
    generateGeometry(): void;
    /**
     * Set the profile vertices for the sweep operation
     */
    setProfileVertices(vertices: Vector3[]): void;
    /**
     * Set the path points for the sweep operation
     */
    setPathPoints(points: Vector3[]): void;
    /**
     * Create a swept shape from a profile and path
     */
    sweepAlongPath(profileVertices: Vector3[], pathPoints: Vector3[]): void;
    /**
     * Get the B-Rep data from the swept shape
     */
    getBrepData(): string | null;
    /**
     * Clear the swept shape data
     */
    clearSweptShape(): void;
    /**
     * Dispose of geometry and material resources
     */
    disposeGeometry(): void;
    /**
     * Enable/disable outline rendering
     */
    set outline(enable: boolean);
    get outline(): boolean;
    get outlineMesh(): THREE.Line | null;
    /**
     * Dispose of all resources when the object is destroyed
     */
    dispose(): void;
}
export {};
