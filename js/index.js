window.onload=function()
{
	var canvas=document.querySelector("#canvas");
	var ctx=canvas.getContext("2d");
	// var shux=0;
	// var hengx=0;
	var row=15;//棋盘大小
	var qizi={};//所有的落子数据
	var kaiguan=localStorage.x?false:true;//控制该谁落子
	var huaqipan=function()
	{	
		ctx.clearRect(0,0,600,600);
		for(var i=0;i<row;i++)
		{
			ctx.beginPath();
			ctx.moveTo(27.5+i*39,27);
			ctx.lineTo(27.5+i*39,573);
			ctx.stroke();
		}
		
		for(var i=0;i<row;i++)
		{
			ctx.beginPath();
			ctx.moveTo(27,27.5+i*39);
			ctx.lineTo(573,27.5+i*39);
			ctx.stroke();
		}

		ctx.beginPath();
		ctx.arc(300.5,300.5,4,0,Math.PI*2);
		ctx.fill();

		var z=[144.5,456.5];//棋盘黑点位置数据
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
	huaqipan();


	// var lingrad=ctx.createLinearGradient(20,300,600,300);//颜色的起点 终点  线性渐变
	// lingrad.addColorStop(0,"red");
	// lingrad.addColorStop(0.2,"orange");
	// lingrad.addColorStop(0.4,"yellow");
	// lingrad.addColorStop(0.6,"green");
	// lingrad.addColorStop(0.8,"blue");
	// lingrad.addColorStop(1,"purple");

	// ctx.lineWidth=6;
	// ctx.lineCap="round";//butt或square
	// ctx.strokeStyle=lingrad;

	// ctx.beginPath();
	// ctx.moveTo(20,300);
	// ctx.lineTo(580,300);
	// ctx.stroke();

	// ctx.beginPath();
	// ctx.fillRect(0,0,600,200);
	// ctx.fill()

	//x number 落子x坐标
	//y number 落子y坐标
	//color boolean  true代表黑子 false代笔白子
	var luozi2=function(x,y,color)
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
	var qizitu=document.querySelector("#sucai");
	var luozi=function(x,y,color)
	{
		var zx=39*x+13.5;
		var zy=39*y+13.5;
		if(color)
		{
			ctx.drawImage(qizitu,0,0,65,65,zx,zy,28,28)
		}
		else
		{
			ctx.drawImage(qizitu,66,0,65,65,zx,zy,28,28)
		}
	}
	//调用落子函数  实现单击下子功能
	canvas.onclick=function(ev)
	{
		var x=Math.round((ev.offsetX-27.5)/39);
		var y=Math.round((ev.offsetY-27.5)/39);

		if(qizi[x+'-'+y])
		{
			return;
		}
		luozi(x,y,kaiguan);
		qizi[x+'-'+y]=kaiguan?'black':'white';
		//对象的属性增加
		//对象的增删改查
		
		//判断输赢
		if(kaiguan){
		      if( panduan(x,y,'black') ){
		        alert('黑旗赢');
		        if(confirm('是否再来一局')){
		          localStorage.clear();
		          qizi = {};
		          huaqipan();
		          kaiguan = true;
		          return;
		        }else{
		          canvas.onclick  = null;
		        }
		      }
		    }else{
		      if( panduan(x,y,'white') ){
		        alert('白棋赢');
		        if(confirm('是否再来一局')){
		          localStorage.clear();
		          qizi = {};
		          huaqipan();
		          kaiguan = true;
		          return;
		        }else{
		          canvas.onclick = null;
		        }
		      }
		    }

		kaiguan=!kaiguan;

		localStorage.data=JSON.stringify(qizi);


		if(!kaiguan)
		{
			localStorage.x=1;
		}
		else
		{
			localStorage.removeItem("x");
		}
	}

	var xy2id = function(x,y) {
	    return x + '-' + y;
	  }
	  var panduan = function(x,y,color) {
	    var shuju = filter(color);
	    var tx,ty,hang = 1;shu = 1; zuoxie= 1;youxie = 1;
	    tx=x;ty=y;while( shuju[ xy2id( tx-1,ty ) ]){tx--;hang++};
	    tx=x;ty=y;while( shuju[ xy2id( tx+1,ty ) ]){tx++;hang++};
	    if(hang >= 5){return true};
	    tx=x;ty=y;while( shuju[ xy2id( tx,ty-1 ) ]){ty--;shu++};
	    tx=x;ty=y;while( shuju[ xy2id( tx,ty+1 ) ]){ty++;shu++};
	    if(shu >= 5){return true};
	    tx=x;ty=y;while( shuju[ xy2id( tx+1,ty-1 ) ]){tx++;ty--;zuoxie++};
	    tx=x;ty=y;while( shuju[ xy2id( tx-1,ty+1 ) ]){tx--;ty++;zuoxie++};
	    if(zuoxie >= 5){return true};
	    tx=x;ty=y;while( shuju[ xy2id( tx-1,ty-1 ) ]){tx--;ty--;youxie++};
	    tx=x;ty=y;while( shuju[ xy2id( tx+1,ty+1 ) ]){tx++;ty++;youxie++};
	    if(youxie >= 5){return true};
	  }
	  var filter = function(color) {
	    var r = {};
	    for(var i in qizi){
	      if(qizi[i]  == color){
	        r[i] = qizi[i];
	      }
	    }
	    return r;
	  }
	//如果本地存储中有棋盘数据，则读取并绘制到页面中
	if(localStorage.data)
	{
		qizi=JSON.parse(localStorage.data);
		for(var i in qizi)
		{
			var x=i.split("-")[0];
			var y=i.split("-")[1];
			luozi(x,y,(qizi[i]=='black')?true:false)
		}
	}

	//清理数据
	document.ondblclick=function()
	{
		localStorage.clear();
		location.reload();
	}
	canvas.ondblclick=function(e)//阻止冒泡
	{
		e.stopPropagation()
	}
	
}