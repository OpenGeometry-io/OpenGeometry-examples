import * as THREE from "three";
import { OGPolygon, Vector3 } from "../../../opengeometry/pkg/opengeometry";
export declare class Polygon extends THREE.Mesh {
    #private;
    ogid: string;
    layerVertices: Vector3[];
    layerBackVertices: Vector3[];
    polygon: OGPolygon | null;
    isTriangulated: boolean;
    private _geometryCenterOffset;
    constructor(vertices?: Vector3[]);
    translate(translation: Vector3): void;
    addVertices(vertices: Vector3[]): void;
    resetVertices(): void;
    addVertex(threeVertex: Vector3): void;
    addHole(holeVertices: Vector3[]): void;
    addFlushBufferToScene(flush: string): void;
    extrude(height: number): void;
    generateExtrudedGeometry(extruded_buff: string): void;
    getBrepData(): string | null;
    set outlineColor(color: number);
    get outlineColor(): number;
    set outline(enable: boolean);
    get outline(): boolean;
    bTree(): void;
    dispose(): void;
}
