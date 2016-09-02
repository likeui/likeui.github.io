//随机颜色
var getRandomColor = function() {
	return '#' + (function(color) {
		return (color += '0123456789abcdef'[Math.floor(Math.random()*16)]) && (color.length == 6) ? color : arguments.callee(color);
	})('');
}
//随机获取数组中的一个字符串
function getColorByRandom() {
	var colorList = ["#78cd51","#58c9f3","#41cac0","#ffd000","#f55","#3b9afe"];
	return colorList[Math.floor(Math.random()*colorList.length)];
}
//取消浏览器的所有事件，使得active的样式在手机上正常生效
document.addEventListener('touchstart', function() {
	return false;
}, true);
//rgb转16进制
function zero_fill_hex(num, digits) {
	var s = num.toString(16);
	while (s.length < digits)
	s = "0" + s;
	return s;
}
function rgb2hex(rgb) {
	if (rgb.charAt(0) == '#')
	return rgb;
	var ds = rgb.split(/\D+/);
	var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
	return "#" + zero_fill_hex(decimal, 6);
}
//获取页面名称
function get_file_name() {
	var strarray = window.location.pathname.split("/");
	var filename = strarray[strarray.length-1];
	return filename.split(".")[0];
}