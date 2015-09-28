
var is_cln = true;



// document.location.href=url;
function dlh(url) {
	cln('dlh - ' + url);
	// window.event.returnValue = false;
	setTimeout(function () {
		$(location).attr('href', url);
	}, 100);
	// $(location).attr('href', url);
	// document.location.href=url;
	window.location.href = url;
}
//a get parametert adja vissza
function get_param(param) {
	var search = window.location.search.substring(1);
	if (search.indexOf('&') > -1) {
		var params = search.split('&');
		for (var i = 0; i < params.length; i++) {
			var key_value = params[i].split('=');
			if (key_value[0] == param)
				return key_value[1];
		}
	} else {
		var params = search.split('=');
		if (params[0] == param)
			return params[1];
	}
	return null;
}

/**
 *
 * @param name
 *            melyik get parameter erteke kell
 * @param url
 * @returns parameter || null
 */
function getURLParameter(name, url) {
	url = (url) ? url : location.search;
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1]);
}


function setCookie(name, value, v_expires) {
	cln('setCookie  - ' + name + ' - expires: ' + v_expires);
	$.cookie(name, value, {
		expires: v_expires,
		path: '/'
	});
}

function getCookie(c_name) {
	cln('getCookie  - ' + c_name);
	var ret = false;
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name) {
			ret = unescape(y);
		}
	}
	return ret;
}

function cl(msg, dimp) {
	var alertFallback = true;
	// var alertFallback = false;// or true;
	if (typeof console === "undefined" || typeof console.log === "undefined") {
		console = {};
		if (alertFallback) {
			console.log = function (msg) {
				alert(msg);
			};
		} else {
			console.log = function () {
			};
		}
	}
	try {
		if (dimp)
			console.log(dump(msg));
		else
			console.log(msg);
	} catch (e) {
	}
}

function cln(msg) {
	if (!is_cln)
		return;
	//writePageTxt('f -> ' + msg);
	if (console.log.apply) {
		var args = Array.prototype.slice.call(arguments);
		args.unshift('f -> ');
		return console.log.apply(console, args);
	}
	console.log('f -> ' + msg);
}
// hibaüzenet consolba küldése és megjelenítése
function cle(e) {
	if (!is_cln)
		return;
	console.log('e -> ################################################', e.message || e);
	//rsBase.writeError2body(e);
}

function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}


/**
 * load js file
 *
 * @param url
 * @param callback
 *            function
 */
function loadScript(url, callback) {
	cln('loadScript - ' + url);
	// adding the script tag to the head as suggested before
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;

	// then bind the event to the callback function
	// there are several events for cross browser compatibility
	script.onreadystatechange = callback;
	script.onload = callback;

	// fire the loading
	head.appendChild(script);
}


/**
 * Function : dump() Arguments: The data - array,hash(associative array),object
 * The level - OPTIONAL Returns : The textual representation of the array. This
 * function was inspired by the print_r function of PHP. This will accept some
 * data as the argument and return a text that will be a more readable version
 * of the array/hash/object that is given. Docs:
 * http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr, level) {
	var dumped_text = "";
	if (!level)
		level = 0;

	// The padding given at the beginning of the line.
	var level_padding = "";
	for ( var j = 0; j < level + 1; j++)
		level_padding += "    ";

	if (typeof (arr) == 'object') { // Array/Hashes/Objects
		for ( var item in arr) {
			var value = arr[item];

			if (typeof (value) == 'object') { // If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value, level + 1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value
				+ "\"\n";
			}
		}
	} else { // Stings/Chars/Numbers etc.
		dumped_text = "===>" + arr + "<===(" + typeof (arr) + ")";
	}
	return dumped_text;
}


function strstr(haystack, needle, bool) {
	// Finds first occurrence of a string within another
	//
	// version: 1109.2015
	// discuss at: http://phpjs.org/functions/strstr
	// + original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// + bugfixed by: Onno Marsman
	// + improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// * example 1: strstr('Kevin van Zonneveld', 'van');
	// * returns 1: 'van Zonneveld'
	// * example 2: strstr('Kevin van Zonneveld', 'van', true);
	// * returns 2: 'Kevin '
	// * example 3: strstr('name@example.com', '@');
	// * returns 3: '@example.com'
	// * example 4: strstr('name@example.com', '@', true); // * returns 4:
	// 'name'
	var pos = 0;

	haystack += '';
	pos = haystack.indexOf(needle);
	if (pos == -1) {
		return false;
	} else {
		if (bool) {
			return haystack.substr(0, pos);
		} else {
			return haystack.slice(pos);
		}
	}
}


// start
// ===================================================================================
// tesztekben használt js function
function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

