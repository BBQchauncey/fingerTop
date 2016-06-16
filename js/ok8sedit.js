var dblclick = "click";
var starttime = 0;
var my_ad = "";
var my_new_url = "";
var select_id = 0;
var q_body = "";
var body1 = "";
var q_tit = "";
var q_url = "";
var q_id = 0;
var text_style_size = "";
var text_style_color = "";
var text_style_align = "";
var isedit = 0;
var delArr = [];
var htmlStatus = [];
var alreayGet = true;
var pageNo = 0;
function ok8spost() {
    if ($("#q_tit").length > 0 && $("#q_okbtn").length > 0) {
        subques()
    } else {
        $("#ok8s_btn").remove();
        if ($(".c7").length > 0) {
            $(".c7").removeClass("c7 pa5")
        }
        if ($("#ok8sedit").length > 0) {
            $("#ok8sedit").remove()
        }
        if ($("#ok8sinput").length > 0) {
            $("#ok8sedit").remove()
        }
        q_tit = document.title;
        q_body = $("#main_ok8s_body").html();
        body1 = $("#main_ok8s_body").length > 0 ? $("#main_ok8s_body").text() : $("body").text();
        body1 = body1.replace(q_tit, "");
        body1 = sub(body1, 90) + "...";
        var html = '<div class="tit1 h4"> </div><div class="cb n5"></div>' + '<div class="txt1">' + '<div class="txt1">标题：<br /><input type="text" id="q_tit" class="inp pa10" value="' + q_tit + '"/>' + '<div id="question" class="pa5"></div></div></div>' + '<div id="q_okbtn" class="k xn pa20 c1" data-h="subques()">确定提交</div>' + "</div>";
        showpop();
        $("#main").html(html);
        return false;
    }
}
function ok8sdel() {
    p_obj.remove();
    if($('#main_ok8s_body').html()==htmlStatus[1]){
		return
	}
    // delArr.push(p_obj)
    if ($("#ok8sedit").length > 0) {
        $("#ok8sedit").remove()
    }
    if ($("#ok8sinput").length > 0) {
        $("#ok8sinput").remove()
    }
    updateHtml()
    // p_obj.html('')
}
function setid(ddom) {
    $(ddom).find("*").each(function() {
        $(this).attr("id", "a" + select_id)
        select_id++;
    })
}
function readyok1() {
    var system = {
        win: false,
        mac: false,
        xll: false
    };
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    if (system.win || system.mac || system.xll) {
        dblclick = "click";
        $(document).on("click", ".xn",
        function() {
            k_obj = $(this);
            eval(k_obj.attr("data-h"))
        })
    } else {
        dblclick = "touchend"
    }
    $(document).on("touchstart", "div,p,img,h1,h2,h3,h4,h5,h6,span,input,textarea,iframe,em,a",
    function(e) {
    	e.stopPropagation()
        k_obj = $(this);
        if (k_obj.attr("class") != null) {
            if (k_obj.attr("class").indexOf("xn") >= 0) {
                keydown = 1;
                // k_obj.css("margin-top", "5px")
            } else {
                keydown = 2
            }
        } else {
            keydown = 2
        }
    });
    $(document).on("touchmove", "div,p,img,h1,h2,h3,h4,h5,h6,span,input,textarea,iframe,em,a",
    function(e) {
    	e.stopPropagation()
    	
        if (keydown == 1 || keydown == 2) {
            keydown = 0;
            // k_obj.css("margin-top", "0px")
        }
    });
    $(document).on(dblclick, "div,p,img,h1,h2,h3,h4,h5,h6,span,input,textarea,iframe,em,a",
    function(e) {
    	e.stopPropagation()
    	
    	k_obj = $(this);
        if (keydown == 1) {
            keydown = 0;
            // k_obj.css("margin-top", "0");
            eval(k_obj.attr("data-h"))
        } else {
            if (keydown == 2) {
                if ($("#mymodal").css("display") == "none") {
                    if (k_obj.attr("id").indexOf("a") != 0) {
                        return
                    }
                    p_obj = k_obj;
                    showedit("a")
                }
            } else {
                if (dblclick == "click") {
                    k_obj = $(this);
                    if (k_obj.attr("id").indexOf("a") != 0) {
                        return
                    }
                    p_obj = k_obj;
                    showedit("a")
                }
            }
        }
    })
}
function editcancel() {
    $("#ok8sedit").remove();
    $(".c7").removeClass("c7");
    $("#ok8sinput").remove();
    $('.bottomTip').show()
    $('.complete').show()
    
}
function showmenu() {
    isedit = 1;
    //<div class="k xn c6 pa20 r33" data-h="editword()">插文字</div>
    // var htm = '	<a style="color:#fff;" class="k xn c6 pa20 r33" href="javascript:void(0)"  data-h="ojax(\'/file/alist\')">插广告</a> 	<div class="k xn c9 pa20 r33" data-h="editcancel()">取消</div><a class="k xn c6 pa20 r33" href="javascript:void(0)"  style="color:#fff;" data-h="ojax(\'/file/alist\')">插广告</a> ';
  
	//data-h="javascript:{ojax(\'/file/alist\');this.disabled=true;}"
	// var htm = '<div class="menu"><div class="lineOne"><div class="ads vertivalStyle">插广告</div><div class="music vertivalStyle xn" data-h="addMusic()">插音乐</div><div class="delUp xn vertivalStyle" data-h="delete_up_down(\'up\')">删除前</div></div><div class="lineTwo"><div class="text vertivalStyle xn" data-h="addTxt()">插文字</div><div class="pic vertivalStyle xn" data-h="inputDiv()">插图片</div><div class="delDown vertivalStyle xn" data-h="delete_up_down(\'down\')">删除后</div></div><div class="lineThree"><div class="link vertivalStyle xn" data-h="linkDiv()">写链接</div><div class="video vertivalStyle xn" data-h="videoDiv()">插视频</div><div class="del vertivalStyle xn" data-h="ok8sdel();">删除</div></div><div class="cancelBtn" ><img class="xn" data-h="editcancel();" src="images/12.png"></div></div>'
	var htm = '<div class="menu"><div class="lineOne"><div class="newAds vertivalStyle xn" data-h="getHistoryDatas()">插广告</div><div class="newText vertivalStyle xn" data-h="addTxt()">插文字</div><div class="newMusic vertivalStyle xn" data-h="addMusic()">插音乐</div></div><div class="lineTwo"><div class="newVideo vertivalStyle xn" data-h="videoDiv()">插视频</div><div class="upper xn vertivalStyle" data-h="upper()">上一步</div><div class="newDel vertivalStyle xn" data-h="ok8sdel();">删<span style="visibility:hidden">占</span>除</div></div><div class="newCancel" ><img class="xn" data-h="editcancel();" src="images/12.png"></div></div>'
   
// htm+=' <div class="k xn c6 pa20 r33" data-h="editword()">插文字</div>'
    var utype = getkey("utype");
    if (utype && utype < 2) {
      //  htm += '<div class="k xn c6 pa20 r33" data-h="">会员才能插图片</div>'
    } else {
        if (typeof(yaoApplication) != "undefined") {
       //     htm += '<div class="k xn c6 pa20 r33" data-h="up_img(\'okimgadd\');">插图片</div>'
        } else {
      //      htm += '<div id="up_pic" class="k xn c6 pa20 r33" style="position:relative;text-align:center;"> 插图片<input type="file" id="file" style="width:100%;height:100%; cursor: pointer;outline: medium none; position: absolute; filter:alpha(opacity=0);-moz-opacity:0;opacity:0; left:0px;top: 0px;" onchange="showuphtml(1);"/></div>'
        }
    }
    //htm += '<div class="k xn c6 pa20 r33"  data-h="upvideo()">插视频</div>';
    //htm += '<div class="k xn c6 pa20 r33"  data-h="ojax(\'/file/music/0\')">插音乐</div>';
    // htm += '<div class="k xn c6 pa20 r33 cb" data-h="ok8sdel();">删除</div>' + '<div class="k xn c6 pa20 r33" data-h="delete_up_down(\'up\')">删前</div>' + '<div class="k xn c6 pa20 r33" data-h="delete_up_down(\'down\')">删后</div>';
    $("#ok8sedit").html(htm)
    $('.bottomTip').hide()
}
function editword() {
    var htm = '<div style="padding: 15px 10px 10px 10px" class="fr w50 c2 bn ma1 xn anc pa10 hh" data-h="editcancel();"><span></span>取消</div>';
    htm += '<div style="padding: 15px 10px 10px 10px" class="fl w50 c1 bn ma1 xn anc pa10 hh" data-h="$(\'#ok8stxt\').html(\'\');"><span ></span>清空</div>' + '<div class="cb n5"></div>' + '<div contenteditable="true" id="ok8stxt" class="inp hh3 pa2" style=" overflow:auto;"></div>' + '<div class="bn xn anc fl c2 w80 ma1 pa10 ra2 cb" data-h="charu()">添加</div>' + '<div class="bn xn anc fl c1 w80 ma1 pa10 ra2" data-h="more_style()">样式</div>' + '<div class="cb" id="face"></div>';
    $("#ok8sedit").html(htm)
    $('.complete').hide()
}

