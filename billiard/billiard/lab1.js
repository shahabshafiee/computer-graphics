// Create canvas 
var canvas = document.getElementById("mycanvas");
var renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('grey');    // set background color

// Three.js scene with camera and light
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set(15,9,13);
camera.lookAt(scene.position);   // camera looks at origin
var ambientLight = new THREE.AmbientLight("white");
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight( 0x008000);
directionalLight.position.set( 1, 2, 0 );
scene.add( directionalLight );

var spotlight = new THREE.SpotLight(0x909090);
	spotlight.position.set(10,20,20);
	spotlight.shadowDarkness = 0.5;
	spotlight.intensity = 2;
	spotlight.castShadow = true;
	spotlight.shadowCameraNear = 8;
    spotlight.shadowCameraFar =200;
    spotlight.shadowCameraLeft = -10;
    spotlight.shadowCameraRight = 10;
    spotlight.shadowCameraTop = 10;
    spotlight.shadowCameraBottom = -10;
	scene.add(spotlight); 
	

	var table = new THREE.Object3D();
scene.add(table);

var Mat1 = new THREE.MeshPhongMaterial({color: "brown"} );
var Geo1 = new THREE.BoxGeometry(1,8,1);
var leg1 = new THREE.Mesh(Geo1, Mat1);
table.add(leg1);
leg1.position.z=-5.5;
leg1.position.x=8.5;
leg1.position.y=-4.1;
leg1.castShadow=true;

leg2=leg1.clone();
leg2.position.z=5.5;
leg2.position.x=-8.5;
leg1.position.y=-4.1;
table.add(leg2);
leg2.castShadow=true;

leg3=leg1.clone();
leg3.position.z=-5.5;
leg3.position.x=-8.5;
leg1.position.y=-4.1;
table.add(leg3);
leg3.castShadow=true;

leg4=leg3.clone();
leg4.position.z=5.5;
leg4.position.x=8.5;
leg1.position.y=-4.1;
table.add(leg4);
leg4.castShadow=true;


var Mat2 = new THREE.MeshPhongMaterial({color: "green"} );
var Geo2 = new THREE.BoxGeometry(18,1,12);
var tableplane= new THREE.Mesh(Geo2, Mat2);

table.add(tableplane);
tableplane.position.y=-.5;
tableplane.position.x=0;
tableplane.position.z=0;
tableplane.castShadow=true;
tableplane.receiveShadow=true;


// Add the ground
var groundMat = new THREE.MeshPhongMaterial({color: "grey", side:THREE.DoubleSide} );
var groundGeo = new THREE.PlaneGeometry(18,12);
var ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI/2;
ground.position.y=-0.2;
scene.add(ground);
ground.receiveShadow=true;

var V = new THREE.Vector3();
							   								   
var rand=8;
var objects=[rand];
var Velocity=[rand];

for (i=0;i<rand;i++)
{
	objects[i]=new THREE.Mesh(new THREE.SphereGeometry( 1,6,6),
								new THREE.MeshPhongMaterial({color: (Math.random()) * 0xffffffff,shininess: 300,
                                wireframe:true} ));
	ground.add(objects[i]);												   
	objects[i].position=((Math.random() -0.5) * 4,(Math.random() -0.5) * 4,0.55); 
    /* objects[i].position.y=((Math.random() -0.5) * 4); 
	objects[i].position.z=0.55; */
	Velocity[i] = new THREE.Vector3();
    Velocity[i].set(((Math.random() -0.5) * 20),((Math.random() -0.5) * 20),0);	
	
	var rotAxis[i] = new THREE.Vector3(0,1,0);
rotAxis[i].cross(Velocity[i]).normalize();
var omega[i] = Velocity[i].length() / 1;
}


var Geo3 = new THREE.BoxGeometry(18,1,1);
var tablecushion1= new THREE.Mesh(Geo3, Mat2);
table.add(tablecushion1);
tablecushion1.position.y=0;
tablecushion1.position.x=0;
tablecushion1.position.z=6.5;
tablecushion1.castShadow=true;
tablecushion1.receiveShadow=true;

