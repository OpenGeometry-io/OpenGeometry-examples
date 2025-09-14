import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Event } from "./utils/event";
/**
 * Whenever you want something to work with pencil you should add it to pencil object
 */
export type PencilMode = "draw" | "erase" | "select" | "cursor" | "view";
export declare class Pencil {
    private camera;
    private container;
    private scene;
    private raycaster;
    pencilMeshes: THREE.Object3D[];
    cursor: CSS2DObject | undefined;
    onCursorDown: Event<THREE.Vector3>;
    onCursorMove: Event<THREE.Vector3>;
    onElementHover: Event<{
        mesh: THREE.Mesh;
        point: THREE.Vector3;
    }>;
    onElementSelected: Event<{
        mesh: THREE.Mesh;
        point: THREE.Vector3;
    }>;
    onElementUnselected: Event<{
        mesh: THREE.Mesh;
        point: THREE.Vector3;
    }>;
    pencilMode: PencilMode;
    private dummyPlane;
    constructor(container: HTMLElement, scene: THREE.Scene, camera: THREE.Camera);
    set mode(mode: PencilMode);
    get drawingCanvas(): THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | undefined;
    setup(): void;
    groundVisible(visible: boolean): void;
    setupCursor(): void;
    setupCursorEvent(): void;
    fireCursor(mouse: MouseEvent): void;
    fireCursorMove(mouse: MouseEvent): void;
}