function addMusic(){
	var htm = '<div class="inputDiv"><div class="zanwei"></div><div class="inputCtx"><textarea id="inputArea" placeholder="点击输入框，长按粘贴链接"></textarea></div><div class="cancelBtn vertivalStyle"><img class="xn" data-h="editcancel()" src="images/12.png"/></div><div class="add cancelBtn vertivalStyle"><img class="xn" data-h="musicTag()" src="images/yuanDuigou.png"/></div></div>'
    $("#ok8sedit").html(htm)
    $('.complete').hide()
    

}

function insetAds(){
	alreayGet = true
}


var getHistoryDatas = function() {
	if(alreayGet == false){
		return
	}
	$.ajax({
		type: "get",
		url: "http://zhijian88.com.cn:8100/ads/jsonp/list_avaiable_ads?pagesize=10&pageno=" + pageNo,
		dataType: 'jsonp',
		jsonp: 'callback',
		success: function(res) {
			pageNo++;
			console.log(res.value.ad_metas);
			var datas = res.value.ad_metas;
			if (datas.length == 0) {
				if (pageNo > 1) {
					$('.showMore').text('没有更多了')
					return
				} else {
					$('.noneAds').show();
					$('.showMore').hide()
				}

			}
			for (var i in datas) {
				// status为广告审核状态: 0审核中, 1审核通过,
				if (datas[i].status == 0) {
					datas[i].statusTxt = '审核中'
					datas[i].statusBGColor = 'orange'
				} else {
					datas[i].statusTxt = '通过审核'
					datas[i].statusBGColor = 'green'
				}

				var html1 = '<div class="hisAds">' +
					'<div class="adsImg">' +
					'<img src="' + datas[i].photo_url + '" />' +
					'</div>' +

					'<p class="adsTitle">' + datas[i].title + '</p>' +

					'<p class="time">' + datas[i].str_create_time + '</p>' +
					
					'<p style="color:#fcaf2a;font-size:15px;padding-left: 12px;">广告点击量200</p>'+

					'<div class="edit vertivalStyle hisBtnStyle" adsId="' + datas[i].ad_id + '" title="' + datas[i].title + '" photo_url="' + datas[i].photo_url + '" link_url="' + datas[i].link_url + '">' +
					'插入' +
					'</div>' +

					'<div class="adsStatus ' + datas[i].statusBGColor + '">' +
					datas[i].statusTxt +
					'</div>' +

					'<div class="delHisAdsCtx" adsId="' + datas[i].ad_id + '"><div class="delHisAds" >' +
					'×' +
					'</div></div>' +
					'</div>'

				var html2 = '<div class="hisAds noPic">' +
					'<p class="adsTitle">' + datas[i].title + '</p>' +

					'<p class="time">' + datas[i].str_create_time + '</p>' +
					
					'<p style="color:#fcaf2a;font-size:15px;padding-left: 12px;">广告点击量200</p>'+

					'<div class="edit vertivalStyle hisBtnStyle" adsId="' + datas[i].ad_id + '" title="' + datas[i].title + '" photo_url="' + datas[i].photo_url + '" link_url="' + datas[i].link_url + '">' +
					'插入' +
					'</div>' +

					'<div class="adsStatus ' + datas[i].statusBGColor + '">' +
					datas[i].statusTxt +
					'</div>' +

					'<div class="delHisAdsCtx" adsId="' + datas[i].ad_id + '"><div class="delHisAds" >' +
					'×' +
					'</div></div>' +
					'</div>'

				// $(html).before($('.showMore'))
				if (datas[i].photo_url == '') {
					$('.showMore').before(html2)
				} else {
					$('.showMore').before(html1)
				}

			}
			
			$("#ok8sedit").remove();
    			$("#ok8sinput").remove();
    			showmodal(0)
				$('.adss').show()
				alreayGet = false
			
			addDnymicEvent()

		},
		error: function(res) {
			console.log(res)
		}
	});
}


