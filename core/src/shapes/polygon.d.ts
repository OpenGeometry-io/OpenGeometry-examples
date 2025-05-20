import * as THREE from "three";
import { OGPolygon, Vector3D } from "../../../opengeometry/pkg/opengeometry";
export declare class Polygon extends THREE.Mesh {
    #private;
    ogid: string;
    layerVertices: Vector3D[];
    layerBackVertices: Vector3D[];
    polygon: OGPolygon | null;
    isTriangulated: boolean;
    private _geometryCenterOffset;
    constructor(vertices?: Vector3D[]);
    addVertices(vertices: Vector3D[]): void;
    resetVertices(): void;
    addVertex(threeVertex: Vector3D): void;
    addHole(holeVertices: Vector3D[]): void;
    addFlushBufferToScene(flush: string): void;
    extrude(height: number): void;
    generateExtrudedGeometry(extruded_buff: string): void;
    getBrepData(): void;
    set outline(enable: boolean);
    get outline(): boolean;
}
