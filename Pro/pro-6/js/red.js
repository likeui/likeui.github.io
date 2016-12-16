var base = {
	url : "http://uat.jintouhui.com/",
	infoApi : "phone /act/10020/getActBatch",
	playApi : "phone /act/10020/act_hbPlay",
	batchNumber : "",
	token : function() {
		return "?token=WlwBWlIGBgMfUlsGVQEODlQPVE5UUQBSCl5YUVxSDVdR";
	}
};
popItem = {};
var l = {
	showPop: function(obj, options) {
		popItem.obj = $(obj);
		popItem.mask = popItem.obj.find(".d-mask");
		popItem.wrap = popItem.obj.find(".d");
		popItem.ok = popItem.obj.find("[type='1']");

		popItem.obj.show();
		popItem.mask.addClass('active');
		popItem.wrap.addClass('active');

		popItem.ok.on(this.device(), function(event) {
			l.hidePop();
		});

		if ( options ) {
			var cls = "";
			options.type == 1 ? cls = "d-info" : options.type == 2 ? cls = "d-warn" : cls = "d-succ";
			popItem.obj.find(".k-icon").removeClass().addClass("k-icon " + cls);
			popItem.obj.find(".l-hd").text(options.title);
			popItem.obj.find(".l-ft").text(options.content);
		}
	},
	hidePop: function() {
		popItem.mask.removeClass('active');
		popItem.wrap.removeClass('active');

		setTimeout(function() {
			popItem.obj.hide()
		}, 600);
	},
	device: function() {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPad", "iPod"];
	    var flag = "click";
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = "touchend";
	            break;
	        }
	    }
	    return flag;
	}
}
var userData = {};
var k = {
	countDown: function(time) {
    	if ( time === undefined ) return;
	    function getTime(){
	        var t = (new Date(time)) - (new Date()),
	            d = h = m = s = 0;
	        if( t >= 0 ){
	            var d = Math.floor( t/1000/60/60/24 ),
	                h = Math.floor( t/1000/60/60%24 ),
	                m = Math.floor( t/1000/60%60 ),
	                s = Math.floor( t/1000%60 );

	                if (h < 10) h = "0" + h;
	                if (m < 10) m = "0" + m;
	                if (s < 10) s = "0" + s;
	        }else {
	        	$("#countDown").hide();
	            clearInterval(userData.ctime);
	        }
			$("#h").text(h);
			$("#m").text(m);
			$("#s").text(s);
	    }
	    userData.ctime = setInterval(getTime, 0);
	},
	load: function() {
		// $.ajax({
		// 	url: base.url + base.infoApi + base.token(),
		// 	type: 'GET',
		// 	dataType: 'jsonp',
		// 	success: function (data) {
		// 		if (data.code == 1) {
		// 			this.countDown(data.obj.actTime);
		// 			base.batchNumber = data.obj.batchNumber;
		// 		} else if (data.code <= 0) {
		// 			l.showPop("#alert", {
		// 				title: data.message,
		// 				type: 2
		// 			});
		// 		}
		// 	},
		// 	error: function () {
		// 		l.showPop("#alert", {
		// 			title: "处理失败",
		// 			type: 2
		// 		});
		// 	}
		// });

		var data = {
			"actTime" : "2016-12-17 12:30:00",
			"batchNumber" : "2016121501",
			"playNumber" : "888"
		}
		this.countDown(data.actTime);
		base.batchNumber = data.batchNumber;
	},
	redBag: function() {
		var grid = $("#grid"),
			grid_width = grid.width(),
			grid_height = grid.height();

		var html = "";
		for (var i = 1, j = 1, k = 0; i <= 12; i++) {
			var size = parseInt(Math.random()*10),
				clas = '';
			size == 1 || size == 3 || size == 5 || size == 7 || size == 8
				? clas = "mid" :
			size == 2 || size == 4 || size == 6 || size == 9
				? clas = "min" : clas = "";

			var startTop = parseInt(Math.random() * 100 ) + (k * 200);
			var startLeft = parseInt(Math.random() * 20) + (j-1) * 33;


			html += '<li class="'+clas+'" style="top: '+ startTop +'px; left: '+ startLeft +'%"></li>';
			j == 3 ? (j = 1, k++) : j++;
		}
		grid.find("ul").append(html);

		var height = 0;
		function run() {
			height += 2;
			if ( height >= grid_height ) {
				height = 0;
			}
			grid.css({
				"transform": "translate3d(0, "+ height +"px, 0)",
				"-webkit-transform": "-webkit-translate3d(0, "+ height +"px, 0)"
			});
		}
		userData.dtime = setInterval(run, 0);




		var data = {
			"playNumber" : "1",
			"resultText" : "200金投币",
			"resultCode" : "10052"
		}
		grid.find("li").each(function(index, el) {
			$(el).on(l.device(), function(event) {
				// $.ajax({
				// 	url: base.url + base.playApi + base.token() + base.batchNumber,
				// 	type: 'GET',
				// 	dataType: 'jsonp',
				// 	success: function (data) {
				// 		if (data.code == 1) {
				// 			if (data.obj.remaNum > 0) {
				// 				clearInterval(userData.dtime);
				// 				l.showPop("#dialog");
				// 			}
				// 		} else if (data.code <= 0) {
				// 			l.showPop("#alert", {
				// 				title: data.message,
				// 				type: 2
				// 			});
				// 		}
				// 	},
				// 	error: function () {
				// 		l.showPop("#alert", {
				// 			title: "处理失败",
				// 			type: 2
				// 		});
				// 	}
				// });
				data.playNumber -= 1;
				if (data.resultCode == "R0001") {
					l.showPop("#alert", {
						title: "本轮红包PK已结束, 欢迎您参加下一轮PK",
						type: 2
					});
					return false;
				}
				if (data.resultCode == "R0002") {
					l.showPop("#alert", {
						title: "本轮红包PK还未开始，请等候！",
						type: 2
					});
					return false;
				}
				if (data.playNumber >= 0) {
					l.showPop("#dialog", {
						title: "恭喜您抢红包成功",
						content: "获得" + data.resultText
					});
				}else {
					l.showPop("#alert", {
						title: "操作失败",
						content: "已经没有剩余红包了",
						type: 2
					});
				}
			});
		});
	},
	init: function() {
		l.showPop("#alert", {
			title:"欢迎您参加金投会第二届红包奥林PK活动",
			type:1
		});
		this.load();
		this.redBag();
	}
};
k.init();