var addDnymicEvent = function() {
	// 历史广告编辑按钮事件
	$('.edit').off('click')
		// 删除历史广告按钮事件
	$('.delHisAdsCtx').off('click')

	// 历史广告编辑按钮事件
	$('.edit').on('click', function() {
			$('.historyTab').hide();
			$('.creatTab').show()
			$('.clickFlag').removeClass('headerActive')
			$('.headLeft').addClass('headerActive')
			var adsId = $(this).attr('adsid');
			$('#modifyAdsId').val(adsId);
			$('.imgCxt').attr("src",$(this).attr('photo_url'));
			$("#adsDesc").val($(this).attr('title'));
			$("#adsLink").val($(this).attr('link_url'));
			$('.imgCxt').show();
			$('.addFile').hide();
			$('.delImgCtx').show();
		})
		// 删除历史广告按钮事件
	$('.delHisAdsCtx').on('click', function() {
		var ele = $(this);
		var id = ele.attr('adsId');
		swal({
			title: "确定删除吗?",
			text: "删除后不能恢复，请谨慎操作!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "确定",
			closeOnConfirm: false
		}, function(isConfirm) {
			if (isConfirm) {
				$.ajax({
					type: "get",
					url: "http://zhijian88.com.cn:8100/ads/jsonp/remove_ads?ad_id=" + id,
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(res) {
						if (res.success) {
							swal("删除成功", "", "success");
							console.log(res)
							ele.parent().remove();
						}
					},
					error: function(err) {
						console.log(err)
					}
				});
			}

		});

	})
}

