var lottery = {
	index: 0,	//当前转动到哪个位置
	count: 0,	//总共有多少个位置
	ctime: 0,	//setTimeout的ID，用clearTimeout清除
	speed: 300,	//初始转动速度
	times: 0,	//当前转动次数
	cycle: 27,	//至少转动多少次再进入抽奖环节
	prize: -1,	//中奖位置
	award: 0,

	//奖品列表
	lotteryList: [
		'200',
		'60',
		'150',
		'80',
		'iPhone7',
		'500',
		'240',
		'320',
		'100'
	],

	init: function(obj) {
		this.obj = $(obj);
		var $cell = this.obj.find("li");
		this.count = $cell.length;

		$cell.each(function(index, el) {
			$(this).find("span").text(lottery.lotteryList[index]);
		});
	},

	roll: function() {
		var index = this.index,
			count = this.count,
			$cell = this.obj.find("li");

		$cell.eq(index).removeClass("active");

		index += 1;

		if ( index > count - 1 ) index = 0;

		$cell.eq(index).addClass("active");

		this.index = index;
		return false;
	},

	stop: function(index) {
		this.prize = index;
		return false;
	}
};

function run() {
	lottery.times += 1;
	lottery.roll();
	
	if ( lottery.times > lottery.cycle + 8 && lottery.prize == lottery.index ) {
		clearTimeout(lottery.ctime);
		lottery.prize = -1;
		lottery.times = 0;
		lottery.speed = 300;

		setTimeout(function() {
			$("#price").text(lottery.lotteryList[lottery.award]+"元金投币");
			$("section").removeClass('active').next().addClass('active');
		}, 1000);
	}else{
		if ( lottery.times < lottery.cycle ) {
			lottery.speed -= 10;
		} else if( lottery.times == lottery.cycle ) {
			//获取抽奖奖品
			lottery.award = lottery.prize = 1;
		} else {
			lottery.speed += 60;
		}
		if ( lottery.speed < 100 ) {
			lottery.speed = 100;
		};
		lottery.ctime = setTimeout(run, lottery.speed);
	}
	return false;
}

window.onload = function() {
	lottery.init("#grid");
	$("#startBtn").click(function(event) {
		var that = $(this);
		if( that.hasClass('active') ) {
			return false;
		}
		that.addClass('active');
		run();
	});
}