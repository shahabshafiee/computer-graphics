// Create canvas 
var canvas = document.getElementById("mycanvas");
var renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('grey');    // set background color

// Three.js scene with camera and light
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set(0,0,10);
camera.lookAt(scene.position);   // camera looks at origin
var ambientLight = new THREE.AmbientLight("white");
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight( 0x008000);
directionalLight.position.set( 1, 2, 0 );
scene.add( directionalLight );
// Big blue sphere
var obj = new THREE.Mesh(new THREE.SphereGeometry( 6,100,100), new THREE.MeshPhongMaterial({color: "blue",shininess: 200,
                                       wireframe:false , transparent:true, opacity: 0.3} ));
scene.add(obj);

var V = new THREE.Vector3();
var Target =new THREE.Mesh(new THREE.SphereGeometry( 0.6,40,40), new THREE.MeshPhongMaterial({color: "black",shininess: 300,
                                       wireframe:false , transparent:false} ));
	
	
	function myCallback(event) {
    console.log(event.keyCode);
    if(event.keyCode === 39)
        V.x = 1;
    if(event.keyCode === 37)
        V.x = -1;
	if(event.keyCode === 38)
        V.y = 1;
	if(event.keyCode === 40)
        V.y = -1;
	if(event.keyCode === 87)
        V.z = 1;
    if(event.keyCode === 83)
        V.z = -1;

}								
document.addEventListener("keydown", myCallback);
document.addEventListener("keyup", function() {V.set(0,0,0);});
obj.add(Target)
scene.add(Target)
									   
									   
var rand=(Math.random()*3) +8;
var objects=[rand];
var Velocity=[rand];

for (i=0;i<rand;i++)
{
	objects[i]=new THREE.Mesh(new THREE.SphereGeometry( 0.4,30,30),
								new THREE.MeshPhongMaterial({color: (Math.random()) * 0xffffffff,shininess: 300,
                                wireframe:false} ));
	obj.add(objects[i]);												   
	objects[i].position.x=((Math.random() -0.5) * 4); 
    objects[i].position.y=((Math.random() -0.5) * 4); 
    objects[i].position.z=((Math.random() -0.5) * 4); 
	Velocity[i] = new THREE.Vector3();
    Velocity[i].set(((Math.random() -0.5) * 6),((Math.random() -0.5) * 6),((Math.random() -0.5) * 6));	
}
addWorldAxes(scene);
// making objects visible
var controls = new THREE.TrackballControls( camera, canvas );
var clock = new THREE.Clock();
function render() {
    requestAnimationFrame(render);
    var h = clock.getDelta();
	
	 if ((0.05+Target.position.length())>6){
    alert("Game Over");	 
//break;
	}
	Target.position.x += V.x * h;
	Target.position.y += V.y * h;
	Target.position.z += V.z * h;

	
	for (i=0;i<rand;i++)
	{
		if (objects[i].position.clone().sub(Target.position).length()<=0.35){
			alert("Game Over");
		//break;
		}
		}

	//collision calculation
for (i=0;i<rand;i++)	
{
	if ((0.35+objects[i].position.length())>6)
	Velocity[i].reflect(objects[i].position.clone().normalize());//change the direction of the velocity
}
	for (i=0;i<rand;i++) // changing the position according to the velocity and current position
	{
		objects[i].position.x += Velocity[i].x * h;
	    objects[i].position.y += Velocity[i].y * h;
	    objects[i].position.z += Velocity[i].z * h;	
	}	
    controls.update();
    renderer.render(scene, camera);
	
	
}
render();