function addTxt(){
	// <label for="colorSelect" id="txtmiddleColor"></label>
	var html = '<div class="addTxtInput"><div class="txtLeft vertivalStyle"><p class="txtSize">字号</p><div class="fontSizeType"><div class="txtBig vertivalStyle"><img class="xn" data-h="text_style(\'text_style_size\',\'24px\')" src="images/big.png"/></div><div class="txtMiddle vertivalStyle"><img class="xn" data-h="text_style(\'text_style_size\',\'18px\')" src="images/middle.png"/></div><div class="txtSmall vertivalStyle"><img class="xn" data-h="text_style(\'text_style_size\',\'14px\')" src="images/small.png"/></div></div></div><div id="textColor"><p id="txtSize">颜色</p><input id="txtmiddleColor" minicolors-swatch-color type="text"  data-control="wheel" hidden="hidden"></div><div class="txtAlign vertivalStyle"><p class="txtSize">对齐</p><div class="fontSizeType"><div class="txtBig vertivalStyle"><img class="xn" data-h="text_style(\'text_style_align\',\'left\')" src="images/tl.png"/></div><div class="txtMiddle vertivalStyle"><img class="xn" data-h="text_style(\'text_style_align\',\'center\')" src="images/tm.png"/></div><div class="txtSmall vertivalStyle"><img class="xn" data-h="text_style(\'text_style_align\',\'right\')" src="images/tr.png"/></div></div></div><div class="inputDiv"><div class="zanwei"></div><div class="inputCtx"><textarea id="ok8stxt" placeholder="点击输入框，长按粘贴链接"></textarea></div><div class="cancelBtn vertivalStyle"><img class="xn" data-h="editcancel();" src="images/12.png"/></div><div class="add cancelBtn vertivalStyle"><img class="xn" data-h="charu()" src="images/yuanDuigou.png"/></div></div></div>'
    $("#ok8sedit").html(html)
	$('#txtmiddleColor').each( function() {

				$(this).minicolors({

					control: $(this).attr('data-control') || 'hue',

					defaultValue: $(this).attr('data-defaultValue') || '',

					inline: $(this).attr('data-inline') === 'true',

					letterCase: $(this).attr('data-letterCase') || 'lowercase',

					opacity: $(this).attr('data-opacity'),

					position: $(this).attr('data-position') || 'bottom left',

					change: function(hex, opacity) {

						if( !hex ) return;

						if( opacity ) hex += ', ' + opacity;

						try {

							console.log(hex);
							$(this).css('background-color',hex)
							text_style('text_style_color',hex)

						} catch(e) {}

					}

				});

                

            });
            
    
    $('.complete').hide()
    
    
}

