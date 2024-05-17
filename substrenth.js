window.onpageshow = function(ev) {
        
    const nav = window.performance.getEntriesByType("navigation")[0];
    
    if(ev.persisted || (window.performance && window.performance.navigation.type == 2) || (nav && nav.type == 'back_forward')){
        
        const rank_type = sessionStorage.getItem("_dcbest_rank_");
        if(!isEmpty(rank_type)) {
            const rank_data = sessionStorage.getItem('_dcbest_rank_'+rank_type);
            if(!isEmpty(rank_data)) prev_dcbest_rank(rank_type,rank_data);
        }
    } else {
        remove_rank_sess_data();
    }
}

$(function(){
    
    $.getJSON("https://json.dcinside.com/json3/dcbest_rank_json.php?jsoncallback=?", function(data) {
        const arr_rank_type = ['hit','recom','comment'];
        
        arr_rank_type.forEach(function(ele,index) {
            let rank_li_data = data[ele];
            make_rank_ul(rank_li_data,ele);
        });
        
    });
    
	$('.main_tab_real_time_best').click(function(){
        
		let cur_dcbest_type = 0;
		let cookie_val = 'B';
		let dcbest_cate_qry = '';
		
		$('.main_tab_real_time_best').each(function(i, obj) {
			if($(obj).hasClass('best') && $(obj).hasClass('on')) cur_dcbest_type += 1;
			if($(obj).hasClass('light') && $(obj).hasClass('on')) cur_dcbest_type += 3;

		});
		
		if($(this).hasClass("best")) {
			if($(this).hasClass('on')) cur_dcbest_type -= 1;
			else cur_dcbest_type += 1;
		}
		
		if($(this).hasClass("light")) {
			if($(this).hasClass('on')) cur_dcbest_type -= 3;
			else cur_dcbest_type += 3;
		}
		
		if(cur_dcbest_type > 0) {
			dcbest_cate_qry = '?_dcbest='+cur_dcbest_type;
		}
		
		if(cur_dcbest_type == 1) cookie_val = 'B';
		if(cur_dcbest_type == 3) cookie_val = 'L';
		if(cur_dcbest_type == 4) cookie_val = 'BL';
		//console.log(cookie_val);
		
		set_cookie_tmp('best_cate',cookie_val,8760,'dcinside.com');

		location.href = 'https://www.dcinside.com/'+dcbest_cate_qry;

	});
	
	$('.btn_dcbest_rank_tab').click(function(){
        //console.log('rank');
        
        let rank_type = $(this).attr('data');
        if(rank_type == 'default' && $(this).hasClass('on')) {
            close_dcbest_rank();
            return false;
        }
        if(isEmpty(rank_type) || rank_type == 'default') rank_type = 'hit';
        
        show_rank_tab(rank_type);
        
    });
    
    $(".btn_rank_close").click(function() {
        close_dcbest_rank();
    });
});
function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function make_rank_ul(rank_data,rank_type) {
    //console.log(rank_data);
    
    let rank_li = '';
    rank_data.forEach(function(ele,index) {
        
        if(ele.rank > 30) return false;
       
        let numsub = 0;
        if(rank_type == 'hit') numsub = ele.hit;
        else if(rank_type == 'recom') numsub = ele.recommend;
        else if(rank_type == 'comment') numsub = ele.total_comment;
        else numsub = ele.hit;
        rank_li +='<li>';
        rank_li += '<a href="https://gall.dcinside.com/board/view/?id=dcbest&no='+ele.no+'" class="main_log" section_code="realtime_best_p">';        rank_li += '<div class="box best_rank">';
        rank_li += '<strong class="num">'+ele.rank+'</strong>';
        rank_li += '<span class="numsub">'+numsub+'</span>';
        rank_li += '</div>';
        rank_li += '<div class="box bestimg '+(isEmpty(ele.thumb)?('thumimg'+getRandomInt(1,5)):'')+'">';
        if(!isEmpty(ele.thumb)){
            rank_li += '<img src="'+ele.thumb+'" alt="" style="position:relative;'+ele.thumb_css+'">';
        }
        rank_li += '</div>';
        rank_li += '<div class="box besttxt">';
        if(rank_type == 'comment') {
            rank_li += '<p>'+ele.subject+'</p>';
        } else {
            rank_li += '<p>'+ele.subject+(ele.total_comment?'</p><span class="num">['+ele.total_comment+']</span>':'</p>');
        }
        rank_li += '</div>';
        rank_li += '<div class="box best_info">';
        rank_li += '<span class="name">'+ele.gall_name+'</span>';
        rank_li += '<span class="time">'+ele.conv_copy_date+'</span>';
        rank_li += '</div>';
        rank_li += '</a>';
        rank_li += '</li>';
    });
    
    
    $("#dcbest_list_rank").append('<ul id="rank_ul_'+rank_type+'" class="typet_list dcbest_rank_ul" style="display:none">'+rank_li+'</ul>');
    
    const jsonString = JSON.stringify(rank_data);
    //console.log(jsonString);
    sessionStorage.setItem('_dcbest_rank_'+rank_type,jsonString);
    
}

function show_rank_tab(rank_type) {
    $("#dcbest_list_date").hide();
    $("#dcbest_list_page_top").hide();
    $("#dcbest_list_page_btm").hide();
    $("#dcbest_list_rank").show();
    $("#dcbest_rank_tab").show();
    $(".btn_rank_close").show();
    $(".btn_dcbest_rank_tab").removeClass("on");
    
    $('.btn_dcbest_rank_tab').each(function(index,item){
        if($(this).attr('data') == 'default' || $(this).attr('data') == rank_type) $(this).addClass("on");
    });
    
    $('.dcbest_rank_ul').each(function(index,item){
        $(this).hide();
    });
    
    $("#rank_ul_"+rank_type).show();
    
    sessionStorage.setItem('_dcbest_rank_',rank_type);
    
}

function close_dcbest_rank() {
    $("#dcbest_list_rank").hide();
    $(".btn_rank_close").hide();
    $("#dcbest_list_rank").hide();
    $("#dcbest_rank_tab").hide();
    
    $(".btn_dcbest_rank_tab").removeClass("on");
    $("#dcbest_list_page_top").show();
    $("#dcbest_list_page_btm").show();
    $("#dcbest_list_date").show();
    
    remove_rank_sess_data();
}

function prev_dcbest_rank(rank_type, rank_save_data) {
    
    $(".btnRank").each(function() {
        if($(this).attr('data') == 'default' || $(this).attr('data') == rank_type) {
            if($(this).hasClass('on')) return false;
            $(this).addClass('on');
        }
    });
    
    const rank_data = JSON.parse(rank_save_data);
    make_rank_ul(rank_data,rank_type);
    
    show_rank_tab(rank_type);
    
    //console.log('reload');
}

function remove_rank_sess_data() {
    sessionStorage.removeItem('_dcbest_rank_');
    //sessionStorage.removeItem('_dcbest_rank_hit');
    //sessionStorage.removeItem('_dcbest_rank_comment');
    //sessionStorage.removeItem('_dcbest_rank_recom');
}

