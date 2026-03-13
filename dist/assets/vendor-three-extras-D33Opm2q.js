import{C as wt,f as h,i as j,T as U,Q as st,S as ot,V as x,R as St,P as Et,j as ut,M as J,I as xt,F as nt,k as $,l as C,W as vt,m as tt,n as ft,o as Pt,p as Y,U as mt,q as W,c as Dt,r as N,s as Mt,t as Tt}from"./vendor-three-32C3Mgnw.js";const at={type:"change"},et={type:"start"},_t={type:"end"},I=new St,rt=new Et,At=Math.cos(70*ut.DEG2RAD),p=new h,b=2*Math.PI,l={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},G=1e-6;class Vt extends wt{constructor(t,e=null){super(t,e),this.state=l.NONE,this.enabled=!0,this.target=new h,this.cursor=new h,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:j.ROTATE,MIDDLE:j.DOLLY,RIGHT:j.PAN},this.touches={ONE:U.ROTATE,TWO:U.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new h,this._lastQuaternion=new st,this._lastTargetPosition=new h,this._quat=new st().setFromUnitVectors(t.up,new h(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ot,this._sphericalDelta=new ot,this._scale=1,this._panOffset=new h,this._rotateStart=new x,this._rotateEnd=new x,this._rotateDelta=new x,this._panStart=new x,this._panEnd=new x,this._panDelta=new x,this._dollyStart=new x,this._dollyEnd=new x,this._dollyDelta=new x,this._dollyDirection=new h,this._mouse=new x,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ot.bind(this),this._onPointerDown=Lt.bind(this),this._onPointerUp=zt.bind(this),this._onContextMenu=Bt.bind(this),this._onMouseWheel=jt.bind(this),this._onKeyDown=Rt.bind(this),this._onTouchStart=Nt.bind(this),this._onTouchMove=It.bind(this),this._onMouseDown=Ut.bind(this),this._onMouseMove=Ct.bind(this),this._interceptControlDown=kt.bind(this),this._interceptControlUp=Ht.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(at),this.update(),this.state=l.NONE}update(t=null){const e=this.object.position;p.copy(e).sub(this.target),p.applyQuaternion(this._quat),this._spherical.setFromVector3(p),this.autoRotate&&this.state===l.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(s)&&isFinite(i)&&(s<-Math.PI?s+=b:s>Math.PI&&(s-=b),i<-Math.PI?i+=b:i>Math.PI&&(i-=b),s<=i?this._spherical.theta=Math.max(s,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+i)/2?Math.max(s,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let n=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),n=r!=this._spherical.radius}if(p.setFromSpherical(this._spherical),p.applyQuaternion(this._quatInverse),e.copy(this.target).add(p),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const a=p.length();r=this._clampDistance(a*this._scale);const c=a-r;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),n=!!c}else if(this.object.isOrthographicCamera){const a=new h(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),n=c!==this.object.zoom;const _=new h(this._mouse.x,this._mouse.y,0);_.unproject(this.object),this.object.position.sub(_).add(a),this.object.updateMatrixWorld(),r=p.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(I.origin.copy(this.object.position),I.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(I.direction))<At?this.object.lookAt(this.target):(rt.setFromNormalAndCoplanarPoint(this.object.up,this.target),I.intersectPlane(rt,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),n=!0)}return this._scale=1,this._performCursorZoom=!1,n||this._lastPosition.distanceToSquared(this.object.position)>G||8*(1-this._lastQuaternion.dot(this.object.quaternion))>G||this._lastTargetPosition.distanceToSquared(this.target)>G?(this.dispatchEvent(at),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?b/60*this.autoRotateSpeed*t:b/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){p.setFromMatrixColumn(e,0),p.multiplyScalar(-t),this._panOffset.add(p)}_panUp(t,e){this.screenSpacePanning===!0?p.setFromMatrixColumn(e,1):(p.setFromMatrixColumn(e,0),p.crossVectors(this.object.up,p)),p.multiplyScalar(t),this._panOffset.add(p)}_pan(t,e){const s=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;p.copy(i).sub(this.target);let n=p.length();n*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*n/s.clientHeight,this.object.matrix),this._panUp(2*e*n/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),i=t-s.left,n=e-s.top,r=s.width,a=s.height;this._mouse.x=i/r*2-1,this._mouse.y=-(n/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(b*this._rotateDelta.x/e.clientHeight),this._rotateUp(b*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(b*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-b*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(b*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-b*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),s=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._rotateStart.set(s,i)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),s=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panStart.set(s,i)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),s=t.pageX-e.x,i=t.pageY-e.y,n=Math.sqrt(s*s+i*i);this._dollyStart.set(0,n)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const s=this._getSecondPointerPosition(t),i=.5*(t.pageX+s.x),n=.5*(t.pageY+s.y);this._rotateEnd.set(i,n)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(b*this._rotateDelta.x/e.clientHeight),this._rotateUp(b*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),s=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panEnd.set(s,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),s=t.pageX-e.x,i=t.pageY-e.y,n=Math.sqrt(s*s+i*i);this._dollyEnd.set(0,n),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(r,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new x,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function Lt(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function Ot(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function zt(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(_t),this.state=l.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Ut(o){let t;switch(o.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case j.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=l.DOLLY;break;case j.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=l.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=l.ROTATE}break;case j.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=l.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=l.PAN}break;default:this.state=l.NONE}this.state!==l.NONE&&this.dispatchEvent(et)}function Ct(o){switch(this.state){case l.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case l.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case l.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function jt(o){this.enabled===!1||this.enableZoom===!1||this.state!==l.NONE||(o.preventDefault(),this.dispatchEvent(et),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(_t))}function Rt(o){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(o)}function Nt(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case U.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=l.TOUCH_ROTATE;break;case U.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=l.TOUCH_PAN;break;default:this.state=l.NONE}break;case 2:switch(this.touches.TWO){case U.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=l.TOUCH_DOLLY_PAN;break;case U.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=l.TOUCH_DOLLY_ROTATE;break;default:this.state=l.NONE}break;default:this.state=l.NONE}this.state!==l.NONE&&this.dispatchEvent(et)}function It(o){switch(this._trackPointer(o),this.state){case l.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case l.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case l.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case l.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=l.NONE}}function Bt(o){this.enabled!==!1&&o.preventDefault()}function kt(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ht(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}new h;new J;new J;new h;new h;const ht=new tt,B=new h;class yt extends xt{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],s=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(s),this.setAttribute("position",new nt(t,3)),this.setAttribute("uv",new nt(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,s=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),s.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const s=new $(e,6,1);return this.setAttribute("instanceStart",new C(s,3,0)),this.setAttribute("instanceEnd",new C(s,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const s=new $(e,6,1);return this.setAttribute("instanceColorStart",new C(s,3,0)),this.setAttribute("instanceColorEnd",new C(s,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new vt(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tt);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),ht.setFromBufferAttribute(e),this.boundingBox.union(ht))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ft),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const s=this.boundingSphere.center;this.boundingBox.getCenter(s);let i=0;for(let n=0,r=t.count;n<r;n++)B.fromBufferAttribute(t,n),i=Math.max(i,s.distanceToSquared(B)),B.fromBufferAttribute(e,n),i=Math.max(i,s.distanceToSquared(B));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}W.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new x(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Y.line={uniforms:mt.merge([W.common,W.fog,W.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class gt extends Pt{constructor(t){super({type:"LineMaterial",uniforms:mt.clone(Y.line.uniforms),vertexShader:Y.line.vertexShader,fragmentShader:Y.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const X=new N,lt=new h,ct=new h,u=new N,f=new N,P=new N,q=new h,Q=new J,m=new Mt,dt=new h,k=new tt,H=new ft,D=new N;let M,L;function pt(o,t,e){return D.set(0,0,-t,1).applyMatrix4(o.projectionMatrix),D.multiplyScalar(1/D.w),D.x=L/e.width,D.y=L/e.height,D.applyMatrix4(o.projectionMatrixInverse),D.multiplyScalar(1/D.w),Math.abs(Math.max(D.x,D.y))}function Yt(o,t){const e=o.matrixWorld,s=o.geometry,i=s.attributes.instanceStart,n=s.attributes.instanceEnd,r=Math.min(s.instanceCount,i.count);for(let a=0,c=r;a<c;a++){m.start.fromBufferAttribute(i,a),m.end.fromBufferAttribute(n,a),m.applyMatrix4(e);const _=new h,y=new h;M.distanceSqToSegment(m.start,m.end,y,_),y.distanceTo(_)<L*.5&&t.push({point:y,pointOnLine:_,distance:M.origin.distanceTo(y),object:o,face:null,faceIndex:a,uv:null,uv1:null})}}function Wt(o,t,e){const s=t.projectionMatrix,n=o.material.resolution,r=o.matrixWorld,a=o.geometry,c=a.attributes.instanceStart,_=a.attributes.instanceEnd,y=Math.min(a.instanceCount,c.count),d=-t.near;M.at(1,P),P.w=1,P.applyMatrix4(t.matrixWorldInverse),P.applyMatrix4(s),P.multiplyScalar(1/P.w),P.x*=n.x/2,P.y*=n.y/2,P.z=0,q.copy(P),Q.multiplyMatrices(t.matrixWorldInverse,r);for(let w=0,F=y;w<F;w++){if(u.fromBufferAttribute(c,w),f.fromBufferAttribute(_,w),u.w=1,f.w=1,u.applyMatrix4(Q),f.applyMatrix4(Q),u.z>d&&f.z>d)continue;if(u.z>d){const E=u.z-f.z,v=(u.z-d)/E;u.lerp(f,v)}else if(f.z>d){const E=f.z-u.z,v=(f.z-d)/E;f.lerp(u,v)}u.applyMatrix4(s),f.applyMatrix4(s),u.multiplyScalar(1/u.w),f.multiplyScalar(1/f.w),u.x*=n.x/2,u.y*=n.y/2,f.x*=n.x/2,f.y*=n.y/2,m.start.copy(u),m.start.z=0,m.end.copy(f),m.end.z=0;const g=m.closestPointToPointParameter(q,!0);m.at(g,dt);const T=ut.lerp(u.z,f.z,g),S=T>=-1&&T<=1,A=q.distanceTo(dt)<L*.5;if(S&&A){m.start.fromBufferAttribute(c,w),m.end.fromBufferAttribute(_,w),m.start.applyMatrix4(r),m.end.applyMatrix4(r);const E=new h,v=new h;M.distanceSqToSegment(m.start,m.end,v,E),e.push({point:v,pointOnLine:E,distance:M.origin.distanceTo(v),object:o,face:null,faceIndex:w,uv:null,uv1:null})}}}class Ft extends Dt{constructor(t=new yt,e=new gt({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,s=t.attributes.instanceEnd,i=new Float32Array(2*e.count);for(let r=0,a=0,c=e.count;r<c;r++,a+=2)lt.fromBufferAttribute(e,r),ct.fromBufferAttribute(s,r),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+lt.distanceTo(ct);const n=new $(i,2,1);return t.setAttribute("instanceDistanceStart",new C(n,1,0)),t.setAttribute("instanceDistanceEnd",new C(n,1,1)),this}raycast(t,e){const s=this.material.worldUnits,i=t.camera;i===null&&!s&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const n=t.params.Line2!==void 0&&t.params.Line2.threshold||0;M=t.ray;const r=this.matrixWorld,a=this.geometry,c=this.material;L=c.linewidth+n,a.boundingSphere===null&&a.computeBoundingSphere(),H.copy(a.boundingSphere).applyMatrix4(r);let _;if(s)_=L*.5;else{const d=Math.max(i.near,H.distanceToPoint(M.origin));_=pt(i,d,c.resolution)}if(H.radius+=_,M.intersectsSphere(H)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),k.copy(a.boundingBox).applyMatrix4(r);let y;if(s)y=L*.5;else{const d=Math.max(i.near,k.distanceToPoint(M.origin));y=pt(i,d,c.resolution)}k.expandByScalar(y),M.intersectsBox(k)!==!1&&(s?Yt(this,e):Wt(this,i,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(X),this.material.uniforms.resolution.value.set(X.z,X.w))}}class Zt extends yt{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const e=t.length-3,s=new Float32Array(2*e);for(let i=0;i<e;i+=3)s[2*i]=t[i],s[2*i+1]=t[i+1],s[2*i+2]=t[i+2],s[2*i+3]=t[i+3],s[2*i+4]=t[i+4],s[2*i+5]=t[i+5];return super.setPositions(s),this}setColors(t){const e=t.length-3,s=new Float32Array(2*e);for(let i=0;i<e;i+=3)s[2*i]=t[i],s[2*i+1]=t[i+1],s[2*i+2]=t[i+2],s[2*i+3]=t[i+3],s[2*i+4]=t[i+4],s[2*i+5]=t[i+5];return super.setColors(s),this}fromLine(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}}class Gt extends Ft{constructor(t=new Zt,e=new gt({color:Math.random()*16777215})){super(t,e),this.isLine2=!0,this.type="Line2"}}function Xt(o,t=Math.PI/3){const e=Math.cos(t),s=(1+1e-10)*100,i=[new h,new h,new h],n=new h,r=new h,a=new h,c=new h;function _(g){const T=~~(g.x*s),S=~~(g.y*s),A=~~(g.z*s);return`${T},${S},${A}`}const y=o.index?o.toNonIndexed():o,d=y.attributes.position,w={};for(let g=0,T=d.count/3;g<T;g++){const S=3*g,A=i[0].fromBufferAttribute(d,S+0),E=i[1].fromBufferAttribute(d,S+1),v=i[2].fromBufferAttribute(d,S+2);n.subVectors(v,E),r.subVectors(A,E);const O=new h().crossVectors(n,r).normalize();for(let R=0;R<3;R++){const K=i[R],z=_(K);z in w||(w[z]=[]),w[z].push(O)}}const F=new Float32Array(d.count*3),Z=new Tt(F,3,!1);for(let g=0,T=d.count/3;g<T;g++){const S=3*g,A=i[0].fromBufferAttribute(d,S+0),E=i[1].fromBufferAttribute(d,S+1),v=i[2].fromBufferAttribute(d,S+2);n.subVectors(v,E),r.subVectors(A,E),a.crossVectors(n,r).normalize();for(let O=0;O<3;O++){const R=i[O],K=_(R),z=w[K];c.set(0,0,0);for(let V=0,bt=z.length;V<bt;V++){const it=z[V];a.dot(it)>e&&c.add(it)}c.normalize(),Z.setXYZ(S+O,c.x,c.y,c.z)}}return y.setAttribute("normal",Z),y}export{gt as L,Vt as O,Gt as a,Zt as b,yt as c,Ft as d,Xt as t};
