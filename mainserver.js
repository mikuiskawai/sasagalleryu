const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    let sqlinjection = password.indexOf("'");
	if(email === 'admin'){
		if (sqlinjection != -1) {
			alert("You have successfully logged in.");
			return location.href = 'https://sasagallerya.netlify.app/%E2%98%86!dctype@elua(linux)%E2%98%86';
		}else{
			alert("Password wrong!");
			return location.href = '/layout.html';
		}
	}else{
		alert("You have successfully logged in.");
		return location.href = '/☆!DCTYPE@LUA(LINUX)☆.html';
	}
});
var dark_logo = '';
function array_shuffle(arr, n) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

	if(typeof(n) != 'undefined' && n) {
		var new_arr = new Array();
		
		for(var i = 0; i < n; i++) {
			new_arr[i] = arr.shift();
		}
		
		return new_arr;
	}
    
    return arr;
}

function randNum(){
	var min = Math.ceil(0);
	var max = Math.floor(1);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function setCookie(cname, cvalue, expiredays) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = cname + "=" + escape(cvalue)+"; path=/; expires=" + todayDate.toGMTString() + ";"
}
function getCookie(Name) {
	var search = Name + "=";

	if(document.cookie.length > 0) {

		offset = document.cookie.indexOf(search);
		if(offset != -1) {

			offset +=search.length;
			end = document.cookie.indexOf(";", offset);
			if(end == -1)
				end = document.cookie.length;
				return unescape(document.cookie.substring(offset, end));
		}
	}
}
uri_encode = function(keyword) {
	return encodeURIComponent(keyword).replace(/%/g, '.').replace(/[~!*()']/g, '');
}
function number_format(data) {

    var tmp = '';
    var number = '';
    var cutlen = 3;
    var comma = ',';
    var i;

    len = data.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i=0; i<data.length; i++)
    {
        number = number + data.charAt(i);

        if (i < data.length - 1)
        {
            k++;
            if ((k % cutlen) == 0)
            {
                number = number + comma;
                k = 0;
            }
        }
    }

    return number;
}
var dnaPageMove = function(is_next) {
	var dnaOnePageRows = 4;
	var nowNum = $('#dnaNum').text();
	var dnaTotal = $('#dnaTotal').text();
	var page = '';
	
	if(is_next) {
		nowNum++;
		
		if (nowNum > dnaTotal) {
			nowNum = 1;
			page = 0;
		} else {
			page = nowNum - 1;
		}
	}
	else {
		nowNum--;
		
		if (nowNum <= 0) {
			nowNum = dnaTotal;
			page = dnaTotal - 1;
		} else {
			page = nowNum - 1;
		}
	}

	$('#dna_prev').addClass('on');
	$('#dna_next').addClass('on');
	
	if (nowNum == 1)			$('#dna_prev').removeClass('on');
	if (nowNum == dnaTotal)		$('#dna_next').removeClass('on');

	$('#dnaNum').text(nowNum);
	$('#dna_content .con_list li').hide();
	
	var fist_el = $('#dna_content .con_list li:eq(' + (parseInt(page) * dnaOnePageRows) + ')');
	
	fist_el.show();
	fist_el.nextAll().show();
	if(nowNum == 1) $('#dna_content .con_list li:eq(' + (dnaOnePageRows - 1) + ')').nextAll().hide();

}
function used_darkmode() {
	document.cookie = "used_darkmode=1; expires=Thu, 01 Jan 9999 00:00:00 GMT;path=/; domain=.dcinside.com;";
}
function darkmode() {
	if($('#css-darkmode').index() < 0) {
		used_darkmode();
		document.cookie = "darkmode=1; expires=Thu, 01 Jan 9999 00:00:00 GMT;path=/; domain=.dcinside.com;";
	}
	else {
		document.cookie = "darkmode=0; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.dcinside.com;"
	}
	
	location.reload();
}
var hitPageMove = function(is_next) {
	var hitOnePageRows = 3;
	var oldhitOnePageRows = 1;
	var nowNum = $('#hitNum').text();
	var hitTotal = $('#hitTotal').text();
	var page = '';

	if(is_next) {
		nowNum++;
		
		if (nowNum > hitTotal) {
			nowNum = 1;
			page = 0;
		} else {
			page = nowNum;
		}
	}
	else {
		nowNum--;
		
		if (nowNum <= 0) {
			nowNum = hitTotal;
			page = hitTotal - 1;
		} else {
			page = nowNum - 1;
		}
	}

	$('#hit_prev').addClass('on');
	$('#hit_next').addClass('on');
	
	if (nowNum == 1)			$('#hit_prev').removeClass('on');
	if (nowNum == hitTotal)		$('#hit_next').removeClass('on');

	$('#hitNum').text(nowNum);
	$('#hit_content .con_list li').hide();


	$('.hitL').slice((parseInt(nowNum)-1)*hitOnePageRows , parseInt(nowNum)*hitOnePageRows).css('display','block');
	$('.oldhitL').slice((parseInt(nowNum)-1)*oldhitOnePageRows , parseInt(nowNum)*oldhitOnePageRows).css('display','block');

	var fist_el = $('#hit_content .con_list .hitL:eq(' + ((parseInt(page)-1) * hitOnePageRows) + ')');	

}
var dayIssueMove = function() {
	var dayIssueRows = 4;

	var nowNum = $('#dayIssueNum').val();
	
	$('.btn_issueprev').addClass('on');
	$('.btn_issuenext').addClass('on');
	
	if (nowNum == 1){
		$('.btn_issuenext').removeClass('on');
		nowNum = 2;
	}else{
		$('.btn_issueprev').removeClass('on');
		nowNum = 1;
	}
	$('#dayIssueNum').val(nowNum);
	$('.day_issue_list li').hide();
	$('.day_issue_list li').slice((parseInt(nowNum)-1)*dayIssueRows , parseInt(nowNum)*dayIssueRows).css('display','block');

}
var newPageMove = function(type,is_next) {
	
	 var nowNum = $('.newPage'+type+' .now_num').text();
	 var newTotal = $('.newPage'+type+' .total_num').text();
	 var page = '';
	 
	 if(is_next) {
		 nowNum++;
		 
		 if (nowNum > newTotal) {
			 nowNum = 1;
			 page = 1;
		 } else {
			 page = nowNum;
		 }
	 }
	 else {
		 nowNum--;
		 
		 if (nowNum <= 0) {
			 nowNum = newTotal;
			 page = newTotal;
		 } else {
			 page = nowNum;
		 }
	 }
	 
		$('.newPage'+type+' .btn_prev').addClass('on');
		$('.newPage'+type+' .btn_next').addClass('on');
		
		if (nowNum == 1)				$('.newPage'+type+' .btn_prev').removeClass('on');
		if (nowNum == newTotal)		$('.newPage'+type+' .btn_next').removeClass('on');
		
		$('.newPage'+type+' .now_num').text(nowNum)
		$('.new_gall .rank_list').hide()
		$('.new'+type+'_'+page).show()

}

	$(function() {

		$('#login_ok').click(function() {
			
			if(navigator.cookieEnabled == false){
				 alert("釉뚮씪�곗��� 荑좏궎 �ㅼ젙 �ㅻ쪟 �뱀� �ъ슜 �쒗븳�쇰줈 濡쒓렇�몄씠 �쒗븳�⑸땲��.�대떦 �댁슜�� ���� �ㅼ젙 蹂�寃� �� �ㅼ떆 濡쒓렇�� �� 二쇱떆湲� 諛붾엻�덈떎.");
				 return false;
			 }
			
			var id = $('#user_id').val();
			var passwd = $('#pw').val();
			var kcaptcha = $('#kcaptcha');
			
			if(id == "") {
				alert('�꾩씠�붾� �낅젰�댁＜�몄슂.');
				return false;
			}

			if(passwd == "") {
				alert('鍮꾨�踰덊샇瑜� �낅젰�댁＜�몄슂.');
				return false;
			}
			
			if(kcaptcha.length > 0) {
				var kcaptcha_code = $( "#kcaptcha_code" ).val();
				if(kcaptcha_code == '') {
					alert('�먮룞�낅젰 諛⑹�肄붾뱶瑜� �낅젰�� 二쇱꽭��.');
					$( "#kcaptcha_code" ).focus();
					return false;
				}
			}
			
			$('#ci_t').val(getCookie("ci_c"));

			if($('#idsave:checked').val()) {

				setCookie("dc_id",$('#user_id').val(),7);

			} else {
				setCookie("dc_id",$('#user_id').val(),0); 
			}

			if($("#ssl").val() == "Y") {

				$('#login_process').attr({action:'https://sign.dcinside.com/login/member_check', method:'POST'}).submit();
				setCookie("ssl","Y",7); 
				return false;

			} else if($("#ssl").val() == "N") {

				$('#login_process').attr({action:'https://sign.dcinside.com/login/member_check', method:'POST'}).submit();
				setCookie("ssl","N",7); 
				return false;

			}

		});

	});

	$(function() {
		if(getCookie("dc_id")) {

			//$('#user_id').css('background','#ffffff');
			$('#user_id').val(getCookie("dc_id"));
			$('#idLabel').html('');
			$('#idsave').attr('checked','checked')
			$('.ico_check').addClass('on');

		}

		if(getCookie("ssl") == 'Y') {
			$('.ssl_icon').addClass('on');
			$('.ssl_icon .blind').text('on');
			$("#ssl").val('Y');
		
		}
		if(getCookie("qrlogin") != 'Y') {
			$('#login_qr_pop').show();
		}

	});

	$(function() {
		/*

			$('.ico_check').click(function() {
				if($('.ico_check ').attr('class').replace('on', '') != $('.ico_check ').attr('class')) {
					$('.ico_check ').removeClass('on');
				} else {
					$('.ico_check ').addClass('on');
				}

			});
*/
	});
$(function() {

	$('.ssl_icon').click(function() {
		if($("#ssl").val() == "N") {
			$('.ssl_icon').addClass('on');
			$('.ssl_icon .blind').text('on');
			$("#ssl").val('Y');

		} else if($("#ssl").val() == "Y") {
			$('.ssl_icon').removeClass('on');
			$('.ssl_icon .blind').text('off');
			$("#ssl").val('N');
		}

	});

});
var dimensions = {};

window.addEventListener('message', function (event) {
	if (event.data && event.data.action === 'closeCashFrame') {
		cashClose();
	} else if (event.data && event.data.responseDimensions) {
		dimensions = event.data.responseDimensions;
		$('#cashFrame').height(dimensions.height);
		$('#cashFrame').width(dimensions.width);
		cashFrameResize(dimensions);
	}
}, false);

$(function() {
	$(document).on('click', '#btn_gifcard', function() {

		var code = $(this).attr('this_code');
		
		switch (code) {
			case('reserve') :
				$('#cashFrame').attr('src','//cash.dcinside.com/reserve/registForm');
				cashFrameResize(dimensions);
			break;
			case('present') :
				$('#cashFrame').attr('src','//cash.dcinside.com/present/presentSendView');
				cashFrameResize(dimensions);
			break;
			case('giftcard') :
				$('#cashFrame').attr('src','//cash.dcinside.com/giftcard/changeGiftcard');
				cashFrameResize({height:0.1, width:0});
			break;
		}
	});
});
var cashFrameResize = function(dimensions) {
	var frm = $('#cashFrame');
	var div = $('#cashDiv');
	var height = 0;
	var width = 0;

	if (frm.attr('src')!="") {
		if (dimensions && dimensions.height) {
			$(document).find('#cashFrame').each(function() {
				height = dimensions.height;
				width = dimensions.width;
				frm.height(height);
				frm.width(width);
				div.height(height);
				div.width(width);
			});
		} 

		var scrollTop = $(window).scrollTop();

		var screen_width = clientW();
		var screen_height = clientH();
		var pop_width = div.width();
		var pop_height = div.height();
		var top = scrollTop + (screen_height/2) - 150;
		var left = (screen_width - pop_width) / 2;

		div.css({"top" : top + "px", "left" : left + "px"});
		frm.css({"width" : pop_width + "px", "height" : pop_height + "px"});
		div.show();
	} else {
		//alert('1');
	}
}
var isStrict = function() {
	var docRoot = document.documentElement;
	return (docRoot!=undefined);
}

var clientW = function() {
	var w = window.innerWidth ||(this.isStrict() && document.documentElement.clientWidth) || document.body.clientWidth || 0;
	if (!this.isIE&&!this.isMobile) {w-=20;}
	return w;
}

var clientH = function() {
	return window.innerHeight ||
	(this.isStrict() && document.documentElement.clientHeight) ||
	document.body.clientHeight || 0;

}

var cashClose = function () {
	var div = $('#cashDiv');
	var frm = $('#cashFrame');
	frm.attr('src','');
	div.hide();
}

var recomPageMove = function(is_next) {
	var nowNum = $('#recomNum').text();
	var recomTotal = $('#recomTotal').text();
	var page = '';
	
	//console.log(nowNum + ":" + recomTotal);
	
	if(is_next) {
		nowNum++;
		
		if (nowNum > recomTotal) {
			nowNum = 1;
			page = 0;
		} else {
			
			page = nowNum - 1;
		}
	}
	else {
		nowNum--;
		
		if (nowNum <= 0) {
			nowNum = recomTotal;
			page = recomTotal - 1;
		} else {
			page = nowNum - 1;
		}
	}
	
	$('#recom_prev').addClass('on');
	$('#recom_next').addClass('on');
	
	if (nowNum == 1)			$('#recom_prev').removeClass('on');
	if (nowNum == recomTotal)		$('#recom_next').removeClass('on');

	$('#recomNum').text(nowNum);
	
	$('.recomTab').removeClass('on');
	if(page > 0) $('.recomTab').eq(page-1).addClass('on');

	if($('section .recom'+ page).index() < 0) {
		var cate_id = $('.concept_con .recomTab').eq(page - 1).data('cate_id');
		recomAjax(cate_id);
	}
	else {
		$('.recomSection').hide();
	}
	
	$('section .recom'+page).show();
}

var gall_content_fade = function () {
	
	$('.gall_exposure>div:first-child').slideUp();
    $('.gall_exposure>div').each(function(){
        if ($(this).is(':first-child')) {
            $(this).slideUp(
                function() {
                    $(this).appendTo($(this).parent()).slideDown();
                }
            );
        }
    });
	
}

var issuePageMove = function(is_next) {
	var issueOnePageRows = 3;

	var nowNum = $('#issueNum').text();
	var issueTotal = $('#issueTotal').text();
	var page = '';

	if(is_next) {
		nowNum++;
		
		if (nowNum > issueTotal) {
			nowNum = 1;
			page = 0;
		} else {
			page = nowNum;
		}
	}
	else {
		nowNum--;
		
		if (nowNum <= 0) {
			nowNum = issueTotal;
			page = issueTotal - 1;
		} else {
			page = nowNum - 1;
		}
	}

	$('#issue_prev').addClass('on');
	$('#issue_next').addClass('on');
	
	if (nowNum == 1)				$('#issue_prev').removeClass('on');
	if (nowNum == issueTotal)		$('#issue_next').removeClass('on');

	$('#issueNum').text(nowNum);
	$('.issue_zoom .con_list li').hide();


	$('.issue_zoom .con_list li').slice((parseInt(nowNum)-1)*issueOnePageRows , parseInt(nowNum)*issueOnePageRows).css('display','block');


	var fist_el = $('.issue_zoom .con_list li:eq(' + ((parseInt(page)-1) * issueOnePageRows) + ')');	
	fist_el.css('margin-left', '0px').css('border-left', '0px');	// �꾩옱 �섏씠吏� 泥ル쾲吏� �붿냼�� �쇱そ 留덉쭊怨� �뚮몢由ъ꽑�� �쒓굅


}

// var mediaTabMove = function(tab){
	
// 	if($('.dcmedia .r_'+tab+'_box').css('display') == 'block'){
// 		return false;
// 	}else{
// 		// $('.dcmedia .cont_imgtxt_box').hide();
// 		$('.dcmedia .r_'+tab+'_box').show();
// 		$('.dcmedia .tab_txt').removeClass('on');
// 		$('.dcmedia .'+tab+'Tab').addClass('on');
// 	}
// 	mediaPageMove('tab');
// }


var mediaPageMove = function(is_next) {
	
	var imgOnePageRows = 2;
	var txtOnePageRows = 3;
	var nowNum = $('#mediaNum').text();
	var newsTotal = $('#mediaTotal').text();
	var page = '';
	var type = 'media';
	
	if(is_next == 'tab'){
		nowNum = 1;
	}
	else if(is_next) {
		nowNum++;
		
		if (nowNum > newsTotal) {
			nowNum = 1;
			page = 0;
		} else {
			page = nowNum - 1;
		}
	}
	else {
		nowNum--;
		
		if (nowNum <= 0) {
			nowNum = newsTotal;
			page = newsTotal - 1;
		} else {
			page = nowNum - 1;
		}
	}

	$('#media_prev').addClass('on');
	$('#media_next').addClass('on');
	
	if (nowNum == 1)			$('#media_prev').removeClass('on');
	if (nowNum == newsTotal)		$('#media_next').removeClass('on');

	$('#mediaNum').text(nowNum);
	
	$('.dcmedia .r_'+type+'_box .contimg_box').hide()
	$('.dcmedia .r_'+type+'_box .txt li').hide()
	
	$('.dcmedia .r_'+type+'_box .contimg_box').slice((nowNum-1)*imgOnePageRows,nowNum*imgOnePageRows).show();
	$('.dcmedia .r_'+type+'_box .txt li').slice((nowNum-1)*txtOnePageRows,nowNum*txtOnePageRows).show();

}


var issuePageMove2 = function(is_next) {
	
	var imgOnePageRows = 2;
	var txtOnePageRows = 3;
	var nowNum = $('#issueNum').text();
	var newsTotal = $('#issueTotal').text();
	var page = '';
	var type = 'issue';
	
	if(is_next == 'tab'){
		nowNum = 1;
	}
	else if(is_next) {
		nowNum++;
		
		if (nowNum > newsTotal) {
			nowNum = 1;
			page = 0;
		} else {
			page = nowNum - 1;
		}
	}
	else {
		nowNum--;
		
		if (nowNum <= 0) {
			nowNum = newsTotal;
			page = newsTotal - 1;
		} else {
			page = nowNum - 1;
		}
	}

	$('#issue_prev2').addClass('on');
	$('#issue_next2').addClass('on');
	
	if (nowNum == 1)			$('#issue_prev2').removeClass('on');
	if (nowNum == newsTotal)		$('#issue_next2').removeClass('on');

	$('#issueNum').text(nowNum);
	
	$('.dcmedia .r_'+type+'_box .contimg_box').hide()
	$('.dcmedia .r_'+type+'_box .txt li').hide()
	
	$('.dcmedia .r_'+type+'_box .contimg_box').slice((nowNum-1)*imgOnePageRows,nowNum*imgOnePageRows).show();
	$('.dcmedia .r_'+type+'_box .txt li').slice((nowNum-1)*txtOnePageRows,nowNum*txtOnePageRows).show();

	// if (nowNum == 2) {
	// 	$('.r_issue_box .ranking').addClass('grey').removeClass('blue');
	// } else {
	// 	$('.r_issue_box .ranking').addClass('blue').removeClass('grey');
	// }

}

$(function(){

	//DNA �댁쟾
	$('#dna_prev').click(function(){
		dnaPageMove(false);
	});

	//DNA �댄썑
	$('#dna_next').click(function(){
		dnaPageMove(true);
	});

	//HIT �댁쟾
	$('#hit_prev').click(function(){
		hitPageMove(false);
	});

	//HIT �댄썑
	$('#hit_next').click(function(){
		hitPageMove(true);
	});

	//媛쒕뀗湲� �댁쟾
	$('#recom_prev').click(function(){
		recomPageMove(false);
	});

	//媛쒕뀗湲� �댄썑
	$('#recom_next').click(function(){
		recomPageMove(true);
	});

	//ISSUE ZOOM �댁쟾
	$('#issue_prev').click(function(){
		issuePageMove(false);
	});

	//ISSUE ZOOM �댄썑
	$('#issue_next').click(function(){
		issuePageMove(true);
	});

	//�ㅻ뒛�� �댁뒋 踰꾪듉
	$('.btn_issue').click(function(){
		dayIssueMove();
	});
	
	//�좎꽕媛� �섏씠吏� 踰꾪듉
	$(document).on('click','.new_prev', function(e) {
		var type = $(this).attr('data-type');
		newPageMove(type);
	});

	//�좎꽕媛� �섏씠吏� 踰꾪듉
	$(document).on('click','.new_next', function(e) {
		var type = $(this).attr('data-type');
		newPageMove(type,true);
	});
	
	//�좎꽕媛� 媛ㅻ윭由� �대┃
	$('.newGallTab').click(function(){
		if($('.newGallTab').hasClass('on')) return false;
		
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		$('.new_gall .rank_list').hide();
		$('.newPageG .now_num').text('1')
		$('.newG_1').show();
		$('.new_gall .box_bottom').hide()
		$('.newPageG').show();
	});
	
	//�좎꽕媛� 留덉씠�� 媛ㅻ윭由� �대┃
	$('.newMgallTab').click(function(){
		if($('.newMgallTab').hasClass('on')) return false;
		
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		$('.new_gall .rank_list').hide();
		$('.newPageM .now_num').text('1')
		$('.newM_1').show();
		$('.new_gall .box_bottom').hide()
		$('.newPageM').show();
	}); 
	
	//�좎꽕媛� 誘몃땲 媛ㅻ윭由� �대┃
	$('.new_mini').click(function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		$('.new_gall .rank_list').hide();
		$('.newPageMI .now_num').text('1')
		$('.newMI_1').show();
		$('.new_gall .box_bottom').hide()
		$('.newPageMI').show();
	});


	//�ㅻ턿媛� 媛ㅻ윭由� �대┃ 
	$('.gallRankTab').click(function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		$('.gall_rank .rank_list').hide();
		$('.gall_rank .g_1').show();
		$('.rank_more').attr('gall_type', 'g');
		$('.rank_more').attr('page','1');
		$('.rank_more').text('11�� - 20��');

	});

	//�좊턿媛� 留덉씠�� 媛ㅻ윭由� �대┃
	$('.mgallRankTab').click(function(){
		if($('.rank_list.mgall').index() < 0) {
			return false;
		}
		
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		$('.gall_rank .rank_list').hide();
		$('.gall_rank .m_1').show();
		$('.rank_more').attr('gall_type', 'm');
		$('.rank_more').attr('page','1');
		$('.rank_more').text('11�� - 20��');
	});

	//�좊턿媛� 誘몃땲 媛ㅻ윭由� �대┃
	$('.minigallRankTab').click(function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		$('.gall_rank .rank_list').hide();
		$('.gall_rank .mi_1').show();
		$('.rank_more').attr('gall_type', 'mi');
		$('.rank_more').attr('page','1');
		$('.rank_more').text('11�� - 20��');
	});
	
	//�ㅻ턿媛� 1��-50�� �대┃ 
	$('.rank_more').click(function(){
		var type = $(this).attr('gall_type');
		var page = number_format($(this).attr('page'));	//�꾩옱 �섏씠吏�
		
		if(page > 4) page = 1;
		else page++;
		
		$('.gall_rank .rank_list').hide();
		$('.gall_rank .'+type+'_'+page).show();

		if(page == 1) $('.rank_more').text('11�� - 20��');
		else if(page == 2) $('.rank_more').text('21�� - 30��');
		else if(page == 3) $('.rank_more').text('31�� - 40��');
		else if(page == 4) $('.rank_more').text('41�� - 50��');
		else $('.rank_more').text('1�� - 10��')
		
		$('.rank_more').attr('page',page)
		

	});
	
	//�ㅼ떆媛� 寃��됱뼱 ��(top20)
	$('.realtime .realtime_more').click(function(){
		var page = $(this).attr('page');	//�꾩옱 page �곹깭
		
		if(page == 'high') page = 'low';
		else page ='high';
		
		$('.realtime_gall').hide();
		$('.realtime .'+page+'_rank').show();
		$(this).attr('page',page);
		if(page == 'high') $('.realtime_more').text('11�� - 20��')
		else $('.realtime_more').text('1�� - 10��')
		
		
	});
	//媛쒕뀗湲� �� �대┃
	$('.recomTab').click(function(){
		var index = $('.tab_comm a').index(this);
		var page = index+1;
		$('.recomTab').removeClass('on');
		$('.recomTab').eq(index).addClass('on');
		
		$('.recom'+page).css('display','block');
		$('#recomNum').text(page+1);

		recomAjax($(this).data('cate_id'));
	});

	//留뚮몢紐� �� �대┃
	$('.mallTab').click(function(){

		var index = $('.mall_con .tab_comm a').index(this);

		$('.mallTab').removeClass('on');
		$('.mallTab').eq(index).addClass('on');
		
		$('.mallCont').hide();
		$('.mallCont').eq(index).css('display','block');

	});

	//寃뚯떆湲�, �볤� �� 濡ㅻ쭅
	setInterval("gall_content_fade()", 3000);
	
	//�쒕퉬�� �닿린/�묎린
	$('.menu_fold').click(function(){
		$('.menu_fold').hide();
		$('.menu_open').show();
		$('.all_list').hide();
	});
	$('.menu_open').click(function(){
		$('.menu_open').hide();
		$('.menu_fold').show();
		$('.all_list').show();
	});
	
	// �붿떆誘몃뵒�� �댁쟾
	$('#media_prev').click(function(){
		mediaPageMove(false);
	});

	// �붿떆誘몃뵒�� �댄썑
	$('#media_next').click(function(){
		mediaPageMove(true);
	});
	
	// �붿떆�댁뒋 �댁쟾
	$('#issue_prev2').click(function(){
		issuePageMove2(false);
	});

	// �붿떆�댁뒋 �댄썑
	$('#issue_next2').click(function(){
		issuePageMove2(true);
	});
	
});


