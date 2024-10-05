let scene, renderer
let three, openGeometry

function generateOpenGeometry() {
  const oPoly = new openGeometry.OPolygon();
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
}

function init(THREE, OG, container, parent = null) {
  scene = new THREE.Scene()
  openGeometry = OG
  three = THREE

  renderer = new THREE.WebGLRenderer({
    antialias: true
  })

  scene.background = new THREE.Color(0xfef9ff)
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
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

  const gridHelper = new THREE.PolarGridHelper(500, 40, 40, 64, 0x000000, 0x000000);
  scene.add(gridHelper);

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
  scene,
  init,
  update
}