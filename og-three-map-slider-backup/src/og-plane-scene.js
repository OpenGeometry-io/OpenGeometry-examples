let scene, renderer
let three, openGeometry

function generateOpenGeometry() {
  const oPoly = new openGeometry.OPolygon();
  console.log(oPoly)

  // oPoly.addVertex(3.0,    -2.0, 48.0, );
  // oPoly.addVertex(52.0,   -2.0, 8.0,  );
  // oPoly.addVertex(99.0,   -2.0, 50.0, );
  // oPoly.addVertex(138.0,  -2.0, 25.0, );
  // oPoly.addVertex(175.0,  -2.0, 77.0, );
  // oPoly.addVertex(131.0,  -2.0, 72.0, );
  // oPoly.addVertex(111.0,  -2.0, 113.0,);
  // oPoly.addVertex(72.0,   -2.0, 43.0, );
  // oPoly.addVertex(26.0,   -2.0, 55.0, );
  // oPoly.addVertex(29.0,   -2.0, 100.0,);

  // Create Cube
  oPoly.addVertex(2, 0, 2);
  oPoly.addVertex(-2, 0, 2);
  oPoly.addVertex(-2, 0, -2);
  oPoly.addVertex(2, 0, -2);

  oPoly.generateMesh();
  const oPolyMesh = oPoly.extrude(10);
  const oPolyGeometry = new three.BufferGeometry();
  oPolyGeometry.setAttribute('position', new three.BufferAttribute(new Float32Array(oPolyMesh), 3));
  oPolyGeometry.computeVertexNormals();

  const oPolyMaterial = new three.MeshStandardMaterial({
    color: 0x00ff00,
    side: three.DoubleSide
  });
  const oPolyMeshObj = new three.Mesh(oPolyGeometry, oPolyMaterial);
  scene.add(oPolyMeshObj);

  // Create Wireframe
  // const oPolyWireframeGeometry = new three.BufferGeometry();
  // oPolyWireframeGeometry.setAttribute('position', new three.BufferAttribute(new Float32Array(oPolyMesh), 3));
  // oPolyWireframeGeometry.computeVertexNormals();

  // const oPolyWireframeMaterial = new three.MeshBasicMaterial({
  //   color: 0x000000,
  //   wireframe: true,
  //   transparent: true
  // });
  // const oPolyWireframeMesh = new three.Mesh(oPolyWireframeGeometry, oPolyWireframeMaterial);
  // oPolyMeshObj.add(oPolyWireframeMesh);
}

function init(THREE, OG, container, parent = null) {
  scene = new THREE.Scene()
  openGeometry = OG
  three = THREE

  renderer = new THREE.WebGLRenderer({
    antialias: true
  })

  scene.background = new THREE.Color(0xf0f0f0)
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  // if (parent) {
  //   console.log('container', container)
  //   parent.appendChild(renderer.domElement)
  // } else {
  //   container.appendChild(renderer.domElement)
  // }
  container.appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0x404040, 1)
  scene.add(ambientLight)

  const dlightR = new THREE.DirectionalLight(0xffffff, 1)
  dlightR.position.set(3, 3, 3)
  scene.add(dlightR)

  const dlightL = new THREE.DirectionalLight(0xffffff, 0.7)
  dlightL.position.set(-3, 3, -3)
  scene.add(dlightL)

  const planeGeometry = new THREE.PlaneGeometry(200, 200);
  const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xe3d5ca, side: THREE.DoubleSide });
  const grid = new THREE.Mesh(planeGeometry, planeMaterial);
  grid.rotation.x = Math.PI / 2;
  scene.add(grid);

  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );
  const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
  mesh.add(wireframe);

  generateOpenGeometry();
}

function update(camera) {
  renderer.render(scene, camera)
}

export {
  renderer,
  init,
  update
}