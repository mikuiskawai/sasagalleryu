

if (typeof(beta) == "undefined")
    _beta = beta = {};

if (typeof(_beta.fix) == "undefined")
    _beta.fix = {};
else
    alert("keyfix is already set!");

if(typeof(window.beta.instances) == "undefined")
    window.beta.instances = new Array();

_beta.fix = function(targetId)
{
    // this fix is only for mozilla browsers
    //if(jQuery.browser.mozilla == false)
      //  return false;
	if( navigator.userAgent.toLowerCase().indexOf('firefox') < 0 ) {
		return false;
	} 
	
    var thisClass = this;
    this.keyEventCheck = null;
    this.db = null;
    this.targetId = targetId;
    window.beta.instances[this.targetId] = this;

    var focusFunc = function()
    {
        if(!thisClass.keyEventCheck) thisClass.watchInput();
    }

    var blurFunc = function()
    {
        if(thisClass.keyEventCheck)
        {
            window.clearInterval(thisClass.keyEventCheck);
            thisClass.keyEventCheck = null;
        }
    }

    $("#" + this.targetId).bind("focus", focusFunc);
    $("#" + this.targetId).bind("blur", blurFunc);
};

_beta.fix.prototype.watchInput = function()
{
    if(this.db != $("#" + this.targetId).val())
    {
        // trigger event
        $("#" + this.targetId).keyup();
        this.db = $("#" + this.targetId).val();
    }

    if(this.keyEventCheck) window.clearInterval(this.keyEventCheck);
    this.keyEventCheck = window.setInterval("window.beta.instances['" + this.targetId + "'].watchInput()", 100);
};

document.domain = 'dcinside.com';

var save_off_search = get_cookie('save_off_search');
var open_mem_checked = save_off_search ? '' : 'checked="checked"';
var gsearch_doc = document;
var gsearch_el = '.top_search';

if(window.location.host != window.parent.location.host) {
	/*
	var hostpath = window.location.host + window.location.pathname;
	
	gsearch_doc = window.parent.document;
	gsearch_el = 'iframe[src="https://'+ hostpath +'"],iframe[src="//'+ hostpath +'"]';
	
	if(hostpath != 'gn.dcinside.com/top/top_dccon.php') {
		$(gsearch_el, gsearch_doc).after('<link href="//nstatic.dcinside.com/dc/w/css/reset.css"/>');
		$(gsearch_el, gsearch_doc).after('<link href="//nstatic.dcinside.com/dc/test/css/w/common.css?0614-10"/>');
		$(gsearch_el, gsearch_doc).after('<link href="//nstatic.dcinside.com/dc/test/css/w/contents.css?0614-10"/>');
	}
	*/
}

globalSearch = function(f) {
	var keyword = $('input[name="search"]', f).val();
	var s_tab = $(f).data('tab') ? $(f).data('tab') : 'combine';
	var action = $(f).attr('action') ? $(f).attr('action').replace(/\/$/, '') : 'https://search.dcinside.com/'+ s_tab;
	var url = action +'/q/'+ uri_encode(keyword);
	var dataTarget = $('input[name="search"]').attr('dataTarget');
	var save_off_search = get_cookie('save_off_search');
	
	if(!keyword) {
		alert('검색어를 입력해주세요.');
		return false;
	}
	
	if(!save_off_search) {
		storage.getItem('global_search_history', function(key, value) {
			var strg_keywords = value ? $.parseJSON(value) : [];
			strg_keywords.unshift(keyword);
		//	strg_keywords = strg_keywords.filter((value, index, self) => { return self.indexOf(value) === index; });
			strg_keywords = strg_keywords.filter(function (value, index, self) {
				return self.indexOf(value) === index;
			});
			strg_keywords.splice(30);
			storage.setItem('global_search_history', JSON.stringify(strg_keywords));
		});
	}
	
	$.ajax({
		url: "https://search.dcinside.com/ajax/chkSearch/q/"+ keyword,
		type: "GET",
		dataType: "jsonp",
		async: true,
		contentType: "application/json; charset=utf-8",
		jsonp : "callback",
		jsonpCallback: "jsonpCallback",
		crossDomain: true,
		data: {},
		success: function(json, textStatus, jqXHR) {}
	});

	if(f.target) {
		window.open(url, f.target);
	}
	else {
		
		if(dataTarget == 'mall')	window.open(url, '_top');
		else	location.href = url;
	}

	return false;
}

uri_encode = function(keyword) {
	keyword = encodeURIComponent(keyword).replace(/\./g, '%2E').replace(/~/g, '%7E').replace(/\!/g, '%21').replace(/\*/g, '%2A').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/'/g, '%27');
	return keyword.replace(/%/g, '.');
}

