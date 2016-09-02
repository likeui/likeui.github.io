$(function(){
	var clock = document.getElementById("c1");
	var cxt = clock.getContext("2d");
		//移动
	function drawClock() {
		//清除画布
		cxt.clearRect(0,0,500,500);
		//获取时间
		var date = new Date();
		var s = date.getSeconds();
		var m = date.getMinutes();
		var h = date.getHours();
		//小时要获取浮点类型(小时+分数转化成的小时)
		h = h + m/60;

		//转换24小时时间进制
		h = h>12 ? h-12 : h;
		//表盘
		cxt.lineWidth=10;
		cxt.strokeStyle="#aaa";
		cxt.beginPath();
		cxt.arc(250,250,200,0,360,false);
		cxt.closePath();
		cxt.stroke();
		//设置刻度颜色
		cxt.strokeStyle="#333";
		//时刻度
		for (var i = 0; i < 12; i++) {
			//保存之前状态，在异次元旋转角度
			cxt.save();
			cxt.lineWidth=7;
			//设置0，0点
			cxt.translate(250,250);
			//设置旋转角度  公式：角度*Math.PI/180=弧度
			cxt.rotate(i*30*Math.PI/180);
			cxt.beginPath();
			cxt.moveTo(0,-170);
			cxt.lineTo(0,-190);
			cxt.closePath();
			cxt.stroke();
			cxt.restore();
		};
		//分刻度
		for (var i = 0; i < 60; i++) {
			cxt.save();
			cxt.lineWidth=4;
			cxt.translate(250,250);
			cxt.rotate(i*6*Math.PI/180);
			cxt.beginPath();
			cxt.moveTo(0,-180);
			cxt.lineTo(0,-190);
			cxt.closePath();
			cxt.stroke();
			cxt.restore();
		};
		//时针
		cxt.save();
		cxt.lineWidth=7;
		cxt.translate(250,250);
		cxt.rotate(h*30*Math.PI/180);
		cxt.beginPath();
		cxt.moveTo(0,-140);
		cxt.lineTo(0,10);
		cxt.closePath();
		cxt.stroke();
		cxt.restore();
		//分针
		cxt.save();
		cxt.lineWidth=4;
		cxt.translate(250,250);
		cxt.rotate(m*6*Math.PI/180);
		cxt.beginPath();
		cxt.moveTo(0,-150);
		cxt.lineTo(0,15);
		cxt.closePath();
		cxt.stroke();
		cxt.restore();
		//秒针
		cxt.save();
		cxt.lineWidth=2;
		cxt.strokeStyle="red";
		cxt.translate(250,250);
		cxt.rotate(s*6*Math.PI/180);
		cxt.beginPath();
		cxt.moveTo(0,-160);
		cxt.lineTo(0,15);
		cxt.closePath();
		cxt.stroke();
		//设置圆心的小圆点
		cxt.beginPath();
		cxt.arc(0,0,5,0,360,false);
		cxt.closePath();
		cxt.fillStyle="gray";
		cxt.fill();
		cxt.stroke();
		//设置针头上的小圆点
		cxt.beginPath();
		cxt.arc(0,-150,5,0,360,false);
		cxt.closePath();
		cxt.fillStyle="gray";
		cxt.fill();
		cxt.stroke();

		cxt.restore();
	}
	drawClock();
	setInterval(drawClock,1000);
});
$(function(){
	var clock = document.getElementById("c2");
	var cxt = clock.getContext("2d");	//webgl制作3d绘图，部分浏览器支持
	cxt.lineWidth=1;		
	cxt.fillStyle="red";	//填充实心颜色
	cxt.strokeStyle="red";	//填充边框颜色
	cxt.beginPath();
	cxt.fillRect(0,0,100,100);
	cxt.strokeRect(105,0,99.5,99.5);
	cxt.closePath();
	cxt.stroke();
	//边框三角形
	cxt.beginPath();
	cxt.moveTo(260,0);
	cxt.lineTo(210,100);
	cxt.lineTo(320,100);
	cxt.closePath();
	cxt.stroke();
	//实体三角形
	cxt.beginPath();
	cxt.moveTo(390,0);
	cxt.lineTo(350,100);
	cxt.lineTo(460,100);
	cxt.closePath();
	cxt.fill();

	//鼠标画线
	clock.onmousedown = function(ev){
		var ev = ev || window.event;
		cxt.moveTo(ev.clientX-clock.offsetLeft,ev.clientY-clock.offsetTop);
		document.onmousemove = function(ev){
			var ev = ev || window.event;
			cxt.lineTo(ev.clientX-clock.offsetLeft,ev.clientY-clock.offsetTop);
			cxt.stroke();
		}
	}
	clock.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup = null;
	}


	var num = 0;
	//方块移动
	setInterval(function(){
		cxt.clearRect(0,num,100,100);
		num++;
		cxt.fillRect(0,num,100,100);
		if(num>200){
			cxt.clearRect(0,num,100,100);
			num = 0;
		}
	},20);

	var num1 = 0;
	//偏移
	setInterval(function(){
		num1++;
		cxt.save();
		cxt.translate(205,205);
		cxt.rotate(num1*Math.PI/180);
		cxt.translate(-25,-25);
		cxt.fillRect(0,0,50,50);
		cxt.restore();
	},20);
});




