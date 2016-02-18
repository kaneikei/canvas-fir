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
	
}