//不可选中图标
var uncheck = [
	$("#erasers"),			//清除画板
	$("#zoom_in"),			//放大
	$("#zoom_out"),			//缩小
]
//笔触宽度
var check = [
	$("#line_1"),			
	$("#line_2"),			
	$("#line_3"),			
	$("#line_4")			
]
//工具
var radio = [
	$("#pencil"),			//画笔
	$("#eraser"),			//橡皮擦
	$("#paint_format"), 	//刷子
	$("#font"),				//字体
	$("#line"),				//直线
	$("#arc"),				//实心圆
	$("#arco"),				//空心圆
	$("#rect"),				//实心矩形
	$("#recto"),			//虚心矩形
	$("#eyedropper")		//吸管
];
//设置选中状态
var onStatus = function (obj,num) {
	for (var i = 0; i < obj.length; i++) {
		if(i==num){
			obj[num].addClass('on');
		}else{
			obj[i].removeClass('on');
		}
	};
}
window.onload = function() {
	var canvas = document.getElementById("canvas");
	var c = canvas.getContext("2d");//webgl制作3d绘图，部分浏览器支持

	var w = $(".canvas").width(), h = $(".canvas").height(); 
	canvas.width = w;
	canvas.height = h;

	var zoomFlag = true;
	//放大
	function zoomIn() {
		var cs = $(canvas);
		var c_w = cs.width();
		var c_h = cs.height();
		if(c_w<w){
			if(zoomFlag){
				zoomFlag = false;
				cs.stop().animate({
					width:c_w*1.5,
					height:c_h*1.5
				}, 100,function(){
					zoomFlag = true;
				});
			}
		}
	}

	//缩小
	function zoomOut() {
		var cs = $(canvas);
		var c_w = cs.width();
		var c_h = cs.height();
		if(c_w>w-600){
			if(zoomFlag){
				zoomFlag = false;
				cs.stop().animate({
					width:c_w/1.5,
					height:c_h/1.5
				}, 100,function(){
					zoomFlag = true;
				});
			}
		}
	}

	//画笔
	function drawPencil() {
		canvas.className = 'ico-pencil';
		canvas.onmousedown = function(ev) {
			ev = ev || window.event;
			var beginX = ev.clientX-canvas.offsetLeft, beginY = ev.clientY-canvas.offsetTop;
			c.beginPath();
			c.moveTo(beginX,beginY+16);
			document.onmousemove = function(ev){
				ev = ev || window.event;
				var endX = ev.clientX-canvas.offsetLeft, endY = ev.clientY-canvas.offsetTop;
				c.lineTo(endX,endY+16);
				c.stroke();
			}
		}

		canvas.onmouseup = canvas.onmouseout = function() {
			document.onmousemove = null;
		}
	}

	//橡皮擦
	function eraser() {
		canvas.className = 'ico-eraser';
		canvas.onmousedown = function(ev) {
			var xp = c.lineWidth*2;	//橡皮擦大小
			ev = ev || window.event;
			var beginX = ev.clientX-this.offsetLeft, beginY = ev.clientY-this.offsetTop;
			c.clearRect(beginX-xp,beginY-xp+16,xp*2,xp*2);
			document.onmousemove = function(ev){
				ev = ev || window.event;
				var endX = ev.clientX-canvas.offsetLeft, endY = ev.clientY-canvas.offsetTop;
				c.clearRect(endX-xp,endY-xp+16,xp*2,xp*2);
			}
		}

		canvas.onmouseup = canvas.onmouseout = function() {
			document.onmousemove = null;
		}
	}

	//填充
	function fill() {
		canvas.className = 'ico-paint';
		canvas.onmousedown = function(ev) {
			c.fillRect(0,0,w,h);
		}
		canvas.onmouseup = canvas.onmouseout = function() {
			document.onmouseout = document.onmousemove = null;
		}
	}

	//字体
	function font() {
		canvas.className = 'ico-text';
		canvas.onmousedown = function(ev) {
			ev = ev || window.event;
			var beginX = ev.clientX-this.offsetLeft, beginY = ev.clientY-this.offsetTop;
			var val = window.prompt("请输入要插入的内容");
			if(val!=null){
				c.font = "30px '微软雅黑'";
				c.fillText(val,beginX,beginY);
				c.font = "6px '微软雅黑'";
				c.fillText("珂哥文本工具",beginX,beginY+20);
			}
		}
		canvas.onmouseup  = function(ev) {
			document.onmouseup = document.onmouseout = document.onmousemove = null;
		}
	}

	//直线
	function drawLine() {
		canvas.className = 'ico-crosshair';
		canvas.onmousedown = function(ev) {
			ev = ev || window.event;
			var beginX = ev.clientX-this.offsetLeft, beginY = ev.clientY-this.offsetTop;
			c.beginPath();
			c.moveTo(beginX,beginY);
		}

		canvas.onmouseup  = function(ev) {
			ev = ev || window.event;
			var endX = ev.clientX-canvas.offsetLeft, endY = ev.clientY-canvas.offsetTop;
			c.lineTo(endX,endY);
			c.closePath();
			c.stroke();
			document.onmouseout = document.onmousemove = null;
		}
	}

	//圆
	function arc(type) {
		canvas.className = 'ico-crosshair';
		var beginX=0,beginY=0;
		canvas.onmousedown = function(ev) {
			ev = ev || window.event;
			beginX = ev.clientX-this.offsetLeft, beginY = ev.clientY-this.offsetTop;
		}

		canvas.onmouseup  = function(ev) {
			ev = ev || window.event;
			var endX = ev.clientX-canvas.offsetLeft, endY = ev.clientY-canvas.offsetTop;
			//计算半径
			var a = endX-beginX;
			var b = endY-beginY;
			var d = Math.sqrt(a*a+b*b);
			c.beginPath();
			c.arc(beginX,beginY,d,0,360,false);
			c.closePath();
			if(type==1){
				c.fill();
			}else{
				c.stroke();
			}
			document.onmouseout = document.onmousemove = null;
		}
	}

	//矩形
	function rect(type) {
		canvas.className = 'ico-crosshair';
		var beginX=0,beginY=0;
		canvas.onmousedown = function(ev) {
			ev = ev || window.event;
			beginX = ev.clientX-this.offsetLeft, beginY = ev.clientY-this.offsetTop;
		}

		canvas.onmouseup  = function(ev) {
			ev = ev || window.event;
			var endX = ev.clientX-canvas.offsetLeft, endY = ev.clientY-canvas.offsetTop;
			//计算半径
			var a = endX-beginX;
			var b = endY-beginY;
			if(type==1){
				c.fillRect(beginX,beginY,a,b);
			}else{
				c.strokeRect(beginX,beginY,a,b);
			}
			document.onmouseout = document.onmousemove = null;
		}
	}

	//吸管
	function straw() {
		canvas.className = 'ico-straw';
		canvas.onmousedown = function(ev) {
			canvas.className = 'ico-straw2';
			ev = ev || window.event;
			var beginX = ev.clientX-this.offsetLeft, beginY = ev.clientY-this.offsetTop;
			//获取图像信息getImageData(开始点x,y,w,h);
			var obj = c.getImageData(beginX,beginY+15,1,1);
			var color = "rgb("+obj.data[0]+","+obj.data[1]+","+obj.data[2]+")";
			c.strokeStyle = color;
			c.fillStyle = color;
			$("#color").css("background-color",color);
		}
		canvas.onmouseup  = function(ev) {
			document.onmouseup = document.onmouseout = document.onmousemove = null;
		}
	}

	//色池
	$("#color").click(function(event) {
		$("input.color").click();
	});

	drawPencil();
	//获取工具和形状按钮
	$.each(radio, function(index, val) {
		val.click(function(event) {
			onStatus(radio,index);
			switch(index){
				case 0 :
					drawPencil();
					break;
				case 1 :
					eraser();
					break;
				case 2 :
					fill();
					break;
				case 3 :
					font();
					break;
				case 4 :
					drawLine();
					break;
				case 5 :
					arc(1);
					break;
				case 6 :
					arc();
					break;
				case 7 :
					rect(1);
					break;
				case 8 :
					rect();
					break;
				case 9 :
					straw();
					break;
			}
		});
	});

	//获取线宽按钮
	$.each(check, function(index, val) {
		val.click(function(event) {
			onStatus(check,index);
			switch(index){
				case 0 : 
					c.lineWidth = 1;
					break;
				case 1 : 
					c.lineWidth = 3;
					break;
				case 2 : 
					c.lineWidth = 5;
					break;
				case 3 : 
					c.lineWidth = 7;
					break;	
			}
		});
	});

	$.each(uncheck, function(index, val) {
		val.click(function(event) {
			switch(index){
				case 0 :
					c.clearRect(0,0,w,h);
					break;
				case 1 : 
					zoomIn();
					break;
				case 2 : 
					zoomOut();
					break;
			}
		});
	});

	//选择颜色
	$("input.color").change(function(event) {
		c.strokeStyle = $(this).val();
		c.fillStyle = $(this).val();
		$("#color").css("background-color",$(this).val());
	});
}
// //rgb转16进制
// 	function zero_fill_hex(num, digits) {
// 		var s = num.toString(16);
// 		while (s.length < digits)
// 		s = "0" + s;
// 		return s;
// 	}
// 	function rgb2hex(rgb) {
// 		if (rgb.charAt(0) == '#')
// 		return rgb;
// 		var ds = rgb.split(/\D+/);
// 		var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
// 		return "#" + zero_fill_hex(decimal, 6);
// 	}