//模拟数据
var o = {
	x : [{
        name: "宝贝回家APP",
        zq : "2个月",
        yy : "JAVA"
    },{
        name: "员工助手APP",
        zq : "1个月",
        yy : "HTML5+CSS3/jquery"
    },{
        name: "其它APP",
        zq : "3个月",
        yy : "C++"
    }],
	bgcolor: ['#4c5263','#4cbac7','#d45c15','#60b5eb','#09b891','#f3b68d'],
	arrow : $(".arrow"),
	body :  $("body"),
	goDown : $("#godown"),
	mWrap : $(".main > .swiper-wrapper"),
}


var mySwiper = new Swiper('.main', {
    direction : 'vertical',
    noSwipingClass : 'stop',
//	initialSlide : 2,
    onSlideChangeStart: function(){
        var index = o.mWrap.find(" > .swiper-slide-active").index();
        o.body.css({
            backgroundColor: o.bgcolor[index]
        });
        index < 4 ? o.arrow.show() : o.arrow.hide();
        if(index == 1) showJob();
        if(index == 2) showJn();
    }
});


var mySwiper2 = new Swiper(".reveal", {
    slidesPerView: "auto",
    centeredSlides: !0,
    watchSlidesProgress: !0,
    pagination: ".reveal .swiper-pagination",
    paginationClickable: !0,
//  paginationBulletRender: function(a, b) {
//      return '<div class="' + b + '">'+
//                 '<div style="text-align:center; margin-bottom: 20px">' + o.x[a].name + '</div>'+
//                  '<h5>开发周期：' + o.x[a].zq + '</h5>'+
//                  '<h5>使用语言：' + o.x[a].yy + '</h5>'+
//              '</div>';
//  },
    onProgress: function(a) {
        var b, c, d;
        for (b = 0; b < a.slides.length; b++) c = a.slides[b],
        d = c.progress,
        scale = 1 - Math.min(Math.abs(.2 * d), 1),
        es = c.style,
        es.opacity = 1 - Math.min(Math.abs(d / 2), 1),
        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(0px,0," + -Math.abs(150 * d) + "px)"
    },
    onSetTransition: function(a, b) {
        for (var c = 0; c < a.slides.length; c++) es = a.slides[c].style,
        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + "ms"
    }
});
    
    
setTimeout(function() {
    $(document).one('touchstart', function(event) {
        $(".tops").css({
            transform: 'scale(.6,.6) translate3d(0, -20px, 0)',
            marginTop: '10%'
        });
        
        o.body.css({backgroundColor : o.bgcolor[0]});
        
        $(".job").fadeOut(200);
        
        $(".myinfo").fadeIn(200);
        
        $(".way").show();
        
        $(".btn-group:first").show(); 
    });

	o.goDown.on('touchstart', function() {
        o.mWrap.find(" > .stop").removeClass('stop');
        
        mySwiper.slideNext();
    });
},500);


function showJn() {
	$(".skill").addClass("spinner");
    var li = $(".skill li"), n = li.length-1, r = 130;
    for(var i = 0; i < n; i++){
    	var x = r * Math.cos(360/n * i * (Math.PI/180));
    	var y = -r * Math.sin(360/n * i * (Math.PI/180));
        li.eq(i).css({
        	transition: 'all .5s',
            transitionDelay: (80 * i) + 'ms', 
			transform: 'translate('+ x +'px,'+ y +'px)',
        });
    }
};

function showJob() {
    $(".timeline-row").eq(2).removeClass('dn');
    setTimeout(function() {
        $(".timeline-row").eq(1).removeClass('dn');
    }, 2000);
    setTimeout(function() {
        $(".timeline-row").eq(0).removeClass('dn');
    }, 4000);
};