tablecushion2=tablecushion1.clone();
table.add(tablecushion2);
tablecushion2.position.y=0;
tablecushion2.position.x=0;
tablecushion2.position.z=-6.5;
tablecushion2.castShadow=true;
tablecushion2.receiveShadow=true;

var Geo4 = new THREE.BoxGeometry(1,1,14);
var tablecushion3= new THREE.Mesh(Geo4, Mat2);
table.add(tablecushion3);
tablecushion3.position.y=0;
tablecushion3.position.x=-9.5;
tablecushion3.position.z=0;
tablecushion3.castShadow=true;
tablecushion3.receiveShadow=true;

tablecushion4=tablecushion3.clone();
table.add(tablecushion4);
tablecushion4.position.y=0;
tablecushion4.position.x=9.5;
tablecushion4.position.z=0;
tablecushion4.castShadow=true;
tablecushion4.receiveShadow=true;


var Geo5 = new THREE.SphereGeometry( 1, 16, 16 );
var Mat3 = new THREE.MeshPhongMaterial( {color: 0x000000,emissive: 'yellow'} );
var lightbulb = new THREE.Mesh( Geo5, Mat3 );
scene.add( lightbulb );
lightbulb.position.set(5,10,0);



addWorldAxes(scene);
// making objects visible
var controls = new THREE.TrackballControls( camera, canvas );
var clock = new THREE.Clock();

var ballRadius = 2;
var ballGeo = new THREE.SphereGeometry(ballRadius, 8, 8);
var ball = new THREE.Mesh(ballGeo,  new THREE.MeshBasicMaterial( {color: 0x0000ff,
                                                                  wireframe:true,
                                                                  wireframeLinewidth:2}));
scene.add(ball);
var initPos = new THREE.Vector3(2,  2, 2);
var ballSpeed = new THREE.Vector3(5*Math.random(), 0, 5*Math.random());
var rotAxis = new THREE.Vector3(0,1,0);
rotAxis.cross(ballSpeed).normalize();
var omega = ballSpeed.length() / ballRadius;
ball.matrixAutoUpdate = false; 

var computerClock = new THREE.Clock();
var controls = new THREE.TrackballControls( camera );
function render() {
    requestAnimationFrame(render);
    var dt = clock.getDelta();
	 var t = computerClock.getElapsedTime();
	
	// Translation
    var pos = initPos.clone().add(ballSpeed.clone().multiplyScalar(t));
    var transMat = new THREE.Matrix4();
    transMat.makeTranslation(pos.x, pos.y, pos.z);

    // Rotation
    var theta = omega*t; 
    var rotMat = new THREE.Matrix4();
    rotMat.makeRotationAxis(rotAxis, theta); 
    ball.matrix.multiplyMatrices(transMat, rotMat); 	
for (i=0;i<rand;i++)	
{
	// Translation
    var pos[i] = objects[i].position.clone().add(Velocity[i].clone().multiplyScalar(t));
    var transMat[i] = new THREE.Matrix4();
    transMat[i].makeTranslation(pos[i].x, pos[i].y, pos[i].z);

    // Rotation
    var theta[i] = omega*t; 
    var rotMat[i] = new THREE.Matrix4();
    rotMat[i].makeRotationAxis(rotAxis[i], theta[i]); 
	
    objects[i].matrix.multiplyMatrices(transMat[i], rotMat); 
	
	
	/* if (((0.35+objects[i].position.x)>9)||((-0.35+objects[i].position.x)<-9))
	Velocity[i].x=-Velocity[i].x;

	if (((0.35+objects[i].position.y)>6)||((-0.35+objects[i].position.y)<-6))
	Velocity[i].y=-Velocity[i].y; */
 } 

   
	for (i=0;i<rand;i++) // changing the 
	{
		objects[i].position.x += Velocity[i].x * dt;
	    objects[i].position.y += Velocity[i].y * dt;
	    objects[i].position.z += Velocity[i].z * dt;	
	}	
	
	/* for (i=0;i<rand;i++) // decreasing the velocity
	{
		Velocity[i].x=(Velocity[i].x);
		Velocity[i].y=(Velocity[i].y);
		Velocity[i].z=(Velocity[i].z);
	}	 */
    controls.update();
    renderer.render(scene, camera);	
}
render();

