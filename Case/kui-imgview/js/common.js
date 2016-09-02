
(function() {
	var body = $("body");
    function disMove() {
        body.on('touchmove', function(event) {
            event.preventDefault();
        });
    }
    function staMove() {
        body.unbind('touchmove');
    }
	var	imgArray = ["pic/1.jpg", "pic/2.jpg", "pic/3.jpg", "pic/4.jpg", "pic/5.jpg", "pic/6.jpg", "pic/7.jpg"],
		prevHtml = "",
		prevModel = "<div data-index='{{id}}' class='k-preview-item'><img src='{{src}}'></div>",
		itemHtml = "",
		itemModel = "<li data-id='{{id}}' class='k-upload-cell'><img src='{{src}}'></li>";
	//创建图片视图
	for (var i = 0; i < imgArray.length; i++) {
		prevHtml += prevModel.replace("{{id}}", i+1).replace("{{src}}", imgArray[i]);

		itemHtml += itemModel.replace("{{id}}", i+1).replace("{{src}}", imgArray[i]);
	}
	$(".k-preview-group").append(prevHtml).click(function() {
		var tprt = $(this).parent()

		tprt.removeClass("zoomIn").addClass("zoomOut");

		setTimeout(function() {
			tprt.hide();
		}, 300);

		staMove();
	});
	$("#imgList").append(itemHtml).find("li").click(function(event) {
		var index = this.getAttribute("data-id");
		
		creatView(index);
		
		$(".k-preview").show().removeClass("zoomOut").addClass("zoomIn");

		disMove();
	});

	var nextBtn = $("#nextBtn"),
		prevBtn = $("#prevBtn"),
		iNow = 1;
	function resClass(o, className) {
		o.addClass(className).siblings().removeClass(className);
	}
	function creatView(i) {

		iNow = i;

		$(".k-preview-item").each(function() {
			var len = this.getAttribute("data-index");
			if( len == i ) {
				resClass($(this), "active");
				$("#indicator").text(len + "/" + imgArray.length);
			}
		});
	}
	nextBtn.click(function() {

		iNow++;

		if ( iNow > imgArray.length ) {
			iNow = 1;
		}

		creatView(iNow);
	});
	prevBtn.click(function() {

		iNow--;

		if ( iNow < 1 ) {
			iNow = imgArray.length;
		}

		creatView(iNow);
	});

	return creatView(iNow);
})();