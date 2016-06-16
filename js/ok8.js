function testEnter() {
    if (event.keyCode == 13) {
        tiao();
        return false
    }
}
function tiao() {
    var url = $("#geturl").val().trim();
    if (url.length < 1) {
        alert("请输入网址。")
    } else {
        var text = url;
        url = url.replace("https://", "http://");
        if (url.indexOf("http://") < 0) {
            url = "http://" + url
        }
        var strRegex = /(http[s]?|ftp):\/\/[^\/\.]+?\..+[\w|\/]$/i;
        var reg = new RegExp(strRegex);
        if (!reg.test(url)) {
            url = "http://www.baidu.com/s?wd=" + text;
            loadfile(url);
            return
        }
        openiframe(url)
    }
}
function addScript(src) {
    var e = document.createElement("script");
    e.setAttribute("type", "text/javascript");
    e.setAttribute("charset", "UTF-8");
    e.setAttribute("src", src);
    document.body.appendChild(e);
    return e
}
function edit_ad(obj) {
    var text = $("#d_text").val();
    var url = $("#d_url").val().trim();
    var img = $("#photourl").val();
    url = url.replace("https://", "http://");
    if (url.indexOf("http://") < 0) {
        url = "http://" + url
    }
    if (text.length < 3 && img.length < 3) {
        alert("文字和图片至少有一个，并且文字至少3个字。");
        return
    } else {
        if (url.length > 4) {
            var strRegex = /(http[s]?|ftp):\/\/[^\/\.]+?\..+[\w|\/]$/i;
            var reg = new RegExp(strRegex);
            if (url.indexOf("http") < 0) {
                url = "http://" + url
            }
            if (reg.test(url)) {
                url = url.replace(/&/gi, "@8@")
            } else {
                alert("请输入正确网址");
                return
            }
        }
        ojax("/file/newadd/" + obj, text + "[]" + url + "[]" + img + "[]")
    }
}
function xz_ad_check() {
    var s = "";
    var obj = document.getElementsByName("ad_type");
    for (var i in obj) {
        if (obj[i].checked) {
            s += obj[i].value + "_"
        }
    }
    if (s.length < 1) {
        alert("你还木有选择！");
        return
    } else {
        ojax("/ask/ad_type/0", s)
    }
}
function next_user(t, uid) {
    if (tmp == 0) {
        tmp = "_"
    }
    var arr = tmp.split("_");
    if (t == 1) {
        if ($(".nextmain").length > 0) {
            $(".nextmain").remove()
        }
    }
    if ((uid + "_" + t) == tmp) {
        tmp = "_";
        if ($("#n_main" + t).length > 0) {
            $("#n_main" + t).remove()
        }
    } else {
        if (arr[1] == t) {
            if ($("#n_main" + t).length > 0) {
                $("#n_main" + t).remove()
            }
        }
        tmp = uid + "_" + t;
        ojax("/ask/next_user/" + t + "_" + uid)
    }
}
function changesonscreen(obj) {
    if (obj == 1) {
        $("#sppl").css("display", "block");
        $("#spxq").css("display", "none")
    } else {
        if (obj == 0) {
            $("#sppl").css("display", "none");
            $("#spxq").css("display", "block")
        }
    }
}
function apply(obj) {
    var zfb = $("#zfb").val();
    var je = $("#je").val().trim();
    if (je <= 0 || isNaN(je)) {
        alert("请输入正确金额。");
        $("#je").val("")
    }
    if (obj == 0) {
        if (zfb.trim() == "") {
            alert("请输入支付账号。")
        } else {
            ojax("/ask/apply/0", zfb + "[]" + je + "[]" + obj)
        }
    } else {
        if (obj == 1) {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                ojax("/ask/wxapply/20", "")
            } else {
                alert("请到微信中进行此操作。");
                return
            }
        } else {
            if (obj == 2) {
                ojax("/ask/apply/0", zfb + "[]" + je + "[]" + obj)
            } else {
                alert("未知错误，请重试。");
                return
            }
        }
    }
}
var ad_place = 0;
var ques_url;
function add_my_ad(id) {
   ojax("/file/set/" + id, ques_url)
}
function userpay(bid) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        ojax("/ask/wxpay/" + bid, "")
    } else {
        alert("请使用八秒客户端或者在八秒微信公众号中支付。");
        return
    }
}
function openiframe(url) {
    ad_place = 0;
    var nurl = url.replace(/=/ig, "@8s");
    nurl = nurl.replace(/&/ig, "@@");
    ques_url = url;
    ojax("/edit/open/2", nurl)
}
function fastad() {
    var html = '<div class="tit1">选择广告位置：</div> <div class="cb n5"></div> ' + '<div class="k c12 pa20" data-h="adplace(1)">头部广告</div>' + '<div class="k c12 pa20" data-h="adplace(4)">底部广告</div>' + '<div class="k c9 pa20" data-h="bpp_keyback()">返回</div>';
    $("#mymodal").html(html);
    showmodal(1)
}
function adplace(n) {
    ad_place = n;
    ojax("/ask/advert/0")
}
function showuphtml(t) {
    if ($("#myCanvas").length < 1) {
        var html = '<canvas id="myCanvas" style="display:none;"></canvas>';
        $("body").append(html)
    }
    if (t == 1) {
        var htm = '<div id="adcbox" style="display:none;position:relative"> <canvas id="adCanvas" width="100" height="200"></canvas>' + '<div id="fgbox" style="width:200;position:absolute;top:0px;background-color:rgb(110, 110, 110); filter:alpha(opacity=80); -moz-opacity:0.8; -khtml-opacity: 0.8; opacity: 0.8; "> <div id="loadnum" class="ra5 pa10 h1" style="width:60px;margin:auto;color:white;background-color:rgb(110, 110, 110); ">0%</div> </div> </div> ';
        p_obj.after(htm)
    } else {
        $("#showphoto").html("")
    }
    var fileObj = document.getElementById("file").files[0];
    $("#up_pic").html("上传中。。。");
    loadImage(fileObj, t)
}
var MAX_WIDTH = 480;
var image = new Image();
function render1(src, t, type) {
    image = new Image();
    image.onload = function() {
        var canvas = document.getElementById("myCanvas");
        if (image.width > MAX_WIDTH) {
            image.height = image.height * MAX_WIDTH / image.width;
            image.width = MAX_WIDTH
        }
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        var data = ctx.getImageData(0, 0, image.width, image.height).data;
        var red = 0,
        blue = 0,
        green = 0,
        alpha = 0;
        for (var i = 0,
        len = data.length; i < len; i += 4) {
            red += data[i];
            green += data[i + 1];
            blue += data[i + 2];
            alpha += data[i + 3]
        }
        var ared = 255 - red / (image.width * image.height);
        var agreen = 255 - green / (image.width * image.height);
        var ablue = 255 - blue / (image.width * image.height);
        sendImage(t, type)
    };
    image.src = src
}
function loadImage(src, t) {
    var type = src.type;
    if (!type.match(/image.*/)) {
        if (window.console) {
            console.log("选择的文件类型不是图片: ", src.type)
        } else {
            window.confirm("只能选择图片文件")
        }
        return
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        render1(e.target.result, t, type)
    };
    reader.readAsDataURL(src)
}
function sendImage(t) {
    loadi = 0;
    pageload();
    var canvas = document.getElementById("myCanvas");
    var dataurl = canvas.toDataURL("image/png");
    var imagedata = dataurl;
    var url = "/file/uppicmax";
    var data = {
        imagedata: imagedata,
        k: getkey("k")
    };
    $.ajax({
        url: url,
        data: data,
        type: "POST",
        dataType: "json",
        complete: function(xhr, result) {
            var htm = '上传图片<input type="file" id="file" style="width:100px;height:40px; cursor: pointer;outline: medium none; position: absolute; filter:alpha(opacity=0);-moz-opacity:0;opacity:0; left:0px;top: 0px;" onchange="showuphtml(' + t + ');"/>';
            if (t == 1) {
                $("#adcbox").remove();
                var htm = '上传图片<input type="file" id="file" style="width:100%;height:100%; cursor: pointer;outline: medium none; position: absolute; filter:alpha(opacity=0);-moz-opacity:0;opacity:0; left:0px;top: 0px;" onchange="showuphtml(1);">'
            } else {
                $("#adcbox").css("display", "none");
                clearTimeout(loadtime)
            }
            $("#up_pic").html(htm);
            if (!xhr) {
                alert("网络连接失败,上传错误。");
                return
            }
            var text = xhr.responseText;
            if (!text) {
                alert("网络错误,上传错误。");
                return
            }
            getimgurl(text, t)
        }
    })
}
var image1 = new Image();
var loadi = 0;
var loadtime = null;
function pageload() {
    loadi++;
    if (loadi == 1) {
        var canvas = document.getElementById("adCanvas");
        image1 = image;
        if (image1.width > 200) {
            image1.height = image1.height * 200 / image1.width;
            image1.width = 200
        }
        $("#fgbox").css("width", image1.width);
        $("#fgbox").css("height", image1.height);
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image1.width;
        canvas.height = image1.height;
        ctx.drawImage(image1, 0, 0, image1.width, image1.height);
        $("#adcbox").css("display", "block");
        loadtime = setTimeout("pageload()", 100)
    }
    if (loadi < 20) {
        var h = image1.height * (100 - loadi) / 100;
        $("#fgbox").css("height", h);
        loadtime = setTimeout("pageload()", 600);
        $("#loadnum").html(loadi + "%")
    } else {
        if (loadi < 50) {
            var h = image1.height * (100 - loadi) / 100;
            $("#fgbox").css("height", h);
            loadtime = setTimeout("pageload()", 400);
            $("#loadnum").html(loadi + "%")
        } else {
            if (loadi < 90) {
                var h = image1.height * (100 - loadi) / 100;
                loadtime = $("#fgbox").css("height", h);
                setTimeout("pageload()", 500);
                $("#loadnum").html(loadi + "%")
            } else {
                if (loadi < 100) {
                    var h = image1.height * (100 - loadi) / 100;
                    loadtime = $("#fgbox").css("height", h);
                    setTimeout("pageload()", 900);
                    $("#loadnum").html(loadi + "%")
                }
            }
        }
    }
}
function getimgurl(data, t) {
    var arr = data.split("{}");
    console.log(data);
    if (arr[1] == "ok") {
        showchoicephoto(arr[2], t)
    } else {
        alert("上传错误，请重试。" + arr[2])
    }
}
function showchoicephoto(url, t) {
    upurl = "";
    if (t == 0) {
        var htm = "<img src='" + upurl + url + "' class='photo'>";
        $("#showphoto").html(htm);
        $("#photourl").val(url)
    } else {
        if (t == 1) {
            select_id++;
            var htm = '<div class="cb n5"></div><div><img id="a' + select_id + '" width="100%" src="' + upurl + url + '"></div>';
            p_obj.after(htm);
            if ($(".c7").length > 0) {
                $(".c7").removeClass("c7 pa5")
            }
            $("#ok8sedit").remove();
            $("#ok8sinput").remove()
        } else {
            goodsdetail(url, t)
        }
    }
}
function delhtml(nurl, id, t) {
    var con = "确定屏蔽此人并删贴？";
    if (t == 0) {
        con = "确定删除？"
    }
    if (confirm(con)) {
        upurl = "/edit/delete";
        if (nurl.length > 3) {
            $.ajax({
                url: upurl + "/delhtmlfile",
                type: "POST",
                data: {
                    "url": nurl
                },
                dataType: "json",
                complete: function(xhr, result) {
                    if (!xhr) {
                        alert("网络连接失败,上传错误。");
                        return
                    }
                    var text = xhr.responseText;
                    if (!text) {
                        alert("网络错误,上传错误。");
                        return
                    }
                    var arr = text.split("{}");
                    alert(arr[1]);
                    console.log(arr[1])
                }
            })
        }
        if (t == 1) {
            ojax("/edit/delete" + id + "_1")
        } else {
            ojax("/edit/delete?id="+id)
        }
    }
}
function addgg(obj) {
    if (obj == 1) {
        var html = '<div><div class="cb n5"></div><div class="txt1 pa0" style="border: 2px solid #cccccc;background-color: #ffffff ">' + '<input type="text" class="inp pa10 bd0 admin" style="width: 90%;float: left;" placeholder="答案...."/>' + '<div class="bn pa10" style="width: 10%;float:left" data-h="addgg(0)"><span class="icon-close cimg"></div>' + "</div></div>";
        $("#gg").append(html)
    } else {
        k_obj.parent().parent().remove()
    }
}
function addgg(obj) {
    if (obj == 1) {
        var html = '<div><div class="cb n5"></div><div class="txt1 pa0" style="border: 2px solid #cccccc;background-color: #ffffff ">' + '<input type="text" class="inp pa10 bd0 postdata" style="width: 90%;float: left;" placeholder="填写规格，如大小，颜色"/>' + '<div class="bn pa10" style="width: 10%;float:left" data-h="addgg(0)"><span class="icon-close cimg"></div>' + "</div></div>";
        $("#gg").append(html)
    } else {
        k_obj.parent().parent().remove()
    }
}
function addxq(obj) {
    if (obj >= 0) {
        var z = obj - 0 + 1;
        var html = '<div><div class="cb n5"></div><div class="txt1 pa0" style="border: 2px solid #cccccc;background-color: #ffffff ">' + '<div id="img_' + obj + '" class="r50"></div> <input id="url_' + obj + '" type="hidden" class="postdata">' + '<div id="up_pic' + obj + '" class="k xn c13 fl ra2 ma1" style="position:relative;color:red;text-align:center;background-color: deepskyblue;"> 上传封面 ' + '<input type="file" id="file' + obj + '" style="width:100%;height:100%; cursor: pointer;outline: medium none; position: absolute; filter:alpha(opacity=0);-moz-opacity:0;opacity:0; left:0px;top: 0px;" onchange="upgoodsdetail(' + obj + ')"/></div>' + '<div class="k xn ra2 fr c12" data-h="addxq(-1)">删除</div>' + "</div></div>";
        $("#xq").append(html);
        $("#addxqbtn").attr("data-h", "addxq(" + z + ")")
    } else {
        k_obj.parent().parent().remove()
    }
}
function upgoodsdetail(t) {
    if ($("#myCanvas").length < 1) {
        var html = '<canvas id="myCanvas" style="display:none;"></canvas>';
        $("body").append(html)
    }
    var fileObj = document.getElementById("file" + t).files[0];
    $("#up_pic" + t).html("上传中。。。");
    loadImage(fileObj, t)
}
function goodsdetail(url, t) {
    upurl = "http://img1.ok8s.com:83";
    var htm = "<img src='" + upurl + url + "' class='photo'>";
    $("#img_" + t).html(htm);
    $("#url_" + t).val(url);
    $("#up_pic" + t).remove()
}
function inmusic(url) {
    if ($("#backmusic").length < 1) {
        $("#main_ok8s_body").append('<div id="backmusic" style="display:none;"></div>')
    }
    $("#backmusic").html("<audio src='" + url + '\' autoplay="autoplay" loop="loop">');
    showmodal(0)
};

/**
 * add by lirenfu
 */
function add_my_a(id) {
    var ad = $("#insertad_" + id).html();
    showmodal(0);
    if (ad.length < 1) {
        alert("你还木有编辑你的连接，请在‘我的’里面添加文字广告。");
        return
    } else {
        if ($(".c7").length > 0) {
            $(".c7").removeClass("c7 pa5")
        }
        $("#ok8sedit").remove();
        $("#ok8sinput").remove();
        select_id = $("#bigger").val();
        select_id++;
        $("#bigger").val(select_id);
        p_obj.after('<div id="a' + select_id + '">' + ad + "</div>")
    }
}