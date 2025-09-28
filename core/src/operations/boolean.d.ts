import { OGBrep } from "../../../opengeometry/pkg/opengeometry";
import * as THREE from "three";
export interface BooleanCompatible {
    getOGBrep(): OGBrep;
    generate_geometry?(): void;
}
export interface BooleanResult {
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
    mesh: THREE.Mesh;
    ogBrep: OGBrep;
}
export interface GeometryData {
    vertices: number[];
    indices: number[];
    triangleCount: number;
    vertexCount: number;
    geometryType: string;
}
export interface EnhancedMesh extends THREE.Mesh {
    ogBrep: OGBrep;
    geometryType: string;
    triangleCount: number;
    booleanOperation: string;
}
export interface MeshPrimitive {
    getOGBrep(): OGBrep;
    getBooleanResult(): BooleanResult;
    refresh(): void;
}
export declare class BooleanOperations {
    private engine;
    constructor(tolerance?: number);
    /**
     * Performs a union boolean operation on two objects
     */
    union(a: BooleanCompatible, b: BooleanCompatible): BooleanResult;
    /**
     * Performs an intersection boolean operation on two objects
     */
    intersection(a: BooleanCompatible, b: BooleanCompatible): BooleanResult;
    /**
     * Performs a difference boolean operation (A - B)
     */
    difference(a: BooleanCompatible, b: BooleanCompatible): BooleanResult;
    /**
     * Performs a symmetric difference boolean operation (A XOR B)
     */
    symmetricDifference(a: BooleanCompatible, b: BooleanCompatible): BooleanResult;
    /**
     * Gets the tolerance used by the boolean engine
     */
    get tolerance(): number;
    private validateInputs;
    private createBooleanResult;
    private createMaterialForOperation;
    /**
     * Creates a mesh primitive from boolean result for integration with OpenGeometry system
     */
    static createMeshPrimitive(result: BooleanResult): MeshPrimitive & THREE.Mesh;
    /**
     * Utility method to check if an object supports boolean operations
     */
    static isCompatible(obj: unknown): obj is BooleanCompatible;
    /**
     * Gets information about an object's boolean compatibility
     */
    static getCompatibilityInfo(obj: unknown): {
        compatible: boolean;
        reason?: string;
        triangleCount?: number;
        geometryType?: string;
    };
}
