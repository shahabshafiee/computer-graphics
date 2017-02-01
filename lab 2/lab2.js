	  //-----------------------------------------//
	 //                    webGL                //
	//-----------------------------------------//
	var canvas = document.getElementById("mycanvas");
	var renderer = new THREE.WebGLRenderer({canvas:canvas});
	renderer.setClearColor('black');  

	  //-----------------------------------------//
	 //       scene with camera and light       //
	//-----------------------------------------//
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );
	camera.position.set(0,50,-3);
	camera.lookAt(scene.position);  
	var ambientLight = new THREE.AmbientLight("white");
	scene.add(ambientLight);
	addWorldAxes(scene);
	var directionalLight = new THREE.DirectionalLight( 0x008000);
	directionalLight.position.set( 1, 2, 0 );
	scene.add( directionalLight );

	  //-----------------------------------------//
	 //               clock object              //
	//-----------------------------------------//
	 var Clock=new THREE.Object3D();
	 scene.add(Clock);
	 
	  //-----------------------------------------//
	 //               first clock               //
	//-----------------------------------------//
	var geo1 = new THREE.CylinderGeometry( 20, 20, 3, 80 );
	var mat1 = new THREE.MeshPhongMaterial({color: "white"} );
	mat1.transparent=true;
	mat1.opacity=0.7;
	var body = new THREE.Mesh(geo1, mat1);
	scene.add(body);
	body.matrixAutoUpdate =false;

	  //-----------------------------------------//
	 //               twelve tick               //
	//-----------------------------------------//	
	var geo2 = new THREE.BoxGeometry( 0.7, 5, 0.5 );
	var mat2 = new THREE.MeshPhongMaterial({color: "black",side:THREE.DoubleSide} );
	var twelve_tick = new THREE.Mesh(geo2, mat2);
	body.add(twelve_tick);
	twelve_tick.rotation.x=Math.PI/2;
	twelve_tick.position.y=1.5;
	twelve_tick.position.z=17;
	twelve_tick.updateMatrixWorld();

	  //-----------------------------------------//
	 //               big ticks                 //
	//-----------------------------------------//
	var big_ticks=[11];
	for (var i=0; i<11; i++)
	{    
		big_ticks[i]=twelve_tick.clone();
		body.add(big_ticks[i]);
		var m = new THREE.Matrix4();
		m.makeRotationY(((i+1)*Math.PI)/6);
		big_ticks[i].applyMatrix(m);
		big_ticks[i].updateMatrixWorld();
	}
	
	  //---------------------------------------------------//
	 //  over write the normal 12 tick with a blue one    //
	//---------------------------------------------------//
	var geo3 = new THREE.BoxGeometry( 0.7, 5, 0.5 );
	var mat3 = new THREE.MeshPhongMaterial({color: "blue",side:THREE.DoubleSide} );
	var twelve_tick_marked= new THREE.Mesh(geo3, mat3);
	body.add(twelve_tick_marked);
	twelve_tick_marked.rotation.x=Math.PI/2;
	twelve_tick_marked.position.y=1.5;
	twelve_tick_marked.position.z=17;
	twelve_tick_marked.updateMatrixWorld();

	  //---------------------------------------------------//
	 //                 short tick template               //
	//---------------------------------------------------//
	var geo4 = new THREE.BoxGeometry( 0.4, 2.5, 0.5 );
	var mat4 = new THREE.MeshPhongMaterial({color: "black",side:THREE.DoubleSide} );
	var twelve_stick = new THREE.Mesh(geo4, mat4);
	body.add(twelve_stick);
	twelve_stick.rotation.x=Math.PI/2;
	twelve_stick.position.y=1.5;
	twelve_stick.position.z=18;
	twelve_stick.updateMatrixWorld();

	  //-----------------------------------------------//
	 //                     short ticks               //
	//-----------------------------------------------//
	var small_ticks=[71];
	for (var i=0; i<71; i++)
	{    
		small_ticks[i]=twelve_stick.clone();
		body.add(small_ticks[i]);
		var m = new THREE.Matrix4();
		m.makeRotationY(((i+1)*Math.PI)/30);
		small_ticks[i].applyMatrix(m);
		small_ticks[i].updateMatrixWorld();
	}
	
	  //-----------------------------------------------//
	 //            overwrite short tick               //
	//-----------------------------------------------//
	var geo5 = new THREE.BoxGeometry( 0.4, 2.5, 0.5);
	var mat5 = new THREE.MeshPhongMaterial({color: "blue",side:THREE.DoubleSide} );
	var twelve_stick_marked = new THREE.Mesh(geo5, mat5);
	body.add(twelve_stick_marked);
	twelve_stick_marked.rotation.x=Math.PI/2;
	twelve_stick_marked.position.y=1.5;
	twelve_stick_marked.position.z=18;
	twelve_stick_marked.updateMatrixWorld();

	  //-----------------------------------------------//
	 //                      blob                     //
	//-----------------------------------------------//
	var geo6 = new THREE.SphereGeometry( 1, 32, 32 );
	var mat6 = new THREE.MeshPhongMaterial( {color: "#772722",side:THREE.DoubleSide,shininess: 200} );
	var blob = new THREE.Mesh( geo6, mat6 );
	body.add( blob );
	blob.position.y=1.5;
	blob.updateMatrixWorld();

	  //-----------------------------------------------//
	 //                   short hand                  //
	//-----------------------------------------------//
	var geo7 = new THREE.SphereGeometry( 0.5, 32, 32 );
	var mat7 = new THREE.MeshBasicMaterial( {color: 0xE0042,side:THREE.DoubleSide} );
	var hour_hand= new THREE.Mesh( geo7, mat7 );
	body.add( hour_hand );
	hour_hand.position.y=2;
	hour_hand.position.z=5;
	hour_hand.geometry.scale(1,1,10);
	hour_hand.updateMatrixWorld();
	
	  //-----------------------------------------------//
	 //                   long hand                   //
	//-----------------------------------------------//
	var geo8 = new THREE.SphereGeometry( 0.5, 32, 32 );
	var mat8 = new THREE.MeshBasicMaterial( {color: 0xE0042,side:THREE.DoubleSide} );
	var minute_hand= new THREE.Mesh( geo8, mat8 );
	body.add( minute_hand );
	minute_hand.position.y=2;
	minute_hand.position.z=7.5;
	minute_hand.geometry.scale(1,1,15);
	minute_hand.updateMatrixWorld();

	  //-----------------------------------------------//
	 //              second counter hand              //
	//-----------------------------------------------//
	var geo9 = new THREE.CylinderGeometry( 0.1, 0.1, 15, 32 );
	var mat9 = new THREE.MeshPhongMaterial({color: "black",side:THREE.DoubleSide} );
	second_hand=new THREE.Mesh( geo9, mat9 );
	body.add(second_hand);
	second_hand.position.y=1.6;
	second_hand.rotation.z=Math.PI/2;
	second_hand.rotation.y=Math.PI/2;
	second_hand.position.z=7.5;
	second_hand.updateMatrixWorld();
	
	Clock.add(body);

	  //-----------------------------------------------//
	 //                back side clock                //
	//-----------------------------------------------//
	var second_clock=Clock.clone();
	scene.add(second_clock);
	second_clock.applyMatrix(new THREE.Matrix4().makeScale(1, -1, 1));
	second_clock.updateMatrixWorld();

	  //-----------------------------------------------//
	 //       locate short hand for front clock       //
	//-----------------------------------------------//
	var d1=new Date();
	var theta_hour=-((d1.getHours()*(Math.PI/6))+Math.floor(d1.getMinutes()/12)*Math.PI/30);
	var mh= new THREE.Matrix4();
	mh.makeRotationY(theta_hour);
	hour_hand.applyMatrix(mh);
	hour_hand.updateMatrixWorld();

	var ts=0;
	var tm=0;
	var tm_second=-30;

	  //-----------------------------------------------//
	 //      locate short hand for back clock         //
	//-----------------------------------------------//
	if(d1.getMinutes<30)
	var theta_hour_second=(Math.PI/2)-theta_hour;
	else
	var theta_hour_second=(Math.PI/2)-theta_hour; 
	mh.makeRotationY(theta_hour_second);
	scene.getObjectById(196).applyMatrix(mh);
	scene.getObjectById(196).updateMatrixWorld();
	
	  //-----------------------------------------------//
	 //                Draw everthing                 //
	//-----------------------------------------------//
	var controls = new THREE.TrackballControls( camera, canvas );
	
	function render() {
		requestAnimationFrame(render);
		
		var d = new Date();
		
	  //-----------------------------------------------//
	 //                   Delta time                  //
	//-----------------------------------------------//
		 delta_ts=d.getSeconds()-ts;
		var delta_tm=d.getMinutes()-tm;
		var delta_tm_second=d.getMinutes()-tm_second;

      //---------------------------------------------------------//
	 //     Rotate the second hands of both clocks each secon   //
	//---------------------------------------------------------//
		if(delta_ts!==0)
		{
			ts+=delta_ts;
		var ms= new THREE.Matrix4();
		ms.makeRotationY(-delta_ts*(Math.PI/30));
		second_hand.applyMatrix(ms);
		ms.makeRotationY(delta_ts*(Math.PI/30));
		scene.getObjectById(198).applyMatrix(ms);
		}
		
	  //---------------------------------------------------------//
	 //  Rotate the minute hand of the first clock each minute  //
	//---------------------------------------------------------//
		if(delta_tm!==0)
			{
				tm+=delta_tm;
				var mm= new THREE.Matrix4();
				mm.makeRotationY(-delta_tm*(Math.PI/30));
				minute_hand.applyMatrix(mm);
				minute_hand.updateMatrixWorld();
			}
			
	  //---------------------------------------------------------//
	 //  Rotate the minute hand of the second clock each minute //
	//---------------------------------------------------------//	
		if (delta_tm_second!==0)	
		{
			tm_second+=delta_tm_second;
			var mms= new THREE.Matrix4();
			mms.makeRotationY(delta_tm_second*(Math.PI/30));
			scene.getObjectById(197).applyMatrix(mms);
		}
		
	  //---------------------------------------------------------//
	 //   Rotate the hour hands of both clocks each 12 minutes  //
	//---------------------------------------------------------//		
		if(tm%12===0)
			if(ts===0&&delta_ts!==0)
		{
				var mh= new THREE.Matrix4();
				mh.makeRotationY(-Math.PI/30);
				hour_hand.applyMatrix(mh);
				hour_hand.updateMatrixWorld();
				mh.makeRotationY(Math.PI/30);
				scene.getObjectById(194).applyMatrix(mh);	        
		} 		
		controls.update();
		renderer.render(scene, camera);
	}
	render();
