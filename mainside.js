
function set_cookie(name, value, expirehours, domain) {

    var today = new Date();
    today.setTime(today.getTime() + (60*60*1000*expirehours));
    document.cookie = name + "=" + escape( value ) + "; path=/; domain=" + domain  +"; expires=" + today.toGMTString() + ";";
}

function set_cookie_tmp(name, value, expirehours, domain) {

    var today = new Date();
    today.setTime(today.getTime() + (60*60*1000*expirehours));
    document.cookie = name + "=" + escape( value ) + "; path=/; domain=" + domain  +"; expires=" + today.toGMTString() + ";";
}

function delete_cookie(name, domain) {
    var today = new Date();
    today.setTime(today.getTime() - 1);
    var value = get_cookie(name);

    if (value != '') document.cookie = name + "="+"; path=/; domain=" + domain  +"; expires=" + today.toGMTString();

}

function get_cookie(cname) {
    /*var find_sw = false;
    var start, end;
    var i = 0;
    for (i=0; i<= document.cookie.length; i++) {
        start = i;
        end = start + name.length;
        if (document.cookie.substring(start, end) == name) {
            find_sw = true
            break
        }
    }

    if (find_sw == true) {
        start = end + 1;
        end = document.cookie.indexOf(";", start);
        if (end < start) end = document.cookie.length;
            return document.cookie.substring(start, end);
    }
    return '';*/
	
	 var name = cname + "=";
	 var ca = document.cookie.split(';');
	 for(var i=0; i<ca.length; i++) {
		 var c = ca[i];
	     while (c.charAt(0)==' ') c = c.substring(1);
	     if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	 }
	 return "";
}