search_history_delete = function (elm) {
	storage.getItem('global_search_history', function(key, value) {
		if($(elm).text() == '전체 삭제') {
			if(!confirm('검색 목록을 모두 삭제하시겠습니까?')) {
				return false;
			}
			strg_keywords = [];
			$('.word_list li', $(elm).closest('.word_box')).remove();
		}
		else {
			var strg_keywords = value ? $.parseJSON(value) : [];
			var idx = $(elm).closest('li').index();
			strg_keywords.splice(idx, 1);
			$(elm).closest('li').remove();
		}
		
		storage.setItem('global_search_history', JSON.stringify(strg_keywords));
		
		if(strg_keywords.length <= 0) {
			$('#tmpl_search .empty_box').show();
		}
	});
}

search_history_conf = function (elm) {
	if(!$(elm).prop('checked')) {
		if(!confirm('검색어 저장 기능을 중지하시겠습니까?')) {
			$(elm).prop('checked', true);
			return false;
		}
	}
	else if($(elm).prop('checked') && !confirm('검색어 저장 기능을 사용하시겠습니까?')) {
		$(elm).prop('checked', false);
		return false;
	}
	
	var expire = $(elm).prop('checked') ? 1970 : 9999;
	document.cookie = "save_off_search=1; expires=Thu, 01 Jan "+ expire +" 00:00:00 GMT;path=/; domain=.dcinside.com;";

	if(!$(elm).prop('checked')) {
		save_off_search = 1;
		$('#tmpl_search').parent().hide().html('');
		open_mem_checked = '';
	}
	else {
		save_off_search = null;
		open_mem_checked = 'checked="checked"';
	}
}

show_search_keywords = function (elm) {
	if($(elm).val()) {
		$(elm).data('sleep', 1);
		$(elm).keyup();
		return false;
	}
	if(save_off_search) {
		return false;
	}

	var html =	'<div id="tmpl_search" class="auto_word">';
	var display_empty_box = '';

	storage.getItem('global_search_history', function(key, value) {
		var strg_keywords = value ? $.parseJSON(value) : [];
		var display_empty_box = strg_keywords.length > 0 ? 'none' : '';
	
		html +=	'<div class="word_box">';
	    html += '<h3 class="word_tit">최근 검색어';
	    html += '<button type="button" class="btn_latelydel" onclick="search_history_delete(this);">전체 삭제</button>';
	    html += '</h3>';
	    html += '<ul class="word_list">';
	    
		if(!strg_keywords || strg_keywords.length <= 0) {
			return false;
		}

        for(var i in strg_keywords) {
	        html += '<li>';
	        html += '<a href="https://search.dcinside.com/combine/q/'+ uri_encode(strg_keywords[i]) +'">'+ strg_keywords[i] +'</a>';
	        html += '<button type="button" class="btn_autoword_del" onclick="search_history_delete(this);"><span class="blind">삭제</span><em class="icon_autoword_del"></em></button>';
	        html += '</li>';
        }
	
	    html += '</ul>';
		html += '</div>';
		html += '<div class="empty_box" style="display:'+ display_empty_box +';">';
		html += '최근 검색어가 없습니다.';
		html += '</div>';
		html += '</div>';
		
		html += '<div class="word_close">';
		html += '<div class="saveonfo">';
		html += '<span class="checkbox round blue">';
		html += '<input type="checkbox" id="open_mem" class="round_check" '+ open_mem_checked +' onclick="search_history_conf(this)">';
		html += '<label for="open_mem" class="round_label">';
		html += '<em class="inr">검색어 저장</em>';
		html += '</label>';
		html += '</span>';
		html += '</div>';
		html += '<a href="javascript:;" onclick="$(\'#tmpl_search\').parent().hide().html(\'\');" class="sp_img btn_close"><span class="blind">레이어 닫기</span></a>';
		html += '</div>';
		
		$('.auto_wordwrap').addClass('lately');
		$('.auto_wordwrap').css("left", $(gsearch_el, gsearch_doc).position().left +"px");
		$('.auto_wordwrap', gsearch_doc).eq(0).html(html).show();
	});
}

