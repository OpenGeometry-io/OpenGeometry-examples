import * as THREE from "three";
import { OGPolygon, Vector3 } from "../../../opengeometry/pkg/opengeometry";
interface IPolygonOptions {
    vertices: Vector3[];
}
export declare class Polygon extends THREE.Mesh {
    #private;
    ogid: string;
    options: IPolygonOptions;
    polygon: OGPolygon;
    transformationMatrix: THREE.Matrix4;
    set color(color: number);
    private _geometryCenterOffset;
    constructor(options?: IPolygonOptions);
    validateOptions(): void;
    setConfig(): void;
    generateGeometry(): void;
    addVertices(vertices: Vector3[]): void;
    saveTransformationToBREP(): void;
    addHole(holeVertices: Vector3[]): void;
    getBrepData(): string | null;
    set outlineColor(color: number);
    get outlineColor(): number;
    set outline(enable: boolean);
    get outline(): boolean;
    disposeGeometryMaterial(): void;
    dispose(): void;
}
export {};