$(function() {
	var c = document.getElementById("c3");
	var c3 = c.getContext("2d");	

	var time = 0;
	

	//地球转动
	// setInterval(function(){
	// 	c3.clearRect(0,0,500,500);
	// 	//画轨道
	// 	c3.strokeStyle = "#333";
	// 	c3.beginPath();
	// 	c3.arc(250,250,100,0,360,false);
	// 	c3.closePath();
	// 	c3.stroke();
	// 	//画太阳
	// 	c3.beginPath();
	// 	c3.arc(250,250,50,0,360,false);
	// 	c3.closePath();
	// 		//填充太阳颜色(镜像渐变)createRadialGradient(内圆心X,内圆心Y，内半径，外x，外y，外半径);
	// 	var sunColor = c3.createRadialGradient(250,250,0,250,250,50);
	// 	sunColor.addColorStop(0,"#f60");
	// 	sunColor.addColorStop(1,"#f30");
	// 	c3.fillStyle = sunColor;
	// 	c3.fill();

	// 	//画地球
	// 	c3.save();
	// 	c3.translate(250,250);
	// 	c3.rotate(time*365/360*Math.PI/180);
	// 	c3.beginPath();
	// 	c3.arc(0,-100,10,0,360,false);
	// 	c3.closePath();
	// 		//填充地球颜色
	// 	var dqColor = c3.createRadialGradient(0,-100,0,0,-100,10);
	// 	dqColor.addColorStop(0,"#78b1e8");
	// 	dqColor.addColorStop(1,"#38f");
	// 	c3.fillStyle = dqColor;
	// 	c3.fill();
	// 	c3.restore();
	// 	// time ++;
	// },50);

	function drawTrack() {
		for (var i = 0; i < 8; i++) {
			c3.strokeStyle = "#ddd";
			c3.beginPath();
			c3.arc(250,250,(i+1)*30,0,360,false);
			c3.closePath();
			c3.stroke();
		};
	}
	function star(x,y,radius,cycle,cb,ce) {
		//星球坐标
		this.x = x;
		this.y = y;
		//星球半径
		this.radius = radius;
		//公转周期
		this.cycle = cycle;
		//颜色
		this.c1 = cb;
		this.c2 = ce;
		//渐变色对象
		this.color = null;
		this.time = 0;
		this.draw = function() {
			c3.save();
			//重置0，0坐标
			c3.translate(250,250);
			//设置旋转角度
			c3.rotate(this.time*(360/cycle)*Math.PI/180);
			//画星球
			c3.beginPath();
			c3.arc(this.x,this.y,this.radius,0,360,false);
			c3.closePath();
			//填充颜色
			var xqColor = c3.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius	);
			xqColor.addColorStop(0,this.c1);
			xqColor.addColorStop(1,this.c2);
			c3.fillStyle = xqColor;
			c3.fill();
			c3.restore();

			this.time ++;
		}
	}

	function f1 () {
		star.call(this,0,0,20,0,"#f60","#f30");
	}
	function f2 () {
		star.call(this,0,-30,6,87.70,"#a69697","#5c3e40");
	}
	function f3 () {
		star.call(this,0,-60,8,224.701,"#c4bbac","#1f1315");
	}
	function f4 () {
		star.call(this,0,-90,9,365,"#78b1e8","#050c12");
	}
	function f5 () {
		star.call(this,0,-120,7,700,"#cec9b6","#76422d");
	}
	function f6 () {
		star.call(this,0,-150,13,4500,"#c0a48e","#322222");
	}
	function f7 () {
		star.call(this,0,-180,11,10000,"#f7f9e3","#5c4533");
	}
	function f8 () {
		star.call(this,0,-210,10,30000,"#a7e1e5","#19243a");
	}
	function f9 () {
		star.call(this,0,-240,10,60000,"#0061b2","#1e3b73");
	}
	var a = new f1();
	var b = new f2();
	var c = new f3();
	var d = new f4();
	var e = new f5();
	var f = new f6();
	var g = new f7();
	var h = new f8();
	var i = new f9();

	function move() {
		c3.clearRect(0,0,500,500);
		drawTrack();
		a.draw();
		b.draw();
		c.draw();
		d.draw();
		e.draw();
		f.draw();
		g.draw();
		h.draw();
		i.draw();
	}

	setInterval(move,50);
});