function linkDiv(){
	var htm = '<div class="inputDiv"><div class="zanwei"></div><div class="inputCtx"><textarea id="inputArea" placeholder="点击输入框，长按粘贴链接"></textarea></div><div class="cancelBtn vertivalStyle"><img class="xn" data-h="editcancel()" src="images/12.png"/></div><div class="add cancelBtn vertivalStyle"><img class="xn" data-h="addLink()" src="images/yuanDuigou.png"/></div></div>'
    $("#ok8sedit").html(htm);
    $('.complete').hide();
    
}


function inputDiv(){
	var htm = '<div class="inputDiv"><div class="zanwei"></div><div class="inputCtx"><textarea id="inputArea" placeholder="点击输入框，长按粘贴链接"></textarea></div><div class="cancelBtn vertivalStyle"><img class="xn" data-h="editcancel()" src="images/12.png"/></div><div class="add cancelBtn vertivalStyle"><img class="xn" data-h="oknetimgadd()" src="images/yuanDuigou.png"/></div></div>'
    $("#ok8sedit").html(htm);
    $('.complete').hide();
    
}

function videoDiv(){
	var htm = '<div class="inputDiv"><div class="zanwei"></div><div class="inputCtx"><textarea id="videoInput"  placeholder="点击输入框，长按粘贴链接"></textarea><a href="http://www.baidu.com"><p class="videoTip">如何获取视频链接？</p></a></div><div class="cancelBtn vertivalStyle"><img class="xn" data-h="editcancel()" src="images/12.png"/></div><div class="add cancelBtn vertivalStyle"><img class="xn" data-h="videoTag()" src="images/yuanDuigou.png"/></div></div>'
    $("#ok8sedit").html(htm);
    $('.complete').hide();
    
}


function showedit(type) {
    tmp = type;
    if ($(".c7").length > 0) {
        $(".c7").removeClass("c7 pa5")
    }
    k_obj.addClass("c7 pa5");
    if ($("#ok8sedit").length > 0) {
        $("#ok8sedit").remove()
    }
    if ($("#ok8sinput").length > 0) {
        $("#ok8sinput").remove()
    }
    var htm = '<div id="ok8sedit" class="txt1 cb" ></div>';
    text_style_size = "";
    text_style_color = "";
    text_style_align = "";
    k_obj.after(htm);
    // $('.complete').hide()
    showmenu()
}
$(document).ready(function() {
	setid('#main_ok8s_body')
    readyok1();
   	var HTML = $('#main_ok8s_body').html();
	htmlStatus.push(HTML);
    if ($("#bigger").length < 1) {
        select_id = 9999;
        $("#main_ok8s_body").after('<input id="bigger" type="hidden" value="' + select_id + '"/>')
    }
});
function ok8sok(i) {
    var txt = document.getElementById("ok8stxt");
    var o = document.createElement("IMG");
    o.src = http + "/ok/face/" + i + ".gif";
    txt.appendChild(o)
}
function charu() {
    select_id = $("#bigger").val();
    select_id++;
    $("#bigger").val(select_id);
    var txt = $("#ok8stxt").val();
    if(txt==undefined){
    	return
    }
    if ($(".c7").length > 0) {
        $(".c7").removeClass("c7 pa5")
    }
    $("#ok8sedit").remove();
    $("#ok8sinput").remove();
    var style = "";
    if (text_style_color != "") {
        style += "color:" + text_style_color + ";"
    }
    if (text_style_size != "") {
        style += "font-size:" + text_style_size + ";"
    }
    if (text_style_align != "") {
        style += "text-align:" + text_style_align + ";"
    }
    var html = '<div  style="padding-top:20px;' + style + '" id="a' + select_id + '">' + txt + "</div>";
    p_obj.after(html)
    updateHtml()
    showmodal(0)
}
function okimgadd(url) {
    select_id = $("#bigger").val();
    select_id++;
    $("#bigger").val(select_id);
    var htm = '<div><img id="a' + select_id + '" width="100%" src="' + upurl + url + '"></div>';
    p_obj.after(htm);
    if ($(".c7").length > 0) {
        $(".c7").removeClass("c7 pa5")
    }
    $("#ok8sedit").remove();
    $("#ok8sinput").remove()
}
function oknetimgadd() {
    select_id = $("#bigger").val();
    select_id++;
    $("#bigger").val(select_id);
    var url = $('#inputArea').val()
     if(url==undefined){
    	return
    }
    var htm = '<div style="padding-top:20px"><img  id="a' + select_id + '" src="' + url + '"></div>';
    p_obj.after(htm);
    $('#inputArea').val('')
    showmodal(0);
    if ($(".c7").length > 0) {
        $(".c7").removeClass("c7 pa5")
    }
    $("#ok8sedit").remove();
    $("#ok8sinput").remove()
}


