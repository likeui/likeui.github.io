(function(len) {
	var grid = document.getElementById("grid"),
		grid_width = grid.offsetWidth,
		grid_height = grid.offsetHeight;

	var html = "";
	for (var i = 1, j = 1, k = 0; i <= len; i++) {
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
	$("#grid ul").append(html);


	function IsPC() {
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

	var height = 0;
	function run() {
		height += 2;
		if ( height >= grid_height ) {
			height = 0;
		}
		$("#grid").css({
			"transform": "translate3d(0, "+ height +"px, 0)",
			"-webkit-transform": "-webkit-translate3d(0, "+ height +"px, 0)"
		});
	}
	var ctime = setInterval(run, 0);


	$(document).on(IsPC(), '#grid li', function(event) {
		clearInterval(ctime);
		alert(1);
	});
})(12);


(function(time) {
    if ( time === undefined ) return;
    
    function getTime(){
        var t = (new Date(time)) - (new Date()),
            d = h = m = s = 0;
        if( t >= 0 ){
            var d = Math.floor( t/1000/60/60/24 ),
                h = Math.floor( t/1000/60/60%24 ),
                m = Math.floor( t/1000/60%60 ),
                s = Math.floor( t/1000%60 );

                if (m < 10) m = "0" + m;
                if (s < 10) s = "0" + s;
        }else {
            clearInterval(ctime);
        }
		$("#h").text(h);
		$("#m").text(m);
		$("#s").text(s);
    }
    var ctime = setInterval(getTime, 0);
})("2016/12/21 02:00");