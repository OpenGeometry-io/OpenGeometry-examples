import { Vector3 } from "../opengeometry/pkg/opengeometry";
import { SpotLabel } from "./src/markup/spotMarker";
import { OpenGeometryOptions } from "./src/base-types";
export type OUTLINE_TYPE = "front" | "side" | "top";
export declare class OpenGeometry {
    static version: string;
    static instance: OpenGeometry | null;
    private _enableDebug;
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
    constructor();
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
}
export { Vector3, SpotLabel, };
export * from './src/primitives/';
export * from './src/shapes/';