function quit_add(obj) {
    $("#ok8stxt").val("");
    $("#ok8surl").val("");
    removekey("myurl")
}
function subques0(id, y, m, d, uid, url) {
    var k = getkey("k");
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        k = k + "%2F2"
    } else {
        k = k + "%2F3"
    }
    var data = {
        id: id,
        y: y,
        m: m,
        d: d,
        tit: $("#q_tit").val(),
        body: q_body
    };
    $.ajax({
        url: "http://www.ok8s.com:83/htmlpost?k=" + k,
        data: data,
        type: "POST",
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
            if (arr[0] == "ok") {
                loadfile("http://www.ok8s.com:83" + arr[1] + "?u=" + uid + "&s=" + url)
            } else {
                alert("错误，请重试。" + arr[1])
            }
        }
    })
}
function subques() {
    var f = 1;
    var x = "";
    var tit = $("#q_tit").val();
    var t = tit + "[%]" + q_body + "[%]" + q_url + "[%]" + q_id + "[%]";
    var k = getQueryString('my_id');
    
    $("#question input").each(function(i) {
        x = trim($(this).val());
        if (x.length > 0) {
            t += x + "[%]"
        } else {
            f = 0;
            alert("请填写完整");
            return false
        }
    });
    if (f == 1) {
        t = t.replace(/&/gi, "@8@");
        ojax("/edit/save?st="+k, t)
    }
}

	function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
	} 

function set_edit_face() {
    var htm = "";
    for (var i = 0; i < 135; i++) {
        htm += '<img class="k xn w50 fl" data-h="ok8sok(' + i + ')" src="../face/' + i + '.gif" />'
    }
    htm = '<div class="cb n5"></div><div class="k xn fr c5" data-h="ojax(\'/ask/netimg/0_0\')">动漫表情</div><div class="cb n5"></div><div> ' + htm + "</div>";
    $("#face").html(htm)
}


