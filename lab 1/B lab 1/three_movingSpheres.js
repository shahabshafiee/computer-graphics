// Initialize webGL
var canvas = document.getElementById("mycanvas");
var renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor('black');    // set background color

// Create a new Three.js scene with camera and light
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set(0,0,20);
camera.lookAt(scene.position);   // camera looks at origin
var ambientLight = new THREE.AmbientLight("white");
scene.add(ambientLight);
var directionalLight = new THREE.DirectionalLight( 0x008000);
directionalLight.position.set( 1, 2, 0 );
scene.add( directionalLight );

// Create big yellow sphere
var geo = new THREE.SphereGeometry( 10, 100,100);
var mat = new THREE.MeshPhongMaterial({color: "yellow",
                                       wireframe:false , transparent:true, opacity: 0.5} );
									   
									   
	

	
var obj = new THREE.Mesh(geo, mat);
scene.add(obj);
var rand=Math.floor((Math.random() * 20) + 10);
var objects=[rand];
var Velocitys=[rand];

for (i=0;i<rand;i++)
{
	objects[i]=new THREE.Mesh(new THREE.SphereGeometry( 0.25, 16,16),
                          new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff,
                                                       wireframe:false,shininess: 100, shading: THREE.SmoothShading} ));
	obj.add(objects[i]);												   
	objects[i].position.x=Math.floor((Math.random() * 5) + 0); 
    objects[i].position.y=Math.floor((Math.random() * 5) + 0); 
    objects[i].position.z=Math.floor((Math.random() * 5) + 0);
	Velocitys[i] = new THREE.Vector3();
    Velocitys[i].set((Math.random() - 0.5) * 10,(Math.random() -0.5) * 10,(Math.random() -0.5) * 10);
	
	
	
}
var V = new THREE.Vector3();
//V.set(Math.floor((Math.random() * 5) + 1),Math.floor((Math.random() * 5) + 1),Math.floor((Math.random() * 5) + 1));

var obj2 = new THREE.Mesh(new THREE.SphereGeometry( 0.25, 16,16),
                          new THREE.MeshPhongMaterial({color: "blue",
                                                       wireframe:true} ));
// Key control of yellow sphere
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

// Create blue sphere circulating around yellow sphere
obj.add(obj2);

var r = 3;  // radius of path of blue sphere
var w = 2*Math.PI/15;   // angular speed of circular motion

// Create white sphere circulating around blue sphere
var obj3 = new THREE.Mesh(new THREE.SphereGeometry( 0.1, 16,16),
                          new THREE.MeshPhongMaterial({color: "white",
                                                       wireframe:true} ));
obj2.add(obj3);
var w3 = 2*Math.PI/2; // angular speed of circular motion


addWorldAxes(scene);
// Draw everything
var controls = new THREE.TrackballControls( camera, canvas );
var clock = new THREE.Clock();
function render() {
    requestAnimationFrame(render);
    var h = clock.getDelta();
    var t = clock.getElapsedTime();

  if ((0.25+obj2.position.length())>10)
    alert("Game Over");
	 //V.reflect(obj2.position.clone().normalize());
    obj2.position.x += V.x * h;
	obj2.position.y += V.y * h;
	obj2.position.z += V.z * h;
	for (i=0;i<rand;i++)
	{
		objects[i].position.x += Velocitys[i].x * h;
	    objects[i].position.y += Velocitys[i].y * h;
	    objects[i].position.z += Velocitys[i].z * h;
		
	}
	for (i=0;i<rand;i++)	
{
	if ((0.25+objects[i].position.length())>10)
	Velocitys[i].reflect(objects[i].position.clone().normalize());
}
	
	
	for (i=0;i<rand;i++)
	{
		if (objects[i].position.clone().sub(obj2.position).length()<=0.5)
			alert("Game Over");
		}
	
    // if(Math.abs(obj.position.x)>3) vx = -vx;

    // circular motion of blue sphere
    //obj2.position.x = r * Math.cos(w*t);
    //obj2.position.y = r * Math.sin(w*t);

    // circular motion of white sphere
    //obj3.position.x = Math.cos(w3*t);
    //obj3.position.y = Math.sin(w3*t);

    controls.update();
    renderer.render(scene, camera);
}
render();