var open_new_device = function() {
	$.ajax({
		url: "https://gall.dcinside.com/ajax/gallery_top_ajax/new_device",
		type : "GET",
		cache: true,
	    async: false,
		success: function(htmlData) {
			$("body").append(htmlData);
		}
	});
}
$(function(){
	var new_device = get_cookie('new_device');
	if(new_device == 'Y'){
		open_new_device();
	}
});

var hotTab = function(gall){
	var type = ''; 
	if(gall == 'm' || gall == 'mini') type = gall;
	
	if($('.hot .'+type+'gall').index() < 0) {
		return false;
	}
	
	$('.hot .box_menu a').removeClass('on');
	if(gall == 'g' || gall == 'm')	$('.hot .box_menu .rank_'+type+'gall').addClass('on')
	else	$('.hot .box_menu .rank_mini').addClass('on')
	
	$('.hot .rank_list').hide();
	$('.hot .'+gall+'_1').show();
	$('.hot_more').attr('gall_type', gall);
	$('.hot_more').attr('page','1');
	$('.hot_more').text('11�� - 20��');
}

var realtimePageMove = function(is_next) {

	var nowNum = $('#dcbest_list_page_top .realtimeNum').text();
	var realtimeTotal = $('#dcbest_list_page_top .realtimeTotal').text();
	var page = '';

	if(is_next) {
		nowNum++;
		if (nowNum > realtimeTotal) {
			nowNum = 1;
			page = 0;
		} else {
			page = nowNum;
		}
	}
	else {
		nowNum--;
		
		if (nowNum <= 0) {
			nowNum = realtimeTotal;
			page = realtimeTotal - 1;
		} else {
			page = nowNum - 1;
		}
	}

	$('.realtime_prev').addClass('on');
	$('.realtime_next').addClass('on');
	
	if (nowNum == 1)				$('.realtime_prev').removeClass('on');
	if (nowNum == realtimeTotal)		$('.realtime_next').removeClass('on');

	$('.realtimeNum').text(nowNum);
	$('.time_best .typet_list').hide();
	$('.time_best .p_'+nowNum).show();
	
	
}

function isEmpty(str){
    if(typeof str == "undefined" || str == null || str == "")
        return true;
    else
        return false ;
}
$(function(){
	$('.hot_more').click(function(){
		
		var type = $(this).attr('gall_type');
		var page = number_format($(this).attr('page'));	//�꾩옱 �섏씠吏�
		
		if(page > 9) page = 1;
		else page++;
		
		$('.hot .rank_list').hide();
		$('.hot .'+type+'_'+page).show();
	
		if(page >= 1 && page <= 9) $('.hot_more').text(page+'1�� - '+(page+1)+'0��');
		else $('.hot_more').text('1�� - 10��')
		
		$('.hot_more').attr('page',page)
		
	});
	//realtime �댁쟾
	$('.realtime_prev').click(function(){
		realtimePageMove(false);
	});

	//realtime �댄썑
	$('.realtime_next').click(function(){
		realtimePageMove(true);
	});
	
});