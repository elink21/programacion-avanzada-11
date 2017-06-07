
		/*function drawRect()
		{
			can.fillStyle="gray";
			var size=document.getElementById("size").value;
			can.fillRect(0,0,size,size);
		}*/
		function updateColor(value)
		{
			s.innerHTML=value.toString();
			color=value.toString();
		}
		function saveImg()
		{
			s.innerHTML="Guardando imagen";
			var dataUrl = c.toDataURL(); 
			window.open(dataUrl, "Ejemplo", "width=400, height=400");
			
		}

		function updateSize()
		{
			size=document.getElementById("size").value;
		}

		function reset()
		{
			can.clearRect(0, 0, c.width, c.height);
			can.beginPath();
			can.fillStyle="gray";
			drawGrid();
			cx=0;
			cy=0;
		}
		
		/*function draw(e){
			x = e.clientX;
			y = e.clientY;
			can.fillStyle = "white";
			can.beginPath();
			can.fillRect(x,y,50,50);
			//can.arc(x,y,40,0,2*Math.PI);	
			can.stroke();
		}*/



		function drawGrid()
		{
			can.fillStyle="gray";
			can.font="10px Arial";
			var grid=0;
			var step=50;
			for(grid;grid<800;grid+=step)
			{
				can.fillText(grid.toString(),grid,20);
				can.moveTo(grid,0);
				can.lineTo(grid,600);
				can.stroke();
			}
			grid=0;
			for(grid;grid<600;grid+=step)
			{
				can.fillText(grid.toString(),20,grid);
				can.moveTo(0,grid);
				can.lineTo(800,grid);
				can.stroke();
			}
		}

		function eraseToggle()
		{
			isErasing=!isErasing;
			if(isErasing)
			{
				isDrawing=false;
				isCircle=false;
				s.innerHTML="Goma activa";
			}
			else
			{
				drawGrid();
				if(!isDrawing && !isCircle)
				{
					s.innerHTML="No hay herramientas activas";
				}
				else if(!isCircle)
				{
					s.innerHTML="Lapiz activo"
				}
				else 
				{
					s.innerHTML="Circulo activo, da click para generar";
				}
			}
		}

		function drawToggle()
		{
			isDrawing=!isDrawing;
			if(isDrawing)
			{
				isErasing=false;
				isCircle=false;
				s.innerHTML="Lapiz activo";
			}
			else 
			{
				if(!isErasing && !isCircle)
				{
					s.innerHTML="No hay herramientas activas";
				}
				else if(!isCircle)
				{
					s.innerHTML="Goma activa";
				}
				else
				{
					s.innerHTML="Circulo activo, da click para generar";
				}
			}
		}
		function circleToggle()
		{
			isCircle=!isCircle;
			if(isCircle)
			{
				isErasing=false;
				isDrawing=false;
				s.innerHTML="Circulo activo, da click para generar";
			}
			else 
			{
				if(!isErasing && !isDrawing)
				{
					s.innerHTML="No hay herramientas activas";
				}
				else if(isErasing)
				{
					s.innerHTML="Goma activa";
				}
				else{
					s.innerHTML="Lapiz activo";
				}
			}
		}
		var size=document.getElementById("size").value;
		var color="";
		var isErasing=false;
		var isDrawing=false;
		var isCircle=false;
		var isActive=false;
		var s=document.getElementById("status");
		var c=document.getElementById("mc");
		var can=c.getContext("2d");
		drawGrid();


		c.addEventListener("mousedown",function	(event){
			isActive=true;
			if(isCircle)
			{
				can.beginPath();
				can.arc(event.clientX,event.clientY,size,0,2*Math.PI);
			}
		},false);

		c.addEventListener("mousemove",function(event)
		{
			if(isActive)
			{
				updateSize();
				if(isDrawing)
				{
					can.fillStyle=color;
					can.fillRect(event.clientX,event.clientY,size,size);
				}
				else if(isErasing)
				{
					can.fillStyle="white";
					can.fillRect(event.clientX,event.clientY,size,size);
				}
			}
		},false);
		c.addEventListener("mouseup",function(event)
		{
			isActive=false;
			drawGrid();
		},false);
