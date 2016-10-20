!
function(a) {
	var dialog = null, mask = null, wrap = null, ctime = null;
	$(".dialog-btn").on('click', function(event) {
		event.preventDefault();

		dialog = $("#" + this.getAttribute("href")),
		mask = dialog.find(".d-mask"),
		wrap = dialog.find(".d");

		dialog.show();
		mask.addClass('active');
		wrap.addClass('active');

		if ( wrap.hasClass('d-count') || wrap.hasClass('d-tip') ) {
			var ctime = setTimeout(function() {
				mask.removeClass('active');
				wrap.removeClass('active');

				setTimeout(function() {
					dialog.hide()
				}, 300);
			}, 3000);
		}
	});
	$("[data-type='0']").on('click', function(event) {
		event.preventDefault();

		mask.removeClass('active');
		wrap.removeClass('active');

		clearTimeout(ctime);

		setTimeout(function() {
			dialog.hide()
		}, 600);
	});
	//阻止冒泡
	$(".d-sheet").on('click', function(event) {
		event.stopPropagation();
	});
}(window);