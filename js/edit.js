var pageNo = 0;
$(function() {
	addEvent();
	getHistoryParam();
})

// 去编辑
var goEdit = function() {
	var paraLink = $('#adsLink').val().trim();
	console.log(typeof(paraLink))
	if (paraLink == '') {
		swal("请输入链接")
		return
	} else {
		form = $("<form></form>")
		form.attr('action', "http://zhijian88.com.cn:8100/edit/edit_article")
		form.attr('method', 'post')
		var urlInput = $("<input type='hidden' name='url' />")
		urlInput.attr('value', paraLink)
		form.append(urlInput);
		form.appendTo("body")
		form.css('display', 'none')
		form.submit();
	}
}

// 获取历史文章
var getHistoryParam = function() {
	
	$.ajax({
		type: "get",
		url: "http://zhijian88.com.cn:8100/article/jsonp/list_article_metas?pagesize=10&pageno=" + pageNo,
		dataType: 'jsonp',
		jsonp: 'callback',
		success: function(res) {
			pageNo++;
			console.log(res.value.article_metas);
			var datas = res.value.article_metas;
			if (datas.length == 0) {
				if (pageNo > 1) {
					$('.showMore').text('没有更多了')
					return
				} 
				// else {
					// $('.noneAds').show();
					// $('.showMore').hide()
				// }

			}
			for (var i in datas) {
				var html1 = '<div class="publishItem">'+
				'<div class="itemTop">'+
					'<div class="adsTitleImg vertivalStyle">'+
						'<img src="images/toutiao.jpg" />'+
					'</div>'+

					'<div class="adsTitle vertivalStyle">'+
						''+datas[i].title+''+
					'</div>'+
				'</div>'+

				'<div class="newLine"></div>'+

				'<div class="time">'+
				
					'<span>'+datas[i].str_create_time+'</span><br>'+
					'<span style="color:#fcaf2a">转发300</span>&nbsp;<span style="color:#fcaf2a">浏览300</span>'+
				'</div>'+

				'<div class="btns">'+
					'<a href="http://zhijian88.com.cn:8100/edit/reedit_article?article_id='+datas[i].article_id+'"><div class="editBtn btnStyle">'+
						'编辑'+
					'</div></a>'+

					'<div class="shareBtn btnStyle">'+
						'分享'+
					'</div>'+
				'</div>'+

				'<div class="delImgCtx" article_id="'+datas[i].article_id+'" onclick="delPara(this)">'+
					'<div class="delBtn">'+
						'×'+
					'</div>'+
				'</div>'+
			'</div>'

				
				$('.showMore').before(html1)

			}

			// addDnymicEvent()

		},
		error: function(res) {
			console.log(res)
		}
	});
}

// 删除文章

var delPara = function(t){
	var _self = t;
	var ele = _self.getAttribute('article_id');
	var id = ele;
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
					url: "http://zhijian88.com.cn:8100/article/jsonp/remove_article?article_id="+id,
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function(res) {
						if (res.success) {
							swal("删除成功", "", "success");
							console.log(res)
							$(_self).parent().remove();
							console.log(_self)
						}
					},
					error: function(err) {
						console.log(err)
					}
				});
			}

		});
}

// 点击效果
var addEvent = function() {
	// tab效果
	$('.clickFlag').click(function() {
		$('.clickFlag').removeClass('headerActive')
		$(this).addClass('headerActive')
		if ($(this).attr('class').indexOf('headLeft') > -1) {
			$('.historyPublishTab').hide();
			$('.editTab').show()
		} else if ($(this).attr('class').indexOf('headRight') > -1) {
			$('.editTab').hide();
			$('.historyPublishTab').show()
		}
	})

	// 广告删除按钮  删除当前广告  并请求接口
	$('.delImgCtx').click(function() {
		$('.publishItem').remove()
	})

	// 编辑按钮事件，并请求接口
	$('.editBtn').click(function() {
		$('.clickFlag').removeClass('headerActive')
		$('.headLeft').addClass('headerActive')
		$('.historyPublishTab').hide();
		$('.editTab').show();
	})
	
	// 筛选点击效果
	$('.liClick').click(function(){
		$('.liClick').removeClass('activeClick')
		$(this).addClass('activeClick')
	})
}

// 清除按钮
var clearVal = function() {
	$('#' + arguments[0]).val('');
}