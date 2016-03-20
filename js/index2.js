window.onload=function()
{
	var canvas=document.querySelector("#canvas");
	var canvas2=document.querySelector("#canvas2");
	var ctx=canvas.getContext("2d");
	var ctx2=canvas2.getContext("2d");
	var shengli=document.querySelector(".shengli");
	var shi=document.querySelector(".shi");
	var fou=document.querySelector(".fou");
	// var shux=0;
	// var hengx=0;
	var row=15;//棋盘大小
	var num=0;
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

	var kongbai={};
	for(var i=0;i<row;i++)
	{
		for(var j=0;j<row;j++)
		{
			
		}
	}

	var qizitu=document.querySelector("#sucai");
	var luozi=function(x,y,color)
	{
		var zx=39*x+13.5;
		var zy=39*y+13.5;
		if(color=='black')
		{
			ctx2.drawImage(qizitu,0,0,65,65,zx,zy,28,28)
		}
		else
		{
			ctx2.drawImage(qizitu,66,0,65,65,zx,zy,28,28)
		}
	}
	//调用落子函数  实现单击下子功能
	var t;
	// var ai=function()
	// {
	// 	do{
	// 		var u=Math.floor(Math.random()*15);
	// 		var i=Math.floor(Math.random()*15);
	// 		}
	// 	while(qizi[u+'-'+i])
	// 		return {x:u,y:i}
	// }
	var fangshouAI=function()
	{
		var max=10000;
		var xx={};
		for(var i in kongbai)
		{
			var pos=i;
			var x=pandun( Number(pos.split('-')[0]),Number(pos.split('-')[1]),'black');
			if(x>max)
			{
				max=x;
				xx.x=pos.split('-')[0];
				xx.y=pos.split('-')[0];
			}
		}
		return xx;
	}
	canvas2.onclick=function(ev)
	{	//console.log(qizi);
		//console.log(kaiguan)

		clearInterval(t);
		num=0;
		drawclock();
		t=setInterval(function()
			{num=num+1;
			 drawclock();
			 if(kaiguan)
			 	{  
			 		if(num==30){chaoshi.style.display="block";
			 				   shifouzailai.style.display="block";
		        			   shengli.classList.add('baiqisheng');
		        			   clearInterval(t);
		        			   canvas.onclick=null}
				}
			else if(kaiguan==false)
				{
					if(num==30){chaoshi2.style.display="block";
								shifouzailai.style.display="block";
		        				shengli.classList.add('heiqisheng');
		        				clearInterval(t);
		        				canvas.onclick=null}
				};
		},1000);
		var x=Math.round((ev.offsetX-27.5)/39);
		var y=Math.round((ev.offsetY-27.5)/39);

		if(qizi[x+'-'+y])
		{
			return;
		}
		luozi(x,y,'black');
		qizi[x+'-'+y]='black';
		delete kongbai
		var pos=ai();
		luozi(pos.x,pos.y,'white');
		qizi[pos.x+'-'+pos.y]='white';
		//对象的属性增加
		//对象的增删改查
		//console.log(qizi);

		//悔棋
		document.querySelector('#huiqi').onclick = function(){
		  var newqizi = {};//创建一个新对象
		 
		  for(var i in qizi){
		    if(i != (x+'-'+y)){//把当前点击的棋子除去之后，将qizi对象重新复制给newqizi;
		      newqizi[i] = qizi[i];
		    }
		  }
		  qizi = newqizi;//再把newqizi重新赋值给qizi，
		  console.log(qizi);
		  kaiguan = !kaiguan;
		  ctx2.clearRect(x*39+3,y*39+3,38,38);//擦除刚才点击过的棋子
			 num=0;
		  drawclock();
		}


		//判断输赢
		if(kaiguan){
		      if( panduan(x,y,'black') ){
		        //alert('黑旗赢');
		        clearInterval(t);	
		        shifouzailai.style.display="block";
		        shengli.classList.add('heiqisheng');
		      	
		      	canvas2.onclick  = null;        
		      }
		    }else{
		      if( panduan(x,y,'white') )
		      {
		        //alert('白棋赢');
		       clearInterval(t);
		        shifouzailai.style.display="block";
		        shengli.classList.add('baiqisheng');
		        
		        canvas2.onclick  = null;
		      }
		    }
		shi.onclick=function()
		{
		  localStorage.clear();
		  qizi = {};
		  huaqipan();
		  ctx2.clearRect(0,0,600,600);
		  kaiguan = true;
		  num=0;
		  drawclock();
		  clearInterval(t);
		  chaoshi2.style.display="none";
		  chaoshi.style.display="none";
		  shifouzailai.style.display="none";
		 shengli.classList.remove('baiqisheng');
		 shengli.classList.remove('heiqisheng');
		 canvas2.onclick=danjiluozi;
		  //return;
		}
		fou.onclick=function()
		{
		  clearInterval(t);
		  chaoshi2.style.display="none";
		  chaoshi.style.display="none";
		  shifouzailai.style.display="none";
		  canvas2.onclick  = null;
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

	var danjiluozi=canvas2.onclick;

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
	var chongxinkaishi=document.querySelector("#chongxin")
	chongxinkaishi.onclick=function()
	{
		localStorage.clear();
		location.reload();
	}

	





	var canvas1=document.querySelector("#biao1");
	var ctx1=canvas1.getContext("2d");

	var drawclock=function()
	{	
		//var d=new Date();
		ctx1.clearRect(0,0,250,230);
		//保存一个干净的画布状态
		ctx1.save();

		ctx1.translate(125,115);//移动画布原点到中心

		ctx1.save();//画最外层的表盘

		ctx1.strokeStyle="#2af";
		ctx1.lineWidth=5;
		ctx1.beginPath();
		ctx1.arc(0,0,100,0,Math.PI*2);
		ctx1.stroke();

		ctx1.restore();

		ctx1.save();//用循环画刻度

		ctx1.lineWidth=2;
		ctx1.lineCap="round";
		for (var i = 1; i < 61 ; i++)
		{
			ctx1.rotate(Math.PI/30);
			ctx1.beginPath();
			if(i%5==0)
			{	ctx1.lineWidth=2;
				ctx1.moveTo(68,0)
			}
			else
			{	ctx1.lineWidth=1;
				ctx1.moveTo(78,0)
			}
			ctx1.lineTo(89,0);
			ctx1.stroke();
		}

		ctx1.restore();

		ctx1.save();//秒针
		
		ctx1.rotate(Math.PI/30*num);
		ctx1.strokeStyle="red";
		ctx1.lineWidth=3;
		ctx1.lineCap="round";
		ctx1.beginPath();
		ctx1.moveTo(0,25);
		ctx1.lineTo(0,-55);
		ctx1.moveTo(5,-60);
		ctx1.arc(0,-60,5,0,Math.PI*2);
		ctx1.moveTo(0,-65);
		ctx1.lineTo(0,-75);
		ctx1.stroke();

		ctx1.restore();

		ctx1.save();//小圆

		ctx1.beginPath();
		ctx1.fillStyle="orange";
		ctx1.arc(0,0,8,0,Math.PI*2);
		ctx1.fill();

		ctx1.restore();
		
		ctx1.restore();//复原一开始干净的状态

		
	}
	drawclock();
	
	
}