function add_my_ad(id) {
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
        p_obj.after('<div style="line-height:5px;" id="a' + select_id + '">' + ad + "</div>");
        $(".lrf_ad"+id).css("display","block");
    }
}
function delete_up_down(type) {
    if (type == "up") {
        var upbr = p_obj.prev();
        var upbd;
        while (upbr.length > 0) {
            upbd = upbr.prev();
            upbr.remove();
            upbr = upbd
        }
        var uppa = p_obj.parent();
        while (uppa.length > 0) {
            upbr = uppa.prev();
            while (upbr.length > 0) {
                upbd = upbr.prev();
                if (upbr[0].nodeName.toLowerCase() == "link") {
                	// alert(upbr.attr("nodeName"))
                	// console.log(upbr[0].clientHeight)
                	break
                	// return
            	}
                upbr.remove();
                upbr = upbd
            }
            
            if (uppa.attr("id") == "main_ok8s_body") {
                break
            }
            
            uppa = uppa.parent()
        }
    } else {
        var dnbr = p_obj.next();
        var dnbd;
        while (dnbr.length > 0) {
            dnbd = dnbr.next();
            dnbr.remove();
            dnbr = dnbd
        }
        var uppa = p_obj.parent();
        while (uppa.length > 0) {
            dnbr = uppa.next();
            while (dnbr.length > 0) {
                dnbd = dnbr.next();
                dnbr.remove();
                dnbr = dnbd
            }
            uppa = uppa.parent()
        }
    }
    if ($(".c7").length > 0) {
        $(".c7").removeClass("c7 pa5")
    }
    $("#ok8sedit").remove();
    $("#ok8sinput").remove()
}
function more_style() {
    var size = "";
    var color = "";
    for (var i = 0; i++; i <= 17) {
        color += ""
    }
    var htm = '<div class="cb n5"></div>';
    htm += '<div class="txt1 pa20">                <div class="txt1 c8 ra3 pa1"><div class="c3 ra3 pa2">' + '<div class="pa10 cb liti">字体大小</div>' + '<div class="k xn c4 r33 hh pa2" style="font-size:24px" data-h="text_style(\'text_style_size\',\'24\')">最大</div>' + '<div class="k xn c4 r33 hh" style="font-size:18px" data-h="text_style(\'text_style_size\',\'18\')">一般</div>' + '<div class="k xn c4 r33 hh" style="font-size:14px" data-h="text_style(\'text_style_size\',\'14\')">最小</div>' + '<div class="cb n5"></div></div></div>                <div class="cb n5"></div>             </div>';
    htm += '<div class="txt1 pa20">                <div class="txt1 c8 ra3 pa1"><div class="c3 ra3 pa2">' + '<div class="pa10 cb liti">字体颜色</div>' + '<div class="k xn r20" style="background-color: #000000" data-h="text_style(\'text_style_color\',\'#000000\')">&nbsp;</div>' + '<div class="k xn r20" style="background-color: #FF0000" data-h="text_style(\'text_style_color\',\'#FF0000\')">&nbsp;</div>' + '<div class="k xn r20" style="background-color: #FF00FF" data-h="text_style(\'text_style_color\',\'#FF00FF\')">&nbsp;</div>' + '<div class="k xn r20" style="background-color: #5B00AE" data-h="text_style(\'text_style_color\',\'#5B00AE\')">&nbsp;</div>' + '<div class="k xn r20" style="background-color: #0000C6" data-h="text_style(\'text_style_color\',\'#0000C6\')">&nbsp;</div>' + '<div class="k xn r20" style="background-color: #00CACA" data-h="text_style(\'text_style_color\',\'#00CACA\')">&nbsp;</div>' + '<div class="k xn r20" style="background-color: #00DB00" data-h="text_style(\'text_style_color\',\'#00DB00\')">&nbsp;</div>' + '<div class="k xn r20" style="background-color: #F9F900" data-h="text_style(\'text_style_color\',\'#F9F900\')">&nbsp;</div>' + '<div class="k xn r20" style="background-color: #984B4B" data-h="text_style(\'text_style_color\',\'#984B4B\')">&nbsp;</div>' + '<div class="k xn r20" style="background-color: #9F4D95" data-h="text_style(\'text_style_color\',\'#9F4D95\')">&nbsp;</div>' + '<div class="cb n5"></div></div></div>                <div class="cb n5"></div>             </div>';
    htm += '<div class="txt1 pa20">                <div class="txt1 c8 ra3 pa1"><div class="c3 ra3 pa2">' + '<div class="pa10 cb liti">对齐方式</div>' + "<div class=\"k xn c4 anl r33\"  data-h=\"text_style('text_style_align','left')\">居左对齐</div>" + "<div class=\"k xn c4 anc r33\" data-h=\"text_style('text_style_align','center')\">居中对齐</div>" + "<div class=\"k xn c4 anr r33\" data-h=\"text_style('text_style_align','right')\">居右对齐</div>" + '<div class="cb n5"></div></div></div>                <div class="cb n5"></div><div class="k xn c2 pa5 ra5 ma1 w120" data-h="showmodal(0)">确定</div>             </div>';
    $("#mymodal").html(htm);
    showmodal(1)
}
function changer_area_bydom(dom) {
    var st = $(dom).css("display");
    if (st == "block") {
        $(dom).css("display", "none")
    } else {
        $(dom).css("display", "block")
    }
}
function text_style(name, val) {
    k_obj.siblings(".k").css("border-color", "rgb(252, 248, 248)");
    k_obj.css("border-color", "rgb(192, 56, 56)");
    switch (name) {
    case "text_style_color":
        text_style_color = val;
        $("#ok8stxt").css("color", val);
        break;
    case "text_style_size":
        text_style_size = val;
        $("#ok8stxt").css("font-size", val);
        break;
    case "text_style_align":
        text_style_align = val;
        $("#ok8stxt").css("text-align", val);
        break
    }
}
function toad(x) {
    if ($("#mymodal").css("display") == "none") {
        k_obj = k_obj.parent();
        p_obj = k_obj;
        showedit("a")
    }
}
function upvideo() {
    var html = '<div class="txt1"><div class="tit1 h4">插入视频</div>  <div class="xn k c1 fr" data-h="showmodal(0)">返回</div> <div class="cb n5"></div>' + '<div class="txt1"><input id="videourl" type="text" class="inp pa10"/></div>' + '<div class="k w100 fr c6 xn" data-h="alert(\'请长按粘贴。\')">粘贴</div>' + '<div class="xn k c2 w100 fr" data-h="intovideo()">插入</div> </div>' + '<div class="txt1">请插入优酷，土豆，腾讯等网站的通用代码或者html代码。<hr>步骤：<br>1、在电脑上打开优酷视频，点开分享右边的箭头，复制通用代码<br>2、把代码发到手机上，比如发到手机QQ，再到手机上复制代码，粘贴到此处<br><hr>即将推出的企业版可以直接在电脑上操作</div>';
    $("#mymodal").html(html);
    showmodal(1)
}

	// var htm = '<audio autoplay="autoplay" preload="auto" loop="loop" src='+url+'></audio>'
