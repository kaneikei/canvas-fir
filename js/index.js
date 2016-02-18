window.onload=function()
{
	var canvas=document.querySelector("#canvas");
	var ctx=canvas.getContext("2d");
	var shux=0;
	var hengx=0;
	for(var i=0;i<15;i++)
	{
		ctx.beginPath();
		ctx.moveTo(27.5+shux,27);
		ctx.lineTo(27.5+shux,573);
		ctx.stroke();
		shux+=39;
	}
	
	for(var i=0;i<15;i++)
	{
		ctx.beginPath();
		ctx.moveTo(27,27.5+hengx);
		ctx.lineTo(573,27.5+hengx);
		ctx.stroke();
		hengx+=39;
	}

	ctx.beginPath();
	ctx.arc(300.5,300.5,4,0,Math.PI*2);
	ctx.fill();

	var z=[144.5,456.5];
	for(var i=0;i<z.length;i++)
	{
		for(var j=0;j<z.length;j++)
		{
			ctx.beginPath();
			ctx.arc(z[i],z[j],4,0,Math.PI*2);
			ctx.fill();
		}
	}


	var lingrad=ctx.createLinearGradient(20,300,600,300);//颜色的起点 终点  线性渐变
	lingrad.addColorStop(0,"red");
	lingrad.addColorStop(0.2,"orange");
	lingrad.addColorStop(0.4,"yellow");
	lingrad.addColorStop(0.6,"green");
	lingrad.addColorStop(0.8,"blue");
	lingrad.addColorStop(1,"purple");

	ctx.lineWidth=6;
	ctx.lineCap="round";//butt或square
	ctx.strokeStyle=lingrad;

	// ctx.beginPath();
	// ctx.moveTo(20,300);
	// ctx.lineTo(580,300);
	// ctx.stroke();

	// ctx.beginPath();
	// ctx.fillRect(0,0,600,200);
	// ctx.fill()

	var luozi=function(x,y,color)
	{	
		var zx=39*x+27.5;
		var zy=39*y+27.5;
		var black=ctx.createRadialGradient(zx,zy,1,zx,zy,14);
		black.addColorStop(0.1,"#555");
		black.addColorStop(1,"black");
		var white=ctx.createRadialGradient(zx,zy,1,zx,zy,14);
		white.addColorStop(0.1,"#fff");
		white.addColorStop(1,"#EdEdEd");
		ctx.fillStyle=color?black:white;
		ctx.beginPath();
		ctx.arc(zx,zy,14,0,Math.PI*2);
		ctx.fill();
	}
	luozi(3,3,true);
	luozi(4,3,false);
	
	
}