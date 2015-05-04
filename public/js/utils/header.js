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