function intovideo() {
    select_id = $("#bigger").val();
    select_id++;
    $("#bigger").val(select_id);
    // var url = $("#videourl").val();
    var url = $('#inputArea').val()
     if(url==undefined){
    	return
    }
    if (url.indexOf("http") == 0) {
        url = '<embed src="' + url + '" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>'
    }
    var html = '<div id="a' + select_id + '" class="txt1 pa20">' + url + "</div>";
    p_obj.after(html);
    if ($(".c7").length > 0) {
        $(".c7").removeClass("c7 pa5")
    }
    $("#ok8sedit").remove();
    $("#ok8sinput").remove();
    showmodal(0)
};


function videoTag(){
	select_id = $("#bigger").val();
    select_id++;
    $("#bigger").val(select_id);
    // var url = $("#videourl").val();
    var url = $('#videoInput').val()
     if(url==undefined){
    	return
    }
    if (url.indexOf("http") == 0) {
        url = '<source src="' + url + '"  >'
    }
    var html = '<video style="padding-top:20px" width="100%" controls="controls" preload="preload" id="a' + select_id + '" class="">' + url + "</video>";
    p_obj.after(html);
    if ($(".c7").length > 0) {
        $(".c7").removeClass("c7 pa5")
    }
    $("#ok8sedit").remove();
    $("#ok8sinput").remove();
    updateHtml()
    showmodal(0)
}

function addLink(){
	select_id = $("#bigger").val();
    select_id++;
    $("#bigger").val(select_id);
    // var url = $("#videourl").val();
    var url = $('#inputArea').val()
    if(url==undefined){
    	return
    }
    if(url.indexOf('http')==-1){
    	url = 'http://'+url
    }
    var html = '<a   id="a' + select_id + '" href="'+url+'"></a>';
    console.log(p_obj)
    p_obj.after(html);
    $('#a'+select_id).append(p_obj)
    // $('#a'+select_id).prev().remove()
    if ($(".c7").length > 0) {
        $(".c7").removeClass("c7 pa5")
    }
    $("#ok8sedit").remove();
    $("#ok8sinput").remove();
    showmodal(0)
}

function updateHtml(){
	var newHTML = $('#main_ok8s_body').html();
	if(htmlStatus.length==2){
		htmlStatus[0] = htmlStatus[1];
		htmlStatus[1] = newHTML;
	}else{
		htmlStatus.push(newHTML);
	}

	console.log(htmlStatus)
}

function upper(){
	// if(htmlStatus[0]==1){
		// swal('只能返回上一步');
		// return
	// }
	if($('#main_ok8s_body').html()==htmlStatus[1]){
		return
	}
	$('#main_ok8s_body').html(htmlStatus[0]);
	
	updateHtml()
}


function musicTag(){
	select_id = $("#bigger").val();
    select_id++;
    $("#bigger").val(select_id);
    // var url = $("#videourl").val();
    var url = $('#inputArea').val()
     if(url==undefined){
    	return
    }
    if (url.indexOf("http") == 0) {
        source = '<source src="' + url + '" >'
    }
    var html = '<audio hidden="hidden" autoplay="autoplay" loop="loop"  preload="preload" id="a' + select_id + '" class="">' + source + "</audio>";
    $('.musicDiv').html(html);
    if ($(".c7").length > 0) {
        $(".c7").removeClass("c7 pa5")
    }
    $("#ok8sedit").remove();
    $("#ok8sinput").remove();
    updateHtml()
    showmodal(0)
}

function goBack(){
	// alert("dfd")
	history.go(-1)
}

function test(){
	var hmlt = '<div class="complete"><div class="comLeft vertivalStyle">ok&nbsp;完成</div><div class="comMiddle vertivalStyle"></div><div class="comRight vertivalStyle xn" data-h="goBack()"><img class="backIcon" src="images/11.png"/><span class="backTxt" >&nbsp;返回</span></div></div>'
}
