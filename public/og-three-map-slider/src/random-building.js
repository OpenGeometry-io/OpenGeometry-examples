

export function randomBuilding(three, OG, mapScene, planeScene) {
  let openGeometry = OG

  for (let i = 0; i < 50; i++) {
    const oPoly = new openGeometry.OPolygon();

    oPoly.addVertex(2, 0, 2);
    oPoly.addVertex(-2, 0, 2);
    oPoly.addVertex(-2, 0, -2);
    oPoly.addVertex(2, 0, -2);

    oPoly.generateMesh();
    const oPolyMesh = oPoly.extrude(Math.random() * 50);
    const oPolyGeometry = new three.BufferGeometry();
    oPolyGeometry.setAttribute('position', new three.BufferAttribute(new Float32Array(oPolyMesh), 3));
    oPolyGeometry.computeVertexNormals();

    const oPolyMaterial = new three.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
      side: three.DoubleSide
    });
    const building = new three.Mesh(oPolyGeometry, oPolyMaterial);
    
    // circular fill of buildings
    const radius = 50
    const angle = Math.random() * Math.PI * 2
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    building.position.set(x, 0, z)
    
    mapScene.add(building)

    const buildingClone = building.clone()
    planeScene.add(buildingClone)

    // Wireframe
    const oPolyWireframeGeometry = new three.BufferGeometry();
    oPolyWireframeGeometry.setAttribute('position', new three.BufferAttribute(new Float32Array(oPolyMesh), 3));
    oPolyWireframeGeometry.computeVertexNormals();

    const oPolyWireframeMaterial = new three.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true
    });
    const oPolyWireframeMesh = new three.Mesh(oPolyWireframeGeometry, oPolyWireframeMaterial);
    buildingClone.add(oPolyWireframeMesh);
  }


  for (let i = 0; i < 25; i++) {
    const oPoly = new openGeometry.OPolygon();

    oPoly.addVertex(2, 0, 2);
    oPoly.addVertex(-2, 0, 2);
    oPoly.addVertex(-2, 0, -2);
    oPoly.addVertex(2, 0, -2);

    oPoly.generateMesh();
    const oPolyMesh = oPoly.extrude(Math.random() * 50);
    const oPolyGeometry = new three.BufferGeometry();
    oPolyGeometry.setAttribute('position', new three.BufferAttribute(new Float32Array(oPolyMesh), 3));
    oPolyGeometry.computeVertexNormals();

    const oPolyMaterial = new three.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
      side: three.DoubleSide
    });
    const building = new three.Mesh(oPolyGeometry, oPolyMaterial);
    
    // circular fill of buildings
    const radius = 30
    const angle = Math.random() * Math.PI * 2
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    building.position.set(x, 0, z)
    
    mapScene.add(building)
    planeScene.add(building.clone())
  }
}
