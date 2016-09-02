

$("#showToast1").click(function() {
    kui.toast({
        maskClose: true,
        info: "不点就不会消失"
    });
});

$("#showToast2").click(function() {
    kui.toast({
        type: 1,
        anime: 2,
        mask: true,
        info: "成功了!",
        time: 3000
    });
});

$("#showLoading1").click(function() {
    kui.toast({
        type: 2,
        anime: 3,
        info: "请稍后",
        time: 1000
    });
});

$("#showAlert").click(function() {
    kui.alert({
        maskClose: true,
        info: "点击遮罩可关闭,但是没有回调函数",
        yes: function() {
            kui.toast({
                info: "回调成功！"
            });
        }
    });
});

$("#showPrompt").click(function() {
    kui.prompt({
        anime: 2,
        yes: function(a) {
            kui.alert({
                info: a,
                anime: 3
            });
        }
    });
});

$("#showConfirm").click(function() {
    kui.confirm({
        anime: 3,
        title: "你是我的小呀小瓶盖",
        info: "更改了标题和按钮哦！",
        btn: ["yes", "no"]
    });
});

$("#showDialog").click(function() {
    var h = $("#pagehtml").html();
    kui.dialog({
        anime: 3,
        close: true,
        title: "这个有点复杂，可传入HTML",
        info: h,
        btn: ["打开默认"],
        btnClass: "b-blue b-round b-m",
        yes: function() {
            kui.dialog({
                info: "再次触发",
                btnClass: "b"
            });
        }
    });
});

$("#showSheet").click(function() {
    kui.sheet({
        option: {row: ["第一行", "第二行", "第三行"], close: ["关闭", "t-primary"]},
        anime: 4,
        yes: function(a) {
            kui.toast({
                info: "点击的内容是："+a
            })
        },
        no: function() {
            kui.alert({
                info: "sheet的no回掉函数！",
                yes: function() {
                    kui.toast({
                        info: "就这么无限循环"
                    });
                }
            })
        }
    });
});

$("#showMsg1").click(function() {
    kui.msg({
        type: 1,
        anime: 5,
        info: "这是成功页面",
        yes: function() {
            kui.toast({
                info: "关闭了页面"
            });
        }
    });
});

$("#showMsg2").click(function() {
    kui.msg({
        info: "这是默认页面"
    });
});

$("#showPage1").click(function() {
    kui.page({
        anime: 4,
        maskClose: true,
        info: "这里传入HTML页面都可以的！"
    });
});

$("#showPage2").click(function() {
    var h = $("#pagehtml").html();
    kui.page({
        type: 1,
        anime: 3,
        info: h
    });
});

if (/Android/gi.test(navigator.userAgent)) {
    window.addEventListener('resize', function () {
        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
            window.setTimeout(function () {
                document.activeElement.scrollIntoViewIfNeeded();
            }, 0);
        }
    })
};