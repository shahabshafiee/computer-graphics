//* Initialize webGL with camera and lights
var canvas = document.getElementById("mycanvas");
var renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(255,255,255)');
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;

// create scene and camera 
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,0.1, 500);
camera.position.x =0;
camera.position.y =40;
camera.position.z = 40;

//create lights
var ambientLight = new THREE.AmbientLight(0xa0a0a0);
scene.add(ambientLight);

 var spotlight = new THREE.SpotLight(0x909090);
	spotlight.position.set(10,24,30);
	spotlight.shadowDarkness = 0.7;
	spotlight.intensity = 4;
	spotlight.castShadow = true;
	spotlight.target.position.set(10,10,10);
	spotlight.shadowCameraNear = 10;
	spotlight.shadowMapWidth = 1024;
	spotlight.shadowMapHeight = 1024;
    spotlight.shadowCameraFar =100;
	spotlight.shadowCameraFov = 90;
	scene.add(spotlight); 
	
	
	//create the lightbulb adn wire

var Geo5 = new THREE.SphereGeometry( 2, 45, 45 );
var Mat3 = new THREE.MeshPhongMaterial( {color: 0x000000,emissive: 'yellow'} );
var lightbulb = new THREE.Mesh( Geo5, Mat3 );

var GeoWire=new THREE.BoxGeometry(0.09,15,0.09)
var MatWire=new THREE.MeshPhongMaterial({color: "black"} );
var Wire=new THREE.Mesh(GeoWire,MatWire)

scene.add( lightbulb );
scene.add( Wire );
Wire.position.set(10,32.5,30);
lightbulb.position.set(10,24,30);


// create ground
var groundMat = new THREE.MeshPhongMaterial({color: "grey", side:THREE.DoubleSide} );
var groundGeo = new THREE.PlaneGeometry(70,70);
var ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI/2;
scene.add(ground);
ground.receiveShadow=true;

//create the table object
var table = new THREE.Object3D();
scene.add(table);
table.add(ground);

//create the different parts of the table

var Mat1 = new THREE.MeshPhongMaterial({color: "brown"} );
var Geo1 = new THREE.BoxGeometry(1,8,1);
var leg1 = new THREE.Mesh(Geo1, Mat1);
table.add(leg1);
leg1.position.y=4;
leg1.castShadow=true;

leg2=leg1.clone();
leg2.position.x=10;
table.add(leg2);
leg2.castShadow=true;

leg3=leg1.clone();
leg3.position.z=20;
table.add(leg3);
leg3.castShadow=true;

leg4=leg3.clone();
leg4.position.x=10;
table.add(leg4);
leg4.castShadow=true;

var Mat2 = new THREE.MeshPhongMaterial({color: "green" } );
var Geo2 = new THREE.BoxGeometry(12,0.5,22);
var tableplane= new THREE.Mesh(Geo2, Mat2);

table.add(tableplane);
tableplane.position.y=8;
tableplane.position.x=5;
tableplane.position.z=10;
tableplane.castShadow=true;
tableplane.receiveShadow=true;

var Geo3 = new THREE.BoxGeometry(12,0.5,1);
var Mat3 = new THREE.MeshPhongMaterial({color: 0x006633 } );
var tablecushion1= new THREE.Mesh(Geo3, Mat3);
table.add(tablecushion1);
tablecushion1.position.y=8.5;
tablecushion1.position.x=5;
tablecushion1.position.z=-0.5;
tablecushion1.castShadow=true;
tablecushion1.receiveShadow=true;
tablecushion2=tablecushion1.clone();
tablecushion2.position.z=20.5;
table.add(tablecushion2);
tablecushion2.castShadow=true;
tablecushion2.receiveShadow=true;

var Geo4 = new THREE.BoxGeometry(1,0.5,22);
var tablecushion3= new THREE.Mesh(Geo4, Mat3);
tablecushion3.position.y=8.5;
tablecushion3.position.x=-0.5;
tablecushion3.position.z=10;
table.add(tablecushion3);
tablecushion3.castShadow=true;
tablecushion3.receiveShadow=true;

tablecushion4=tablecushion3.clone();
tablecushion3.position.x=10.5;
table.add(tablecushion4);
tablecushion4.castShadow=true;
tablecushion4.receiveShadow=true;

//create 8 balls

var balls=[8];
var Velocitys=[8];
var matball=[8];

THREE.ImageUtils.crossOrigin = '';
var Ball1texture = THREE.ImageUtils.loadTexture("Ball1.jpg");
matball[0]=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture( Ball1texture), color: "white",shininess: 80.0} );

