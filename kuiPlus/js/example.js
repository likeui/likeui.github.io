$(".n-menu").click(function() {
	$("body").addClass("active").on("touchmove", function(event) {
		event.preventDefault();
	})
});

$(".main-shade").click(function() {
	$("body").removeClass("active").unbind('touchmove');
})


window.onload = function() {
	//渲染高亮
	typeof prettyPrint == "function" ? prettyPrint() : "";
}