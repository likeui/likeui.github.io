$(".n-left").click(function() {
	$("body").addClass("active");
	$(".mask").on("touchmove", function(event) {
		event.preventDefault();
	})
});

$(".mask").click(function() {
	$("body").removeClass("active");
	$(".mask").unbind('touchmove');
})


window.onload = function() {
	//渲染高亮
	typeof prettyPrint == "function" ? prettyPrint() : "";
}