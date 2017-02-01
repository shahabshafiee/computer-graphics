// Initialize webGL
var canvas = document.getElementById("mycanvas");
var renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('white');    // set background color

// Create a new Three.js scene with camera and light
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set(0,0,3);
camera.lookAt(scene.position);   // camera looks at origin
var ambientLight = new THREE.AmbientLight("white");
scene.add(ambientLight);
var directionalLight = new THREE.DirectionalLight( 0x008000);
directionalLight.position.set( 1, 2, 0 );
scene.add( directionalLight );

// Create geometry
var geo = new THREE.Geometry();
geo.vertices[0] = new THREE.Vector3(-1,1,0);
geo.vertices[1] = new THREE.Vector3(-1,-1,0);
geo.vertices[2] = new THREE.Vector3(1,-1,0);
geo.vertices[3] = new THREE.Vector3(1,1,0);
geo.vertices[4]=new THREE.Vector3(1/2,1/2,1)
geo.faces[0] = new THREE.Face3(0,1,2);
geo.faces[1] = new THREE.Face3(0,2,3);
geo.faces[2]=new THREE.Face3(0,1,4);
geo.faces[3]=new THREE.Face3(1,2,4);
geo.faces[2]=new THREE.Face3(2,3,4);
geo.faces[2]=new THREE.Face3(0,3,4);

// material specifies how triangle looks like
var mat = new THREE.MeshPhongMaterial({color: "red",
                                       wireframe:false,
                                       wireframeLinewidth:2} );

								   

// Combine geometry and material to a new object:
var obj = new THREE.Mesh(geo, mat);
obj.rotation.z=Math.PI/4;
obj.position.x=1;


 
 scene.add(obj);
 
 addWorldAxes(scene);
 addWorldAxes(obj);
// Draw everything
var controls = new THREE.TrackballControls( camera, canvas );
function render() {
   requestAnimationFrame(render);

   controls.update();
   renderer.render(scene, camera);
}
render();
