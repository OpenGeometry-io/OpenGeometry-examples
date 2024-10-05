let map, modelTransform
let scene, renderer
let clock, three
let openGeometry

function generateMapLayer() {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFuZXZpc2h3YWplZXQxIiwiYSI6ImNsN2NrYnJiZzB0bWkzb254eG9nMjc4ZWkifQ.62_f1MIY7KL8MXJTyZUGkw';
  map = new mapboxgl.Map({
    container: 'sub-canvas-right',
    style: 'mapbox://styles/mapbox/navigation-day-v1',
    zoom: 17,
    center: [-4.278989, 55.869400],
    pitch: 45,
    antialias: true
  })
  
  const modelOrigin = [-4.278989, 55.869400];
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, 0, 0];

  const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
  )

  modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since the 3D model is in real world meters, a scale transform needs to be
      * applied since the CustomLayerInterface expects units in MercatorCoordinates.
      */
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 3
  }
}

function generateOpenGeometry(OG) {
  openGeometry = OG
}

function generateThreeLayer(gl) {
  renderer = new three.WebGLRenderer({
    antialias: true
  })

  const ambientLight = new three.AmbientLight(0x404040, 1)
  scene.add(ambientLight)

  const dlightR = new three.DirectionalLight(0xffffff, 1)
  dlightR.position.set(3, 3, 3)
  scene.add(dlightR)

  const dlightL = new three.DirectionalLight(0xffffff, 0.7)
  dlightL.position.set(-3, 3, -3)
  scene.add(dlightL)

  renderer = new three.WebGLRenderer({
    canvas: map.getCanvas(),
    context: gl,
    antialias: true
  })
  renderer.autoClear = false

  // clock = new THREE.Clock()
}

function init(THREE, OG, camera, container, parent = null) {
  three = THREE
  scene = new three.Scene()

  generateMapLayer()

  const customLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map,gl) {
      generateThreeLayer(gl)
      generateOpenGeometry(OG)
    },
    render: function (gl, matrix) {
      const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform.rotateX
      );
      const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
      );
      const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
      );

      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
          .makeTranslation(
              modelTransform.translateX,
              modelTransform.translateY,
              modelTransform.translateZ
          )
          .scale(
              new THREE.Vector3(
                  modelTransform.scale,
                  -modelTransform.scale,
                  modelTransform.scale
              )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

      camera.projectionMatrix = m.multiply(l);
      renderer.resetState();
      renderer.render(scene, camera);
      map.triggerRepaint();
    }
  }
  map.on('style.load', () => {
    map.addLayer(customLayer, 'waterway-label')
  })
}

function update(camera) {
  // modelTransform.rotateY += 0.01
  // console.log(modelTransform)
  // renderer.render(scene, camera)
  
  // rotate the camera around the object
  // const delta = clock.getDelta() / 5
  // const angle = Math.PI / 2 * delta
  // camera.position.x = camera.position.x * Math.cos(angle) + camera.position.z * Math.sin(angle)
  // camera.position.z = camera.position.z * Math.cos(angle) - camera.position.x * Math.sin(angle)
  // camera.lookAt(scene.position)
  // camera.updateProjectionMatrix()
}

export {
  renderer,
  scene,
  init,
  update
}