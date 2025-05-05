import { Vector3D, BasePolygon } from "../opengeometry/pkg/opengeometry";
import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Pencil } from "./src/pencil";
import { SpotLabel } from "./src/markup/spotMarker";
import { OpenGeometryOptions } from "./src/base-types";
import { BaseCircle } from "./src/primitives/circle";
import { Rectangle } from "./src/primitives/rectangle";
export type OUTLINE_TYPE = "front" | "side" | "top";
export declare class OpenGeometry {
    private camera;
    static version: string;
    protected scene: THREE.Scene | undefined;
    protected container: HTMLElement | undefined;
    private _pencil;
    private _labelRenderer;
    constructor(container: HTMLElement, threeScene: THREE.Scene, camera: THREE.Camera);
    static create(options: OpenGeometryOptions): Promise<OpenGeometry>;
    private setup;
    get pencil(): Pencil | undefined;
    get labelRenderer(): CSS2DRenderer | undefined;
    setuplabelRenderer(): void;
    setupEvent(): void;
    update(scene: THREE.Scene, camera: THREE.Camera): void;
}
export declare class BasePoly extends THREE.Mesh {
    ogid: string;
    layerVertices: Vector3D[];
    layerBackVertices: Vector3D[];
    polygon: BasePolygon | null;
    isTriangulated: boolean;
    constructor(vertices?: Vector3D[]);
    addVertices(vertices: Vector3D[]): void;
    resetVertices(): void;
    addVertex(threeVertex: Vector3D): void;
    addHole(holeVertices: Vector3D[]): void;
    addFlushBufferToScene(flush: string): void;
    extrude(height: number): void;
    generateExtrudedGeometry(extruded_buff: string): void;
}
export declare class CirclePoly extends THREE.Mesh {
    ogid: string;
    polygon: BasePolygon | null;
    baseCircle: BaseCircle;
    isExtruded: boolean;
    constructor(baseCircle: BaseCircle);
    update(): void;
    generateGeometry(): void;
    addFlushBufferToScene(): void;
    clearGeometry(): void;
    extrude(height: number): void;
    getOutline(type: OUTLINE_TYPE): THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.MeshBasicMaterial, THREE.Object3DEventMap> | undefined;
    generateExtrudedGeometry(extruded_buff: string): void;
}
export declare class RectanglePoly extends THREE.Mesh {
    ogid: string;
    polygon: BasePolygon | null;
    baseRectangle: Rectangle;
    isExtruded: boolean;
    constructor(baseRectangle: Rectangle);
    update(): void;
    generateGeometry(): void;
    addFlushBufferToScene(): void;
    clearGeometry(): void;
    extrude(height: number): void;
    generateExtrudedGeometry(extruded_buff: string): void;
    getOutline(type: OUTLINE_TYPE): THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.MeshBasicMaterial, THREE.Object3DEventMap> | undefined;
}
/**
 * Base Flat Mesh
 */
export declare class FlatMesh extends THREE.Mesh {
    constructor(vertices: Vector3D[]);
}
export { Vector3D, SpotLabel, };
export * from './src/primitives/';
