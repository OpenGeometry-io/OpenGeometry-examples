import { Vector3 } from "../opengeometry/pkg/opengeometry";
import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Pencil } from "./src/pencil";
import { SpotLabel } from "./src/markup/spotMarker";
import { OpenGeometryOptions } from "./src/base-types";
export type OUTLINE_TYPE = "front" | "side" | "top";
export declare class OpenGeometry {
    private camera;
    static version: string;
    protected scene: THREE.Scene | undefined;
    protected container: HTMLElement | undefined;
    private _pencil;
    private _labelRenderer;
    private _enableDebug;
    set enablePencil(value: boolean);
    get pencil(): Pencil | undefined;
    get labelRenderer(): CSS2DRenderer | undefined;
    get enableDebug(): boolean;
    /**
     * Enables or disables debug mode for OpenGeometry.
     * When enabled, it logs debug information to the console.
     * Addtionally,
     * 1. The geometry will be rendered with a semi-transparent material.
     * 2. The faces will be rendered with a random color.
     * 3. The normals will be rendered for better visualization.
     * @param value - A boolean indicating whether to enable or disable debug mode.
     */
    set enableDebug(value: boolean);
    constructor(container: HTMLElement, threeScene: THREE.Scene, camera: THREE.Camera);
    /**
     * Asynchronously creates and initializes an instance of OpenGeometry.
     *
     * This factory method sets up the OpenGeometry engine by linking it with the
     * rendering context and the WebAssembly module. It ensures all required
     * options are provided and prepares the instance for 3D geometry operations.
     *
     * @param options - Configuration object for initializing OpenGeometry.
     * @returns A promise that resolves to a fully initialized OpenGeometry instance.
     * @throws If any of the required options (`container`, `scene`, or `camera`) are missing.
     *
     * @example
     * ```ts
     * const openGeometry = await OpenGeometry.create({
     *   container: document.getElementById('myContainer')!,
     *   scene: threeScene,
     *   camera: threeCamera,
     *   wasmURL: '/assets/opengeometry.wasm'
     * });
     * ```
     */
    static create(options: OpenGeometryOptions): Promise<OpenGeometry>;
    private setup;
    private setuplabelRenderer;
    private setupEvent;
    /**
     * Updates the label renderer to render the scene with the given camera.
     * This method should be called in the animation loop or render loop of your application.
     * @param scene - The Three.js scene containing the objects to be rendered.
     * @param camera - The Three.js camera used for rendering the scene.
     */
    update(scene: THREE.Scene, camera: THREE.Camera): void;
}
export { Vector3, SpotLabel, };
export * from './src/primitives/';
export * from './src/shapes/';
