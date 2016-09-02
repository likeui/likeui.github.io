// ;!(function() {
// 	//获取需要的对象
// 	function A() {
// 		this.menu = $("#nav_menu");
// 		this.clienth = document.documentElement.clientHeight;
// 	}
// 	//获取左侧菜单
// 	function B() {
// 		return  [{
// 			cn : '旋转',en : 'spinner'},{
// 			cn : '脉动',en : 'pulse'},{
// 			cn : '缩放',en : 'scale'},{
// 			cn : '运动',en : 'run'
// 		}]
// 	}
// 	//创建左侧菜单
// 	function C(a) {
// 		var str = B(), menu = a.menu;
// 		menu.append('<ul class="nav shadow anime"><li class="nav-header">'+get_file_name()+'</li></ul>');
// 		var ul = menu.find("ul");
// 		$.each(str, function(index, val) {
// 			setTimeout(function() {
// 				li = '<li class="anime fadeInUp"><a href="demo'+index+'">'+str[index].cn+'</a></li>';
// 				ul.append(li);
// 				var li = ul.find('li');

// 				setTimeout(function(){
// 					li.removeClass('anime fadeInUp');
// 				}, 2000);

// 				li.eq(1).addClass('active');				
// 			}, index * 200);
// 		});
// 	}
// 	function E(a) {
// 		var menu = a.menu;
// 		menu.css("height",a.clienth);

// 		var menutop = menu.offset().top;
// 		$(window).scroll(function(event) {
// 			var tTop = $(this).scrollTop();
// 			if(tTop > menutop-30) {
// 				menu.addClass('fixed').css("top",0);
// 			}else {
// 				menu.removeClass('fixed').css("top",30);
// 			}
// 		});
// 	}
// 	var a = new A();
// 	E(a),C(a);
// })();

function get_file_name(){
	str=window.location.pathname;
	var strarray=str.split("/");
	var filename=strarray[strarray.length-1];
	var fileName=filename.split(".");
	return fileName[0];
}
var naval = 
[{
	eglish:"anime",
	name:"动画"
},{
	eglish:"button",
	name:"按钮"
},{
	eglish:"color",
	name:"颜色"
},{
	eglish:"form",
	name:"表单"
},{
	eglish:"grid",
	name:"布局"
},{
	eglish:"icon",
	name:"图标"
},{
	eglish:"loader",
	name:"加载"
},{
	eglish:"nav",
	name:"导航"
},{
	eglish:"paging",
	name:"分页"
},{
	eglish:"table",
	name:"表格"
}];

//创建顶部菜单
var li = '';
for (var i = 0; i < naval.length; i++) {
	var eglish = naval[i].eglish, name = naval[i].name;
	if(eglish=="index"){
		li += '<li data-id="'+eglish+'"><a href="'+eglish+'.html">'+name+'</a></li>';
	}else{
		li += '<li data-id="'+eglish+'"><a href="'+eglish+'.html">'+name+'</a></li>';
	}
};
var hdhtml = '<div class="navbar"><div class="container"><h1 class="navbar-brand cp"><a href=""><img src="images/logo.png"></a></h1><button id="button" data-rel="more" class="navbar-toggle radius"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><div id="more" class="navbar-collapse navbar-right"><ul class="nav navbar-nav">'+li+'</ul></div></div></div>';
$("#header").append(hdhtml);

if(get_file_name()){
	dataId = $("[data-id="+get_file_name()+"]");
	dataId.addClass('active').find("a").attr("href","javascript:;");
}else{
	$(".nav li:eq(0)").addClass('active').find("a").attr("href","javascript:;");
}


$(".navbar-toggle").click(function(event) {
	$(this).next().toggle(200);
});


//代码高亮插件
(function(){
	hljs.configure({tabReplace: '    '});
	hljs.initHighlightingOnLoad();

	var docCdoe = document.getElementsByTagName("code");
	for (var i = 0; i < docCdoe.length; i++) {
		var lines = docCdoe[i].innerText.split('\n').length;
		var obj = document.createElement("ul");
		obj.className = "pre-numbering";
		docCdoe[i].parentNode.appendChild(obj);
		for (var j = 1; j <= lines; j++) {
			var li = document.createElement("li");
			li.innerHTML = j;
			obj.appendChild(li);
		};
	};
})($);



// var menu = $(".menu"), menutop = menu.offset().top, 
// // menu.css("height",clienth);

// $(".demo").each(function(index, el) {
// 	$(this).attr("id","demo"+index);
// 	topGroup[index] = $(this).offset().top;
// });
// menu.find("a").click(function(event) {
// 	event.preventDefault();
// 	var s = $("#"+$(this).attr("href")).offset().top;
// 	$("body,html").animate({scrollTop: s-85}, 500);
// });

// $(window).scroll(function(event) {
// 	var tTop = $(this).scrollTop();
// 	if(tTop > menutop-30) {
// 		menu.addClass('fixed').css("top",0);
// 	}else {
// 		menu.removeClass('fixed').css("top",30);
// 	}
// });