matball[1]=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture( 'https://raw.githubusercontent.com/zhongyn/opengl-robotic-arm/master/Pool%20Ball%20Skins/Ball2.jpg'), color: "white",shininess: 80.0} );
matball[2]=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture( 'https://raw.githubusercontent.com/zhongyn/opengl-robotic-arm/master/Pool%20Ball%20Skins/Ball3.jpg'), color: "white",shininess: 80.0} );
matball[3]=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture( 'https://raw.githubusercontent.com/zhongyn/opengl-robotic-arm/master/Pool%20Ball%20Skins/Ball4.jpg'), color: "white",shininess: 80.0} );
matball[4]=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture( 'https://raw.githubusercontent.com/zhongyn/opengl-robotic-arm/master/Pool%20Ball%20Skins/Ball5.jpg'), color: "white",shininess: 80.0} );
matball[5]=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture( 'https://raw.githubusercontent.com/zhongyn/opengl-robotic-arm/master/Pool%20Ball%20Skins/Ball6.jpg'), color: "white",shininess: 80.0} );
matball[6]=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture( 'https://raw.githubusercontent.com/zhongyn/opengl-robotic-arm/master/Pool%20Ball%20Skins/Ball7.jpg'), color: "white",shininess: 80.0} );
matball[7]=new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture( 'https://raw.githubusercontent.com/zhongyn/opengl-robotic-arm/master/Pool%20Ball%20Skins/Ball8.jpg'), color: "white",shininess: 80.0} );



for (var i=0;i<8;i++)
{
	var ballrad=0.25
	balls[i]=new THREE.Mesh(new THREE.SphereGeometry( ballrad, 30,30),matball[i]);
	scene.add(balls[i]);
	balls[i].castShadow=true;
	balls[i].receiveShadow=true;
	balls[i].position.x=Math.floor((Math.random() * 3)+3); 
    balls[i].position.y=8.25+ballrad;
	balls[i].position.z=Math.floor(((Math.random() -0.5)* 8) + 14); 
    balls[i].updateMatrixWorld();
	Velocitys[i] = new THREE.Vector3();
    Velocitys[i].set((Math.random() - 0.5) * 20,0,(Math.random() -0.5) * 20);
}

//count1 and count2 are used for correct reflections and collisions

var count1=[0,0,0,0,0,0,0,0];
var count2=new Array(8);

	for (i=0;i<8;i++)
	{
		count2[i]=[0,0,0,0,0,0,0,0];
	}
			
var controls = new THREE.TrackballControls( camera, canvas );
controls.rotateSpeed = 2;
var clock = new THREE.Clock();
function render() {
    requestAnimationFrame(render);
	var h = clock.getDelta();
    var t = clock.getElapsedTime();
    
	//ball's motions and collisions
	for (i=0;i<8;i++)
	{
		var rotAxis = new THREE.Vector3(0,1,0);
        rotAxis.cross(Velocitys[i]).normalize();
        var omega = Velocitys[i].length() / ballrad;
		transx=Velocitys[i].x * h;
	    transz=Velocitys[i].z * h;
	    
		var transMat = new THREE.Matrix4();
        transMat.makeTranslation(transx, 0, transz); 
		var theta = omega*h; 
        var rotMat = new THREE.Matrix4();
        rotMat.makeRotationAxis(rotAxis, theta); 
		
		balls[i].geometry.applyMatrix(rotMat);
		balls[i].applyMatrix(transMat);
		Velocitys[i].x=Math.pow(08/10,h)*Velocitys[i].x;
        Velocitys[i].z=Math.pow(08/10,h)*Velocitys[i].z;
		
		if((balls[i].position.x+ballrad>=9.9))
		{
			if(count1[i]===0)
			{
			var normal=new THREE.Vector3( -1, 0, 0 );
			Velocitys[i].reflect(normal).multiplyScalar(08/10);
			count1[i]++;
			}			
		}
	
		else if(balls[i].position.x-ballrad<=0.1)
		{
			if(count1[i]===0)
			{
			var normal=new THREE.Vector3( 1, 0, 0 );
			Velocitys[i].reflect(normal).multiplyScalar(08/10);
			count1[i]++;
			}
		}
		
		else if(balls[i].position.z+ballrad>=19.9)
		{
			if(count1[i]===0)
			{
			var normal=new THREE.Vector3( 0, 0, -1 );
			Velocitys[i].reflect(normal).multiplyScalar(08/10);
			count1[i]++;
			}
		}
		
		else if(balls[i].position.z-ballrad<=0.1)
		{
			if(count1[i]===0)
			{
			var normal=new THREE.Vector3( 0, 0, 1 );
			Velocitys[i].reflect(normal).multiplyScalar(08/10);
			count1[i]++;
			}
		}
		
		else 
			count1[i]=0;
	
			for(var j=i+1; j<8; j++)
			{
				var d = new THREE.Vector3();
				d.copy(balls[i].position.clone().sub(balls[j].position));
				
				if(d.length()<=1.9*ballrad)
				{
					if(count2[i][j]===0)
					{
						Velocitys[i].sub(d.clone().multiplyScalar((d.dot(Velocitys[i].clone().sub(Velocitys[j])))/d.lengthSq())).multiplyScalar(7/10);
						Velocitys[j].add(d.clone().multiplyScalar((d.dot(Velocitys[i].clone().sub(Velocitys[j])))/d.lengthSq())).multiplyScalar(7/10);
						count2[i][j]++;
					}
				}
				else
					count2[i][j]=0;
			}
	}
	controls.update();
    renderer.render(scene, camera);
}

render();
