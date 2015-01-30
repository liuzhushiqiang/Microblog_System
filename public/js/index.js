window.onload = function(){
	// var obj = document.getElementById("main_left");
	// var height = obj.offsetHeight;
	// var main_right = obj.nextSibling.nextSibling;
	// main_right.style.height = height;
	//alert(height);
	//alert(main_right.offsetHeight);
	
}



function header_nav_hover(obj){
	obj.style.background = "#414448";
}

function header_nav_out(obj){
	if(obj.className != "header_current_page"){
		obj.style.background = "#4A5055";
	}
}

function show_apps_list(obj){
	obj.style.background = "#ffffff";
	obj.firstChild.style.color = "#000000";
	var list = obj.childNodes[2];
	list.style.display = "block";
}

function hide_apps_list(obj){
	obj.style.background = "#4A5055";
	obj.firstChild.style.color = "#ffffff"; 
	var list = obj.childNodes[2];
	list.style.display = "none";
}

function show_message_list(obj){
	var mes = document.getElementById("message");
	mes.style.background = "#ffffff";
	mes.firstChild.style.color = "#000000";
	var list = document.getElementById("header_message_list");
	list.style.display = "block";
}

function hide_message_list(obj){
	var mes = document.getElementById("message");
	mes.style.background = "#4A5055";
	mes.firstChild.style.color = "#ffffff";
	var list = document.getElementById("header_message_list");
	list.style.display = "none";
}

function show_account_list(obj){
	var mes = document.getElementById("account");
	mes.style.background = "#ffffff";
	mes.firstChild.style.color = "#000000";
	var list = document.getElementById("header_account_list");
	list.style.display = "block";
}

function hide_account_list(obj){
	var mes = document.getElementById("account");
	mes.style.background = "#4A5055";
	mes.firstChild.style.color = "#ffffff";
	var list = document.getElementById("header_account_list");
	list.style.display = "none";
}

/**
 * [change_child_status description]
 * @param  {[type]} child [description]
 * @return {[type]}       [description]
 * 下拉列表通用版本
 * 
 * 写残了，js中颜色值的比较需要自己写转换函数？
 * 自己设置的颜色值是16进制，而js对象输出的颜色值是RGB
 * 所以change_self_status中if条件不成立
 
function change_child_status(child){
	if(child.style.display == "block"){
		child.style.display = "none";
	}else{
		child.style.display = "block";
	}
}


function change_self_status(self){
	//alert((self.style.background));
	if(self.style.background == ""){
		self.style.background = "#ffffff";
		self.firstChild.style.color = "#000000";
	}
	if(self.style.background == "#ffffff"){
		self.style.background = "#4A5055";
		self.firstChild.style.color = "#ffffff";
	}
	if(self.style.backgroundColor == "#4A5055"){
		self.style.background = "#ffffff";
		self.firstChild.style.color = "#000000";
	}
}

function change_header_list(self, child){
	change_self_status(self);
	change_child_status(child);
}

*/

function link_info_item_mouse_over(obj){
	obj.style.fontWeight = "bold";
}

function link_info_item_mouse_out(obj){
	obj.style.fontWeight = "normal";
}

function follow_button_mouse_over(obj){
	obj.style.background = "#000000";
	var ch = obj.childNodes[1];
	ch.style.color = "#ffffff";
}

function follow_button_mouse_out(obj){
	obj.style.background = "#FCFCFC";
	var ch = obj.childNodes[1];
	ch.style.color = "#666666";
}

function add_image_in_weibo(){
	var send_weibo_button = document.getElementById(
		"send_weibo_button");
	send_weibo_button.onclick(function() {
		
	});
}

