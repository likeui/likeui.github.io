!
function(a) {
    "use strict";
    var _A = "active";
    var _v = "";
    var config = {
        b : $("body"),
        c : function (o) {
            return o == 1 ?  "d-zoom" : o == 2 ? "d-puff" : o == 3 ? "d-fade" : o == 4 ? "d-slide-d" : o == 5 ? "d-slide-u" : "";
        },
        d : {
            type: 0,        //弹窗类型
            mask: !!0,       //遮罩
            maskClose: !!0,  //遮罩关闭
            anime: 1,           //动画
            title: "标题",
            info: "内容",
            time: 1500,     //关闭时间
            btn: ["确定", "取消"],
            option: {row: ["默认行"], close: ["删除", "t-wran"]}
        },
        e : function(a) {
            var b = JSON.parse(JSON.stringify(config.d));
            for (var c in a) b[c] = a[c];
            return b
        },
        toast : function(o) {
            var type = o.type == 1 ? '<span class="d-t-icon"></span>' : o.type == 2 ? '<div class="d-loading"><div class="d-loading-leaf"></div><div class="d-loading-leaf"></div><div class="d-loading-leaf"></div><div class="d-loading-leaf"></div><div class="d-loading-leaf"></div><div class="d-loading-leaf"></div><div class="d-loading-leaf"></div><div class="d-loading-leaf"></div></div>' : '',
                anime = config.c(o.anime),
                h = '<div id="kui_pop" class="d-wrap"><div class="d-mask"></div><div class="d-box"><div class="d-t '+ anime +'">'+ type +'<span class="d-t-info">'+ o.info +'</span></div></div></div>';
            config.b.append(h);

            var pop = $("#kui_pop"),
                mask = pop.find(".d-mask"),
                bd = pop.find(".d-t");

            bd.show().addClass(_A);

            var ctime = setTimeout(function() {
                kui.close(pop, bd, mask);
            }, o.time);

            if( o.mask ) mask.show().addClass(_A);

            if( o.maskClose ) {
                clearTimeout(ctime);
                mask.on('click', function(event) {
                    kui.close(pop, bd, mask);
                });
            }
        },
        dialog : function(o, t) {
            var type = "",
                info = "",
                btn = "",
                xt = "",
                xb = "";
            switch(t) {
                case 1:
                    info = o.info;
                    btn = '<span type="1">'+ o.btn[0] +'</span>';
                    xt = "x-t";
                    break;
                case 2:
                    info = '<div class="k-ipt k-border"><input type="text" placeholder="说点什么吧"></div>';
                    btn = o.btn.length == 2 ? '<span type="0">'+ o.btn[1] +'</span><span type="1">'+ o.btn[0] +'</span>' : '<span type="1">'+ o.btn[0] +'</span>';
                    xt = "x-t";
                    break;
                case 3:
                    type = "d-1";
                    info = o.info;
                    btn = o.btn.length == 2 ? '<span type="0">'+ o.btn[1] +'</span><span type="1">'+ o.btn[0] +'</span>' : '<span type="1">'+ o.btn[0] +'</span>';
                    xt = "x-t";
                    xb = "x-b";
                    break;
                case 4:
                    type = "d-2";
                    info = o.info;
                    btn = o.btn.length == 2 ? '<span type="0" class="b b-block '+ o.btnClass +'">'+ o.btn[1] +'</span><span type="0" class="b b-block '+ o.btnClass +'">'+ o.btn[0] +'</span>' : '<span type="1" class="b b-block '+ o.btnClass +'">'+ o.btn[0] +'</span>';
                    break;
            }
            var anime = config.c(o.anime),
                hdClass = o.hdClass ? o.hdClass : "",
                hdClose = o.close ? '<i type="0" class="d-close icon-cross"></i>' : "",
                h = '<div id="kui_pop" class="d-wrap"><div class="d-mask"></div><div class="d-box"><div class="d-c '+ type +' '+ anime +'"><div class="d-c-hd '+ hdClass +' '+ xb +'">'+ o.title +' '+ hdClose +'</div><div class="d-c-bd">'+ info +'</div><div class="d-c-ft '+ xt +'">'+ btn +'</div></div></div></div>';
            config.b.append(h);

            var pop = $("#kui_pop"),
                mask = pop.find(".d-mask"),
                bd = pop.find(".d-c");

            mask.show().addClass(_A);
            bd.show().addClass(_A);

            if( o.maskClose ) {
                mask.on('click', function(event) {
                    kui.close(pop, bd, mask);
                });
            }

            bd.find("[type='1']").on('click', function(event) {
                var val = bd.find("input").val();
                if( t==2 ) {
                    if( val=="" ) return;
                }
                config._V = val;
                kui.close(pop, bd, mask, o.yes);
            });

            bd.find("[type='0']").on('click', function(event) {
                kui.close(pop, bd, mask, o.no);
            });
        },
        sheet : function(o) {
            var option = "",
                anime = config.c(o.anime);
            for (var i = 0; i < o.option.row.length; i++) option += '<div type="1" class="d-s-row">'+ o.option.row[i] +'</div>';
            var h = '<div id="kui_pop" class="d-wrap"><div class="d-mask"></div><div class="d-s '+ anime +'"><div class="d-s-menu">'+ option +'</div><div class="d-s-ft"><div type="0" class="d-s-row '+ o.option.close[1] +'">'+ o.option.close[0] +'</div></div></div></div>';
            config.b.append(h);

            var pop = $("#kui_pop"),
                mask = pop.find(".d-mask"),
                bd = pop.find(".d-s");

            mask.show().addClass(_A).on("click", function () {
                kui.close(pop, bd, mask);
            });
            bd.show().addClass(_A);

            bd.find("[type='1']").on("click", function () {
                kui.close(pop, bd, mask, o.yes);
                config._V = this.innerHTML;
            });

            bd.find("[type='0']").on("click", function () {
                kui.close(pop, bd, mask, o.no);
            });
        },
        msg : function(o) {
            var anime = config.c(o.anime),
                type = o.type == 1 ? "d-m-succ" : "d-m-error",
                btn = o.type == 1 ? "b-green" : "b-wran",
                h = '<div id="kui_pop"><div class="d-m '+ anime +'"><div class="d-m-hd '+ type +'"></div><div class="d-m-bd"><div class="d-m-title">'+ o.title +'</div><div class="d-m-info">'+ o.info +'</div></div><div class="d-m-ft"><button type="1" class="b '+ btn +' b-m">确定</button></div></div></div>'
            config.b.append(h);

            var pop = $("#kui_pop"),
                bd = pop.find(".d-m");

            bd.show().addClass(_A);
            bd.find("[type='1']").on("click", function () {
                kui.close(pop, bd, "", o.yes);
            });
        },
        page : function(o) {
            var anime = config.c(o.anime),
                type = o.type == 0 ? 'd-1' : "",
                h = '<div id="kui_pop"><div class="d-mask"></div><div class="d-p '+ anime +' '+ type +'"><div class="d-p-bd">'+ o.info +'</div></div></div>';
            config.b.append(h);

            var pop = $("#kui_pop"),
                mask = pop.find(".d-mask"),
                bd = pop.find(".d-p");

            mask.show().addClass(_A);
            bd.show().addClass(_A);

            if( o.maskClose ) {
                mask.on('click', function(event) {
                    kui.close(pop, bd, mask);
                });
            }
        },
        search : function(o, l) {
            if ( !o ) return;
            var h = "";
            for (var i = 0; i < o.length; i++) {
                h += '<a class="l-row"><div id="'+ o[i].id +'" class="l-bd">'+ o[i].text +'</div></a>';
            }
            l.append(h);
        }
    }

    a.kui = {
        v : "1.0",
        kset : function(key, value) {
            window.localStorage.setItem("kui_"+key, value);
        },
        kget : function(key) {
            return window.localStorage.getItem("kui_"+key);
        },
        trim : function(str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        },
        disMove : function() {
            _BODY.on("touchmove", function(event) {
                event.preventDefault();
            });
        },
        staMove : function() {
            _BODY.unbind("touchmove");
        },
        toast : function(options) {
            var b = config.e(options);
            config.toast(b);
        },
        alert : function(options) {
            var b = config.e(options);
            config.dialog(b, 1);
        },
        prompt : function(options) {
            var b = config.e(options);
            config.dialog(b, 2);
        },
        confirm : function(options) {
            var b = config.e(options);
            config.dialog(b, 3);
        },
        dialog : function(options) {
            var b = config.e(options);
            config.dialog(b, 4);
        },
        sheet : function(options) {
            var b = config.e(options);
            config.sheet(b);
        },
        msg : function(options) {
            var b = config.e(options);
            config.msg(b);
        },
        page : function(options) {
            var b = config.e(options);
            config.page(b);
        },
        close : function(pop, bd, mask, f) {
            if( !pop && !bd && !mask && !f ) {
                kui.closeAll();
                return;
            }
            mask ? mask.removeClass(_A) : "";
            bd.removeClass(_A);
            setTimeout(function () {
                pop.remove();
                f ? f(config._V) : "";
            }, 300);
        },
        closeAll : function() {
            $("#kui_pop").remove();
        },
        search : function(options) {
            var s = $(".f-s"),
                s_ipt = s.find("input"),
                s_cancel = s.find(".f-s-cancel"),
                s_list = s.find(".l");

            config.search(options, s_list);

            s_ipt.focus(function() {
                s.addClass(_A);
                s_ipt.attr("placeholder", "搜索").keyup(function() {
                    s_ipt.val() ? s_list.show() : s_list.hide();
                });
            }).
            blur(function(event) {
                s_ipt.removeAttr("placeholder");
                s_ipt.val() == "" ? s.removeClass(_A) : s_list.hide();
            });

            s_cancel.click(function() {
                s.removeClass(_A);
                s_ipt.val("");
                s_list.hide();
            });

            s_list.find(".l-bd").click(function(event) {
                var text = this.innerHTML;
                s_ipt.val(kui.trim(text));
                s_list.hide();
            });
        },
        getCode : function() {
            var obj = $("[data-id='getCodeBtn']");
            if( obj === undefined ) return;

            obj.on('click', function(event) {
                var that = $(this),
                    time = 60,
                    d = "disabled";
                if ( that.hasClass(d) ) return;

                function countDown() {
                    if ( time == 0 ) {
                        time = 60;
                        that.removeClass(d).text("获取验证码");
                    }else {
                        time--;
                        that.addClass(d).text("重新发送" + time+ "s");

                        setTimeout (countDown, 1000);
                    }
                }
                return countDown();
            });
        },
        countDown : function() {
            var obj = $("[data-id='countDown']"),
                time = obj.attr("data-time");
            if ( obj === undefined || time === undefined ) return;
            
            function getTime(){
                var t = (new Date(time)) - (new Date())
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
                obj.text(d + " 天 " + h + " 时 " + m + " 分 " + s + " 秒");
            }
            var ctime = setInterval(getTime, 0);
        },
        changeTab : function() {
            $(".t .t-cell").click(function() {
                var that = $(this);
                that.addClass('active').siblings().removeClass('active');
                that.parent().next().find('.t-item').eq(that.index()).show().siblings().hide();
            });
        }
    }
}(window);