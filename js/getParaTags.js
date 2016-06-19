// 获取网页全部标签文本和img
var desc,imageUrl,title;
function getALLTagsTxtAndImg() {
	var text = '';
	var imgFlag = true;
	var tags = $('#main_ok8s_body').find('*');
	for (var i = 0; i < tags.length; i++) {
		var _self = $(tags[i])
		if (_self[0].nodeName.toLowerCase() == 'title') {
			title = _self.text();
		} else if (_self.css('display') == 'none') {
			_self.remove();
			getALLTagsTxtAndImg();
			return
		} else {
			var selfTags = $(_self).find('*');
			if (selfTags.length == 0) {
				text += _self.text()
			}
			
			if (_self[0].nodeName.toLowerCase() == 'img' && imgFlag) {
					if (_self.attr('src') != '') {
						imageUrl = _self.attr('src');
						imgFlag = false
					}
			}
		}
	}
	desc = text.replace(/\s/g, '').slice(0, 10) + '...'
}
getALLTagsTxtAndImg()
isPlay = false;

function startMusic() {
	if (isPlay) {
		musicPlay();
	} else {
		musicPause();
	}
}
//play
function musicPlay() {
	$('#myMusic').trigger('play');
	$('#myMusic')[0].volume = .5;
	$('#myMusic')[0].preload = true;
	$('#myMusic')[0].loop = true;
	$('#bg_music').css('display', 'block');
	$('#controlBgMusic').addClass('rotate');
	isPlay = false;
}
//pause
function musicPause() {
	$('#myMusic').trigger('pause');
	$('#controlBgMusic').removeClass('rotate');
	isPlay = true
}

// a标签跳转
function aTagJump(url) {
	if (!editStatus) {
		window.location.href = url
	}

}

musicPlay()