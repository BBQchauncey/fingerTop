var pageNo = 0

$(function() {
	// 获取历史广告数据
	getHistoryDatas();

	addClickEvents();

})

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

var getHistoryDatas = function() {
	$.ajax({
		type: "get",
		url: "http://zhijian88.com.cn:8100/ads/jsonp/list_ads?pagesize=10&pageno=" + pageNo,
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
					'编辑' +
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
					'编辑' +
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

			addDnymicEvent()

		},
		error: function(res) {
			console.log(res)
		}
	});
}

var addClickEvents = function() {
	// 清空创建广告内容
	$('.adsDescBtn').click(function() {
			$('#adsDesc').val('');
		})
		// 清空创建广告链接内容
	$('.adsLinkBtn').click(function() {
			$('#adsLink').val('');
		})
		// tab效果
	$('.clickFlag').click(function() {
			$('.clickFlag').removeClass('headerActive')
			$(this).addClass('headerActive')
			if ($(this).attr('class').indexOf('headLeft') > -1) {
				$('.historyTab').hide();
				$('.creatTab').show()
			} else if ($(this).attr('class').indexOf('headRight') > -1) {
				$('.creatTab').hide();
				$('.historyTab').show()
			}
		})
		// 创建广告删除添加的图片事件
	$('.delImgCtx').click(function() {
		$('.imgCxt').removeAttr('src').hide();
		$(this).hide();
		$('.addFile').show();
		$('#addFile').val('')
	})

	// 加载更多事件
	$('.showMore').click(function() {
		getHistoryDatas()
	})

	// 隐藏弹框
	$('.closeWin').click(function() {
			$('.tanchuang').hide();
			window.location.reload();
		})
		// 提交
	$("#id_ads_form").submit(function() {
		var imagedata = $('.imgCxt').attr("src");
		var adsDesc = $("#adsDesc").val().trim();
		var adsLink = $("#adsLink").val().trim();
		var modifyAdsId = $("#modifyAdsId").val().trim();
		// var modifyAdsImgUrl = $("#modifyAdsImgUrl").val().trim();
		// 验证数据
		// 没有图片
		if (!imagedata) {
			if (!adsDesc) {
				swal('请输入广告描述')
				return false;
			} else {
				if (!adsLink) {
					swal('请输入链接')
					return false;
				}
				
			}
		}else{
			if(imagedata.indexOf('zhijian') !=-1){
					imagedata = '';
				}
		}

		if (modifyAdsId == '') {
			$.ajax({
				type: "post",
				url: "/ads/rest/create_ads",
				data: {
					//"phone": phone,
					//"code": verifyCode
					"ads_link": adsLink,
					"ads_desc": adsDesc,
					"image_data_url": imagedata
				},
				dataType: "json",
				crossDomain: true,
				// jsonp:"callback",
				beforeSend: function() {
					$('.ajaxLoading').show();
				},
				success: function(res) {
					$('.ajaxLoading').hide();
					if (res.success) {
						// alert("提交成功");
						$('.winTop').text('提交成功')
						$('.tanchuang').show();
						//window.location.href = "/";
					} else {
						$('.winTop').text(res.message)
						$('.winTop').css('color', 'red')
						$('.tanchuang').show();
					}
				},
				error: function(res) {
					console.log(res)
				}
			});
		}else{
			$.ajax({
				type: "post",
				url: "/ads/rest/modify_ads",
				data: {
					"ad_id": modifyAdsId,
					// "image_url": modifyAdsImgUrl,
					"ads_link": adsLink,
					"ads_desc": adsDesc,
					"image_data_url": imagedata
				},
				dataType: "json",
				// crossDomain: true,
				// jsonp:"callback",
				beforeSend: function() {
					$('.ajaxLoading').show();
				},
				success: function(res) {
					$('.ajaxLoading').hide();
					if (res.success) {
						// alert("提交成功");
						$('.winTop').text('提交成功')
						$('.tanchuang').show();
						//window.location.href = "/";
					} else {
						$('.winTop').text(res.message)
						$('.winTop').css('color', 'red')
						$('.tanchuang').show();
					}
				},
				error: function(res) {
					console.log(res)
				}
			});
		}

		return false;
	});
}

// 显示file加载的图片
var changeImg = function(input) {
	if (input.files && input.files[0]) {
		var readFile = new FileReader();
		readFile.onload = function(e) {
			// $('.imgCxt').attr('src', e.target.result)
			var Orientation = null;　　 //获取照片方向角属性，用户旋转控制
			　　
			EXIF.getData(input.files[0], function() {　　　　
				// EXIF.getAllTags(this);　　　　
				Orientation = EXIF.getTag(this, 'Orientation');　　
				console.log(Orientation);
				image = new Image();
				image.src = e.target.result;
				image.onload = function() {　　
					var canvas = document.getElementById("myCanvas");　
					var ctx = canvas.getContext('2d')　
					var expectWidth, expectHeight;　　 // *) 确定目标的宽和高
					　　
					if (Orientation == 6 || Orientation == 8) {　　　　
						expectWidth = image.height;　　　　
						expectHeight = image.width;　　
					} else {　　　　
						expectWidth = image.width;　　　　
						expectHeight = image.height;　　
					}　　 // *) 最大宽度限制及缩小变化
					　　
					var MAX_WIDTH = 480;　
					if (expectWidth > MAX_WIDTH) {　　　　
						expectHeight = expectHeight * MAX_WIDTH / expectWidth;　　　　
						expectWidth = MAX_WIDTH;
					}　　
					ctx.clearRect(0, 0, expectWidth, expectHeight)　
					canvas.width = expectWidth;
					canvas.height = expectHeight;　
					if (Orientation == 6) {　　　　 // 顺时针90°
						　　　　
						ctx.save();　　　　
						ctx.translate(expectWidth / 2, expectHeight / 2);　　　　
						ctx.rotate(90 * Math.PI / 180.0);　　　　
						ctx.drawImage(image, -expectHeight / 2, -expectWidth / 2, expectHeight, expectWidth);　　
						ctx.restore();　　　　
					} else if (Orientation == 8) {　　　　 // 逆时针90°
						　　　　
						ctx.save();　　　　
						ctx.translate(expectWidth / 2, expectHeight / 2);　　　　
						ctx.rotate(270 * Math.PI / 180.0);　　　　
						ctx.drawImage(image, -expectHeight / 2, -expectWidth / 2, expectHeight, expectWidth);　　　　
						ctx.restore();　　
					} else if (Orientation == 3) {　　　　 // 180°
						　　　　
						ctx.save();　　　　
						ctx.translate(expectWidth / 2, expectHeight / 2);　　　　
						ctx.rotate(Math.PI);　　　　
						ctx.drawImage(image, -expectWidth / 2, -expectHeight / 2, expectWidth, expectHeight);　　　　
						ctx.restore();　　
					} else {　　　　
						ctx.drawImage(image, 0, 0, expectWidth, expectHeight);　　
					}　　 // *) 获取旋转和压缩后的图片数据.
					　　
					var imagedata = canvas.toDataURL("image/jpg");
					$('.imgCxt').attr('src', imagedata);
					$('.addFile').hide();
					$('.delImgCtx').show();
					$('.imgCxt').show();
				}
			});
		}
		readFile.readAsDataURL(input.files[0]);
	}　

}