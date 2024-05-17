$(function(){
	var b_json_noticeAjax = false;
	var json_noticeAjax = function(data) {
		
		if(data.length <= 0) return false;
		if(b_json_noticeAjax) return false;
		b_json_noticeAjax = true;
		
		var str = "";
		$.each(data, function(i, e) {
			str +=	'<a href="//gall.dcinside.com/list.php?id=know"><strong class="tit">공지사항</strong></a><a href="' + e['link'] + '">' + e['title'] + '</a>';
		});
		
		
		if(str) {
			$('.notice').html(str);

			if ($('.notice').children().length>1) {
				setInterval('notice_rolling()',3000);
			}
		} else{

			$('.notice').html('<a href="//gall.dcinside.com/list.php?id=know"><strong class="tit">공지사항</strong></a>');
			
		}
		
	}
	var noticeAjax = function() {
		
		$.ajax({
            url:'https://json2.dcinside.com/json1/notice.php',
            dataType:"jsonp",
            jsonpCallback: 'json_noticeAjax',
            cache: true,
            jsonp:"jsoncallback",
            success:function(data){
            	json_noticeAjax(data);
            }
        });
	}
	
	noticeAjax();	

});

function randOrd(){
	return (Math.round(Math.random())-0.5);
}

uri_encode = function(keyword) {
	return encodeURIComponent(keyword).replace(/%/g, '.').replace(/[~!*()']/g, '');
}
	
// 공지 롤링
function notice_rolling() {
	$('#notice_rolling').find('li').each(function(){
		if ($(this).is(':first-child')) {
			$(this).slideUp(
				function(){
					$(this).appendTo($(this).parent()).slideDown();
				}
			);
		}
	});
}

var b_json_rolling_gall = false;
var json_rolling_gall = function(data) {
	if(data.length <= 0) return false;
	if(b_json_rolling_gall) return false;
	b_json_rolling_gall = true;
	
	var randNum = getRandom(10, data.length);
	var newData = [];
	for(var i = 0; i <randNum.length; i++) {
		newData[i] = data[randNum[i]];
	}
	
	$('#rollingGall-tmpl').tmpl(newData).appendTo('.all_box .rollingGall');	
	
}
var rolling_gall = function()
{	
	$.ajax({
     url:'//json.dcinside.com/json1/rolling_gallery.php',
     dataType:"jsonp",
     jsonpCallback: 'json_rolling_gall',
     cache: true,
     jsonp:"jsoncallback",
     success:function(data){
     	var randNum = getRandom(10, data.length);
		var newData = [];
		for(var i = 0; i <randNum.length; i++) {
			newData[i] = data[randNum[i]];
		}
			
     	json_rolling_gall(newData);
     }
 });
}

//랜덤 숫자 10개
function getRandom(getNum, maxNum) {
	var randomIndexArray = []
	for (i=0; i<maxNum; i++) {
		randomNum = Math.floor(Math.random() * maxNum)
		if (randomIndexArray.indexOf(randomNum) === -1) {
			randomIndexArray.push(randomNum);
			if(randomIndexArray.length == getNum) break;
		}
	}
	return randomIndexArray;
}
var recomAjax = function(category) {
	var page = $('.concept_con .tab_comm .recomTab.on').parent().index() + 1;
	
	if($('section .recom'+ page).index() >= 0) {
		$('.recomSection').hide();
		$('section .recom'+ page).show();
		return false;
	}
	
	var recomUrl = 'https://json2.dcinside.com/json1/top.recom.json.r'+ category +'.pc.php';
	
	if(category == 'rand') {
		recomUrl = 'https://json2.dcinside.com/json1/top.recom.json.mainl.pc.php';
	}
	
	$.ajax({
        url: recomUrl,
        dataType: "jsonp",
        jsonpCallback: 'setRecom',
        cache: true,
        jsonp: "jsoncallback",
        success: function(data){}
    });
}
var setRecom = function(data) {
	var page = $('.concept_con .tab_comm .recomTab.on').parent().index() + 1;
	var cate_name = $('.concept_con .tab_comm .recomTab.on').text();

	$('.recomSection').hide();
	
	array_shuffle(data[0]);
	$('#recom-tmpl').tmpl({ 'page' : page, 'cate_name' : cate_name, 'data' : data[0].slice(0, 4) }).appendTo('.concept_con');
}
var b_json_migall_new = false;
var json_migall_new = function(data) {
	if(data.length <= 0) return false;
	if(b_json_migall_new) return false;
	b_json_migall_new = true;
	
	var noArr = new Array();
	var dataArr = new Array();		
	var newMIgallArr = new Array();
	
	var p = 1;
	var i = 0;
	var html = '<ul class="rank_list newMIgallList newMI_'+p+'" style="display:none;">';
	$.each(data,function(index,entry){
		if(i != 0 && i%5 == 0){
			p++;
			html +='</ul><ul class="rank_list newMIgallList newMI_'+p+'" style="display:none">';
		}
        html+='<li><a href="https://gall.dcinside.com/mini/board/lists?id='+entry['id']+'"><span class="rank_txt">'+entry['ko_name']+'</span></a></li>';
        
        i++;
	});
	html+='</ul>'
	if(p > 1 && p <= 10){
		html+='<div class="box_bottom newPageMI" style="display:none;"><div class="pageing">'
				+'<div class="page_num"><strong class="now_num">1</strong>/<span class="total_num">'+p+'</span></div>'
				+'<div class="btn_box">\r\n';
		html += '<button type="button" class="sp_main btn_prev new_prev" data-type="MI"><span class="blind">이전</span></button>\r\n';
		html += '<button type="button" class="sp_main btn_next new_next on" data-type="MI"><span class="blind">다음</span></button>\r\n';
		html += '</div></div></div>';
	}

	$('.new_gall .box_tit').after(html)
}
var migall_new = function() {
	
	$.ajax({
        url:'https://json2.dcinside.com/json1/migallmain/migallery_new.php',
        dataType:"jsonp",
        jsonpCallback: 'json_migall_new',
        cache: true,
        jsonp:"jsoncallback",
        success:function(data){
        	json_migall_new(data);
        }
    });
}
var mgall_rank = function() {
	if($('.hotlive .rank_list.mgall').index() >= 0) {
		return false;
	}
	
	var highMgallArr = new Array();
	var lowMgallArr = new Array();
	$.ajax({
		url: "https://json2.dcinside.com/json1/mgallmain/mgallery_ranking.php?jsoncallback=?",
		type: "post",
		dataType: "json",
		async: false,
		success: function(data) {
			
			var page = 1;
			var html = '';
			$.each(data, function(index,entry) {
                //console.log(index);
				if(entry['rank_type'] == 'stop') entry['rank_type'] = 'same';
				if(index < 50){
					if(index%10 == 0) html+='<ol class="rank_list mgall m_'+page+'" style="display:none">';
			                  html+='<li><a href="https://gall.dcinside.com/mgallery/board/lists?id='+entry['id']+'" class="busygall" section_code="main_minor_count">';
			                    html+='<span class="rank_num"><em>'+entry['rank']+'</em></span>';
			                    html+='<span class="rank_txt">'+entry['ko_name']+'</span>';
			                    if(entry['rank_updown'] > 0 )	html+='<span class="rank_state">'+entry['rank_updown']+'</span>';
			                    html+='<span class="sp_img ico_ranking '+entry['rank_type']+'"></span>';
			                  html+='</a></li>';
					if(index%10 == 9){	
						html+='</ol>';
						page++;
					}
				}
			
			});				
			
			$('#rank_gall .box_tit').after(html);
		//	$('.mgallRankTab').click();
		}
	});
}
var migall_rank = function() {
	var highMgallArr = new Array();
	var lowMgallArr = new Array();
	$.ajax({
		url: "https://json2.dcinside.com/json1/migallmain/migallery_ranking.php?jsoncallback=?",
		type: "post",
		dataType: "json",
		async: false,
		success: function(data) {
			
			var page = 1;
			var html = '';
			$.each(data, function(index,entry) {
                //console.log(index);
				if(entry['rank_type'] == 'stop') entry['rank_type'] = 'same';
				if(entry['rank_type'] == 'new') entry['rank_type'] = 'up';
				if(index < 50){
					if(index%10 == 0) html+='<ol class="rank_list minigall mi_'+page+'" style="display:none">';
			                  html+='<li><a href="https://gall.dcinside.com/mini/board/lists?id='+entry['id']+'" class="busygall" section_code="main_minor_count">';
			                    html+='<span class="rank_num"><em>'+entry['rank']+'</em></span>';
			                    html+='<span class="rank_txt">'+entry['ko_name']+'</span>';
			                    if(entry['rank_updown'] > 0 )	html+='<span class="rank_state">'+entry['rank_updown']+'</span>';
			                    html+='<span class="sp_img ico_ranking '+entry['rank_type']+'"></span>';
			                  html+='</a></li>';
					if(index%10 == 9){	
						html+='</ol>';
						page++;
					}
				}
			
			});				
			
			$('#rank_gall .box_tit').after(html);
			
		}
	});
}

$(function(){
	migall_new();		//migall new
//	mgall_rank();		//mgall rank
//	migall_rank();		//migall rank
	rolling_gall();
});

/*var hot_dccon = function() {
	noArr = new Array();
	dataArr = new Array();
	dcconArr = new Array();

	$.ajax({
		url: "http://json.dcinside.com/json1/dccon_list.php?jsoncallback=?",
		type: "post",
		dataType: "json",
		async: false,
		success: function(data) {
			var loop=0;
			$.each(data, function(index,entry) {
				entry['title'] = entry['title'].substr(0,9)
				noArr[loop]		= loop;
				dataArr[loop]	= entry;
				
				loop++;
			});
		
			var no = noArr.sort(randOrd);
			
			for (var i = 0; i < noArr.length; i++) {
				if (i >= 4) {
					break;
				}	
				dcconArr.push(dataArr[no[i]]); 
			}

		$('#dccon-tmpl').tmpl(dcconArr).prependTo('.dccon .dccon_list');
		}
	});
}
*/
