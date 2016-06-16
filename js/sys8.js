var keytime = 0;
var dispbuf = new Array("", "", "", "", "", "", "", "", "");
var dispscroll = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var dispid = 0;
var click = "click";
var keydown = 0;
var k_obj;
var p_obj;
var main_scroll = 0;
var tmp = 0;
var ot;
var nextstep = "";
function overtime() {}
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
function ojax(url, postdata) {
    var t = new Date().getTime();
    if ((t - keytime) < 2000) {
        return
    }
    keytime = t;
    ot = setTimeout("overtime()", 5000);
    if (typeof(postdata) == "undefined") {
        postdata = ""
    }
    if ($("#loading").length < 1) {
        if (document.location.href.indexOf("ok8s.com/") >= 0) {
            $("#top").append('<img id="loading" class="kyuan" src="/attachs/load2.gif" />')
        } else {
            $("#top").append('<img id="loading" class="kyuan" src="/attachs/load2.gif" />')
        }
    }
    if (url.indexOf("http://") < 0) {
        url = http + url
    }
    if (url.indexOf("?") < 0) {
        url = url + "?k=" + getkey("k")
    } else {
        url = url + "&k=" + getkey("k")
    }
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        url = url + "%2F2"
    } else {
        url = url + "%2F3"
    }
    if (postdata == "") {
        $.ajax({
            url: url,
            cache: false,
            success: ojax_result
        })
    } else {
        $.post(url, {
            data: postdata
        },
        ojax_result)
    }
}
function onAjaxReturned(url, result) {
    ojax_result(unescape(result))
}
function ojax_result(result) {
    keytime = 0;
    clearTimeout(ot);
    $("#loading").remove();
    var arr = result.split("{{}}");
    var len = arr.length - 1;
    if (len < 2) {
        //alert("数据错误，请重新尝试。")
    }
    var i;
    var a;
    for (i = 1; i < len; i++) {
        a = arr[i].split("{}");
        if (a[0] == "ok") {
            return
        } else {
            if (a[0] == "alert") {
                alert(a[1])
            } else {
                if (a[0] == "dom") {
                    ojax_dom(a)
                } else {
                    if (a[0] == "eval") {
                        eval(a[1])
                    } else {
                        if (a[0] == "html") {
                            $(a[1]).html(a[2])
                        } else {
                            if (a[0] == "append") {
                                $(a[1]).append(a[2])
                            } else {
                                if (a[0] == "after") {
                                    $(a[1]).after(a[2])
                                } else {
                                    if (a[0] == "before") {
                                        $(a[1]).before(a[2])
                                    } else {
                                        if (a[0] == "val") {
                                            $(a[1]).val(a[2])
                                        } else {
                                            if (a[0] == "attr") {
                                                $(a[1]).attr(a[2], a[3])
                                            } else {
                                                if (a[0] == "show") {
                                                    $(a[1]).show()
                                                } else {
                                                    if (a[0] == "hide") {
                                                        $(a[1]).hide()
                                                    } else {
                                                        if (a[0] == "href") {
                                                            window.location.href = a[1];
                                                            return
                                                        } else {
                                                            if (a[0] == "reload") {
                                                                window.location.reload();
                                                                return
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        var userid = getCookie("userid");
                        if(userid == '' || userid === undefined || userid === null){
                            autologin(0);return;
                        }
                    }
                    $(".on").removeClass("on");
                }
            }
        }
    }
}
function ojax_dom(arr) {
    if (arr[1] == "html") {
        $(arr[2]).html(arr[3])
    } else {
        if (arr[1] == "append") {
            $(arr[2]).append(arr[3])
        } else {
            if (arr[1] == "val") {
                $(arr[2]).val(arr[3])
            }
        }
    }
}
function setkey(k, v) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000);
    v = encodeURIComponent(v);
    document.cookie = k + "=" + v + ";path=/;expires=" + exp.toGMTString()
}
function getkey(k) {
    var arr, reg = new RegExp("(^| )" + k + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2])
    } else {
        return null
    }
}
function removekey(k) {
    if (typeof(yaoApplication) != "undefined") {
        return yaoApplication.removesave(k)
    } else {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie = k + "=0;path=/;expires=" + exp.toGMTString()
    }
}
var http = "http://" + document.domain;
var upurl = "http://file.ok8s.com";
var websocketurl = "http://room.ok8s.com:8082";
var siteurl = "http://site.ok8s.com";
var pushhost = "push.ok8s.com";
function screen() {
    dispid = 0;
    if ($("#main").css("display") == "none") {
        showmodal(0)
    }
}
function showpop() {
    dispid++;
    dispbuf[dispid] = $("#main").html();
    if (document.documentElement && document.documentElement.scrollTop) {
        dispscroll[dispid] = document.documentElement.scrollTop
    } else {
        if (document.body) {
            dispscroll[dispid] = document.body.scrollTop
        }
    }
    if ($("#main").css("display") == "none") {
        showmodal(0)
    }
}
function showmodal(type) {
    if (type == 1) {
        $("#top").hide();
        $("#main").hide();
        $("#mymodal").show();
        if (document.documentElement && document.documentElement.scrollTop) {
            main_scroll = document.documentElement.scrollTop
        } else {
            if (document.body) {
                main_scroll = document.body.scrollTop
            }
        }
    } else {
        $("#mymodal").hide();
        $("#main").show();
        $("#top").show();

        setTimeout(function(){
       	 $('.complete').show()
        	
        },500)
        // window.scrollTo(0, main_scroll)
    }
}
function bpp_keyback() {
    if ($("#loading").length > 0) {
        $("#loading").remove();
        return
    }
    if ($("#alertBg").length > 0) {
        $("#alertBg").remove();
        if ($("#alertAdd").length > 0) {
            $("#alertAdd").remove()
        }
        return
    }
    if ($("#showyao").length > 0) {
        $("#showyao").remove();
        return
    }
    if ($("#mymodal").css("display") != "none") {
        showmodal(0);
        return
    }
    if (dispid > 0) {
        $("#main").html(dispbuf[dispid]);
        window.scrollTo(0, dispscroll[dispid]);
        dispid--
    } else {
        mapto()
    }
}
function mapto() {
    screen();
    //document.location.href = "/"
    //document.location.goback();
    
}
function firstpage() {
    var a = location.search.split("=");
    if (a.length == 2) {
        ojax(a[1])
    } else {
        ojax("/ask/message_new/0")
    }
}
function loadfile(filepath) {
    window.location.href = filepath
}
function hidedom(id) {
    $(id).hide()
}
function setactive(obj) {
    $(obj).siblings(".k").css("background-color", "#f0f7fd");
    $(obj).css("background-color", "#ddf")
}
function setactive1(obj) {
    $(obj).siblings(".k").css("border-color", "#000");
    $(obj).css("border-color", "#FFDEAD")
}
function setactive2(obj) {
    $(obj).siblings(".k").attr("class", "k bd0 r20 c13 b0");
    $(obj).attr("class", "k r20 c13 b0 rb3 bc12")
}
function setactive3(obj, c1, c2) {
    $(obj).siblings(".k").css("background-color", c1);
    $(obj).css("background-color", c2)
}
function showtools(htm) {
    p_obj = k_obj;
    if (k_obj.find("#tools").length > 0) {
        $("#tools").remove();
        return
    }
    var obj = $("#tools");
    if (obj.length > 0) {
        obj.remove()
    }
    k_obj.append('<div id="tools" class="cb">' + htm + "</div>")
}
function autologin(type) {
    var ver = "90";
    var imei = "0";
    if (typeof(yaoApplication) != "undefined") {
        ver = yaoApplication.getVersionName();
        imei = yaoTelephony.getSubscriberId()
    }
    var ukey = getkey("ukey");
    if (!ukey) {
        if (type == 0) {
            aboutregist()
        }
    } else {
        ojax("/user/autologin/0", type + "{}" + ukey + "{}" + imei + "{}" + ver)
    }
}
function regin() {
    var p2 = $("#p2").val();
    var p3 = $("#p3").val();
    var p5 = $("#p5").val();
    var p6 = getkey("fid");
    if (p2.length != 11) {
        alert("手机号码错误")
    } else {
        if (p3.length < 6 || p3.length > 16) {
            alert("密码限定6-16位字符")
        } else {
            if (p5.length < 2) {
                alert("请认真填写姓名")
            } else {
                setkey("myphone", p2);
                setkey("myname", p5);
                setkey("tuijian", p6);
                ojax("/user/autologin/2", "0{}" + p2 + "{}" + p3 + "{}" + p5 + "{}" + p6)
            }
        }
    }
}
function getpassword() {
    var phone = getkey("myphone");
    if (!phone) {
        phone = ""
    }
    var htm = '<div class="tit1 h4">设置密码（手机验证）：</div>	<div class="pa10 cb"> </div>	<div class="txt1 anr r40 hh c3 cb">手机：</div><input type="text" id="p2" class="inp txt1 r60 hh" placeholder="填写11位手机号" value="' + phone + '" />	<div class="txt1 anr r40 hh c3">密码：</div><input type="text" id="p3" class="inp txt1 r60 hh" placeholder="6-16位英文和数字"/>	<div class="txt1 anr r40 hh c3">验证码：</div><input type="text" id="p5" class="inp txt1 r60 hh" placeholder="短信验证码" value="" />	<div class="n5 cb"> </div><div class="k c9 ra3 liti fr w100 ma2" data-h="postpassword()">提 交</div>	<div class="k c6 ra3 liti fr ma2" data-h="getsmscode()">获取短信验证码</div>	';
    showpop();
    $("#main").html(htm)
}
function postpassword() {
    var p2 = $("#p2").val();
    var p3 = $("#p3").val();
    var p5 = $("#p5").val();
    if (p2.length != 11) {
        alert("手机号码错误")
    } else {
        if (p3.length < 6 || p3.length > 16) {
            alert("密码限定6-16位字符")
        } else {
            if (p5.length < 2) {
                alert("请填写短信验证码")
            } else {
                ojax("/user/password/2", "0{}" + p2 + "{}" + p3 + "{}" + p5)
            }
        }
    }
}
function getsmscode() {
    var p2 = $("#p2").val();
    if (p2.length != 11) {
        alert("手机号码错误")
    } else {
        ojax("/user/password/1", "0{}" + p2)
    }
}
function aboutregist() {
    var name = getkey("myname");
    var phone = getkey("myphone");
    var tuijian = getkey("tuijian");
    if (!name) {
        name = ""
    }
    if (!phone) {
        phone = ""
    }
    if (!tuijian) {
        tuijian = ""
    }
    var htm = '<div class="n5 cb"></div>	<div class="n5 cb"></div>	<div class="k xn fr c8 ra5 pa1 ma1" data-h="getpassword();"><div class="c3 ra5 pa5"> &nbsp;&nbsp; 忘记密码 &nbsp;&nbsp; </div></div>	<div class="n5 cb"></div>	<div class="txt1 anr r40 hh c4 cb">手机：</div><input type="text" id="p2" class="inp txt1 r60 hh" placeholder="填写11位手机号" value="' + phone + '" />	<div class="txt1 anr r40 hh c4">密码：</div><input type="password" id="p3" class="inp txt1 r60 hh" placeholder="6-16位英文和数字"/>	<input type="text" style="display:none;" id="p5" class="inp txt1 r60 hh" placeholder="2-16个字符" value="000000" />	<input type="text" style="display:none;" id="p6" class="inp txt1 r60 hh" placeholder="填写推荐人手机号" value="111111" />	<div class="txt1 cb">	<div class="k xn c9 w120 ra3 liti fr" data-h="regin()">登录</div>	<div class="n5 cb"></div>	<h4>说明：注册实行邀请制，请找你的担保人</h4>	</div>';
    $("#main").html(htm);
    screen()
}
function towarnmsg() {
    var html = '<div class="txt1">八秒用户实行邀请制，请找你的介绍人完成注册，没有介绍人的用户请加入八秒群联络其他会员寻求帮助。</div><div class="txt1">QQ群：316945595</div>';
    $("#mymodal").html(html);
    showmodal(1)
}
function tofoot(id) {
    var div = document.getElementById(id);
    div.scrollTop = div.scrollHeight
}
function footer(s) {
    $("#footer").html(s)
}
window.onscroll = function() {
    var a = document.documentElement.scrollTop == 0 ? document.body.clientHeight: document.documentElement.clientHeight;
    var b = document.documentElement.scrollTop == 0 ? document.body.scrollTop: document.documentElement.scrollTop;
    var c = document.documentElement.scrollTop == 0 ? document.body.scrollHeight: document.documentElement.scrollHeight;
    if (a + b >= c - 30) {
        var obj;
        if ($("#mymodal").css("display") == "none") {
            obj = $("#main")
        } else {
            obj = $("#mymodal")
        }
        if (obj.find("#xtool").length < 1) {
            return
        }
        var comm = $("#xtool").attr("data-h");
        $("#xtool").remove();
        eval(comm)
    }
};
function trim(str) {
    str = str.replace(/(^\s*)|(\s*$)/g, "");
    str = str.replace(/{}/gi, "{ }");
    return str
}
function golv(content) {
    content = content.replace(/</g, "&lt;");
    content = content.replace(/>/g, "&gt;");
    content = content.replace(/\'/g, "&apos;");
    content = content.replace(/\"/g, "&quot;");
    content = content.replace(/{}/gi, "{ }");
    content = content.replace(/[]/gi, "[ ]");
    content = content.replace(/&/g, "%26");
    return content
}
function regolv(content) {
    content = content.replace(/<br>/gi, "\r\n");
    content = content.replace(/&nbsp;/gi, " ");
    content = content.replace(/&lt;/g, "<");
    content = content.replace(/&gt;/g, ">");
    content = content.replace(/&apos;/g, "'");
    content = content.replace(/&quot;/g, '"');
    return content
}
function chkmail(email) {
    var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return pattern.test(email)
}
function formattimestamp(stamp) {
    return formattime(new Date(stamp))
}
function formattime1(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
}
function formattime(date) {
    var h = date.getHours();
    if (h < 10) {
        h = "0" + h
    }
    var m = date.getMinutes();
    if (m < 10) {
        m = "0" + m
    }
    return (date.getMonth() + 1) + "月" + date.getDate() + "日 " + h + ":" + m
}
function queren(tit, todo) {
    if (confirm(tit) == true) {
        eval(todo)
    }
}
function querenurl(tit, url) {
    if (confirm(tit) == true) {
        ojax(url, "")
    }
}
function postvalue(dom, url) {
    var t = "";
    var x = "";
    var f = 1;
    $(dom).each(function(i) {
        x = trim($(this).val());
        if (x.length > 0) {
            t += x + "{}"
        } else {
            f = 0
        }
    });
    if (f == 1) {
        ojax(url, t)
    } else {
        alert("请填写完整")
    }
}
function postto(dom, url) {
    var t = "";
    var x = "";
    var f = 1;
    $(dom).each(function(i) {
        x = trim($(this).val());
        if (x.length > 0) {
            t += x + "[]"
        } else {
            f = 0;
            alert("请填写完整");
            return false
        }
    });
    if (f == 1) {
        ojax(url, t)
    }
}
function replyto(obj, url) {
    var body = golv($("#body").val());
    var photo = $("#photourl").val();
    if (photo == null) {
        photo = ""
    }
    if (body.length < 3 && photo.length < 5) {
        alert("没话说就算了吧，字数太少");
        return
    }
    ojax(url, body + "[]" + photo + "[]" + obj)
}
function readyok() {
    $(document).on(click, "#page", function() {
        if ($(".on").length > 0) {
            $(".on").removeClass("on")
        }
    });
    $(document).on(click, ".k,.bn", function() {
        if (keydown == 1) {
            keydown = 0;
            k_obj.css("margin-top", "0");
            eval(k_obj.attr("data-h"))
        } else {
            if (click == "click") {
                k_obj = $(this);
                eval(k_obj.attr("data-h"))
            }
        }
    });
    $(document).on("touchstart", ".k,.bn",
    function() {
        keydown = 1;
        k_obj = $(this);
        k_obj.css("margin-top", "5px")
    });
    $(document).on("touchmove", ".k,.bn",
    function() {
        if (keydown == 1) {
            keydown = 0;
            k_obj.css("margin-top", "0px")
        }
    })
}
function selectface(i) {
    var icon = $("textarea").val() + "[img]" + http + "/ok/face/" + i + ".gif[/img]";
    $("textarea").val(icon);
    eval($("#replybutton").attr("data-h"))
}
function tag_share_area() {
    var st = $("#share_area").css("display");
    if (st == "block") {
        $("#share_area").css("display", "none")
    } else {
        $("#share_area").css("display", "block")
    }
}
function sub(str, len) {
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) < 48) {
            continue
        }
        if (str.charCodeAt(i) > 128) {
            strlen += 2
        } else {
            strlen++
        }
        s += str.charAt(i);
        if (strlen >= len) {
            return s
        }
    }
    return s
}
function down_ok8sapp() {
    var wx = "";
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        wx = "wx";
        loadfile("http://a.app.qq.com/o/simple.jsp?pkgname=com.ok8s.app")
    } else {
        loadfile(http + "/ok/ok8s.apk")
    }
}
function s_showphoto(obj) {
    var htm = "<img src='" + upurl + obj + "' >";
    $("#showphoto").html(htm);
    $("#photourl").val(obj)
}
function ok8s_menu(obj) {
    var json = JSON.parse(obj);
    var html = "";
    var button = json.button;
    var sub_button = "";
    var url = "";
    for (var i in button) {
        if (button[i].sub == 0) {
            if (button[i].url.indexOf("(") >= 0) {
                url = button[i].url
            } else {
                if (button[i].url.indexOf("http://") >= 0) {
                    url = "loadfile('" + button[i].url + "')"
                } else {
                    url = "ojax('" + button[i].url + "')"
                }
            }
            html += '<li> <a class="bn" data-h="' + url + ';"><span>' + button[i].name + "</span></a></li>"
        } else {
            sub_button = button[i].sub_button;
            html += '<li> <a class="bn" data-h="menu();"><span>' + button[i].name + "</span></a>" + "<dl>";
            for (var j in sub_button) {
                if (sub_button[j].url.indexOf("(") >= 0) {
                    url = sub_button[j].url
                } else {
                    if (sub_button[j].url.indexOf("http://") >= 0) {
                        url = "loadfile('" + sub_button[j].url + "')"
                    } else {
                        url = "ojax('" + sub_button[j].url + "')"
                    }
                }
                html += '<dd><a class="bn" data-h="' + url + ';on_remove();"><span>' + sub_button[j].name + "</span></a></dd>"
            }
            html += "</dl></li>"
        }
    }
    $("#menu").html(html)
}
function menu() {
    if (k_obj.hasClass("on")) {
        $(".on").removeClass("on")
    } else {
        if ($(".on").length > 0) {
            $(".on").removeClass("on")
        }
        k_obj.addClass("on")
    }
}
function on_remove() {
    if ($(".on").length > 0) {
        $(".on").removeClass("on")
    }
}
function ctrlcopy(txt) {
    if (typeof(yaoApplication) != "undefined") {
        yaoApplication.setclip(txt);
        alert("已复制到剪贴板")
    } else {
        if (typeof(uexCamera) == "undefined") {
            alert("请长按文字，选择并复制")
        } else {
            uexClipboard.copy(txt);
            alert("已复制到剪贴板")
        }
    }
}
function ctrlc(dom, f) {
    var txt;
    if (f == 1) {
        txt = $(dom).html()
    } else {
        txt = $(dom).text()
    }
    ctrlcopy(txt)
}
function ctrlv(dom) {
    if (typeof(yaoApplication) != "undefined") {
        $(dom).val(yaoApplication.getclip())
    } else {
        alert("先点击一下输入框，再长按输入框，选择粘贴")
    }
};