$(document).ready(function() {
	if(window.location.host != window.parent.location.host) {
		return false;
	}

	var inputId = $('#gn_top_search_0').index() < 0 ? 'preSWord' : 'gn_top_search_0'; 
	var keyFix = new beta.fix(inputId);
	var search_title = {'gallery' : '갤러리', 'recommend' : '추천'};					
	var input_el = $('#'+inputId);
	var search_el = '.top_search';
	var autocomplete_time = 0;
	var crossDoaminStorageOptions = {
			origin: "https://gall.dcinside.com",
			path: "/_js/crossDomainStorage.html",
		    storage: "localStorage"
		};

	if(typeof(storage) == 'undefined') {
		storage = new crossDomainStorage(crossDoaminStorageOptions);
	}

	/*
	$('.btn_globalSearch').click(function() {
		var form = $(this);
		
		for(var $i = 0; $i < 100; $i++) {
			if(form[0].tagName == 'FORM') {
				form.submit();
				break;
			}
			form = form.parent();
		}
	});
	*/
	
	var gsearch_el_top = $(gsearch_el, gsearch_doc).position().top + $(gsearch_el, gsearch_doc).outerHeight();
	var gsearch_el_left = $(gsearch_el, gsearch_doc).position().left;
	
	$(gsearch_el, gsearch_doc).after('<div class="auto_wordwrap" style="left:'+ gsearch_el_left +'px;top:'+ gsearch_el_top +'px;display:none"></div>');

	var searchFocus = 1;
	var moveLink = "";
	var autocomplete_timeout = null;
	input_el.keyup(function(event) {
		if(event.keyCode == '40' || event.keyCode == '38' || event.keyCode == '13') return;

		if($(this).data('custom-autocomplete') == 'false') return;

		var keyword = $(this).val();

		if($(this).data('sentKeyword') == keyword) {
			return;
		}
		else {
			clearTimeout(autocomplete_timeout);
			$(this).data('sentKeyword', keyword);		// keyup 이벤트가 두번씩 실행됨
		}
		
		if(keyword == '' || keyword.length < 1) {
			if($('#tmpl_search').index() >= 0) $('#tmpl_search').parent().hide().html('');
			if($('.auto_wordwrap', gsearch_doc).eq(0).index >= 0) $('.auto_wordwrap', gsearch_doc).eq(0).hide().html('');
			show_search_keywords($(search_el));
			return;
		}
		
		var autocom_sleep = $(this).data('sleep') || 300;
		
		$(this).data('sleep', 300);
		
		autocomplete_timeout = setTimeout(function() {
			$.ajax({
				url: "https://search.dcinside.com/autocomplete?callback=?",
				type: "GET",
				dataType: "jsonp",
				contentType: "application/json; charset=utf-8",
				data: {
					t: new Date().getTime(),
					k: uri_encode(keyword)
				},
				success: function(json, textStatus, jqXHR) {
					var empty = true;
					var html = '<div id="tmpl_search" class="auto_word">';
					
					if(autocomplete_time > json.time.time) {
						return ;
					}
					
					var nKeyIdx = 1;
					for(var i in json) {
						var json_len = i == 'wiki' ? 0 : 1;
						
						if(Object.keys(json[i]).length > json_len && search_title[i] != undefined) {
							var count_html = typeof(json[i].total) != 'undefined' ? ' <span class="num">'+ json[i].total +'건</span>' : '';
							
							html += '<div class="word_box">';
					        html += '<h3 class="word_tit">'+ search_title[i] + count_html;
					        html += json[i].total > 20 ? '<a href="https://search.dcinside.com/gallery/q/'+ uri_encode(keyword) +'" class="txtbtn_more">더보기</a></h3>' : '';
					        html += '</h3>';
					        html += '<ul class="word_list">';

							for(var j in json[i]) {
								if(typeof(json[i][j]) != 'object' && typeof(json[i][j]) != 'array') {
									continue;
								}
								
								var subject = json[i][j].ko_name;
								var href = typeof(json[i][j].link) != 'undefined' ? json[i][j].link : '';
								var gall_icon = '';
								var aclass = '';
								var icon_restriction = '';
								var detail_icon = '';

								if(json[i][j].galleryId == 'singo') {
									href = 'https://gall.dcinside.com/singo';
								}
								else if(json[i][j].gall_type == 'M') {
									gall_icon = '<em class="icon_minor">ⓜ</em>';
								}
								else if(json[i][j].gall_type == 'MI') {
									gall_icon = '<em class="icon_mini1">ⓝ</em>';
								}
								else if(json[i][j].gall_type == 'WIKI') {
									subject = json[i][j].title;
									href = 'https://wiki.dcinside.com/wiki/'+ encodeURIComponent(json[i][j].title);
								}
								
								if(typeof(json[i][j].state) != 'undefined' && json[i][j].state == 'N') {
									aclass = 'restriction';
									icon_restriction = '<span><em class="blind">접근제한</em><em class="sp_img icon_restriction"></em></span>';
								}
								else if(typeof(json[i][j].rank) != 'undefined' && json[i][j].rank > 0) {
									detail_icon = '<span class="sch_ranking">'+ json[i][j].rank +'위</span>';
								}
								
								subject = subject.replace(keyword, '<em class="wordmark">'+ keyword +'</em>');
								html += '<li class="search_key" id="search_key_idx_'+ (nKeyIdx++)+ '"><a href="'+ href +'" class="'+ aclass +'">'+ subject + gall_icon + icon_restriction + detail_icon +'</a></li>';
							}
	
							html += '</ul>';
							html += '</div>';
	
							empty = false;
						}
					}
	
					if(empty) {
						if($('#tmpl_search').index() >= 0) $('#tmpl_search').parent().hide().html('');
						if($('.auto_wordwrap', gsearch_doc).eq(0).index >= 0) $('.auto_wordwrap', gsearch_doc).eq(0).hide().html('');
						return;
					}
					
					html += '</div>';
					
					html += '<div class="word_close">';
					if(save_off_search) {
						html += '<div class="saveonfo">';
						html += '<span class="checkbox round blue">';
						html += '<input type="checkbox" id="open_mem" class="round_check" '+ open_mem_checked +' onclick="search_history_conf(this)">';
						html += '<label for="open_mem" class="round_label">';
						html += '<em class="inr">검색어 저장</em>';
						html += '</label>';
						html += '</span>';
						html += '</div>';
					}
					html += '<a href="javascript:;" onclick="$(\'#tmpl_search\').parent().hide().html(\'\');" class="sp_img btn_close"><span class="blind">자동완성 레이어 닫기</span></a>';
					html += '</div>';
					
					autocomplete_time = json.time.time;
					
					if($('.top_box').index() > -1) {
						var gap = $('#dgn_gall_top .top_box', gsearch_doc).index() > -1 ? $('#dgn_gall_top .top_box', gsearch_doc).offset().top : 0;
						var auto_wordwrap_top = $('.top_box').offset().top + $('.top_box').outerHeight() - gap + 1;
						$('.auto_wordwrap', gsearch_doc).css("top", auto_wordwrap_top +"px");
					}
					
					$('.auto_wordwrap').removeClass('lately');
					$('.auto_wordwrap').css("left", $(gsearch_el, gsearch_doc).position().left +"px");
					$('.auto_wordwrap', gsearch_doc).eq(0).html(html).show();
				
					processing_autocomplete = false;
					/*
					if($('#tmpl_search').height() > 377 )	{
						$('#tmpl_search').css('height', '377px');
						$('#tmpl_search').css('overflow-x', 'hidden')
					}
					*/
				}
			});
		}, autocom_sleep);
	}).keydown(function(event) {

		if(typeof event.keyCode === 'undefined') return;

		var nKeyList = $(".search_key").length;

		if(event.keyCode == 40) {
			event.preventDefault ? event.preventDefault() : (event.returnValue = false);
			if($(".search_key").hasClass("on") !== false){
				//console.log(searchFocus);
				if(searchFocus >= nKeyList) {
					return;
				}

				$(".search_key").removeClass("on");
				$(".search_key").css("background-color","#fff");

				searchFocus++;

				$("#search_key_idx_"+searchFocus).addClass("on");
				$("#search_key_idx_"+searchFocus).css("background-color","#f6f6f8");
				$('input[name="search"]').val($("#search_key_idx_"+searchFocus+" a").text());
				moveLink = $("#search_key_idx_"+searchFocus+" a").attr("href");
			} else {
				//console.log('first');
				$("#search_key_idx_1").addClass("on");
				$("#search_key_idx_1").css("background-color","#f6f6f8");
				$('input[name="search"]').val($("#search_key_idx_1 a").text());
				moveLink = $("#search_key_idx_1 a").attr("href");
			}
			
			return;
		}

		if(event.keyCode == 38) {
			event.preventDefault ? event.preventDefault() : (event.returnValue = false);
			if(searchFocus <= 1) {
				return;
			}
			$(".search_key").removeClass("on");
			$(".search_key").css("background-color","#fff");

			searchFocus--;

			$("#search_key_idx_"+searchFocus).addClass("on");
			$("#search_key_idx_"+searchFocus).css("background-color","#f6f6f8");
			$('input[name="search"]').val($("#search_key_idx_"+searchFocus+" a").text());

			moveLink = $("#search_key_idx_"+searchFocus+" a").attr("href");
			return;
				
		}
	
		if(event.keyCode == 13) {
			event.preventDefault ? event.preventDefault() : (event.returnValue = false);
			if(moveLink !== "") {
			
				location.href = moveLink;
			} else {
				
				var searchForm = $('form[id="searchform"]');
				
				globalSearch(searchForm);
			}
			/*if($('input[name="search"]').val() == ""){
				alert('검색어를 입력해주세요!!');
				return;
			}

			if(moveLink !== "") {
				location.href = moveLink;
			} else {
				location.href = 'http://search.dcinside.com/combine/q/'+$('input[name="search"]').val();
			}*/
		}
	});
});

function jsonpCallback(json) {}
