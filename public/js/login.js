window.onload = function(){
	if ($.cookie("logName")) {
		$("#user_name_input").val($.cookie("logName"));
		$("#user_password_input").val($.cookie("password"));
	};
	var loginSubmit = document.getElementById("login_submit_button");
	loginSubmit.onclick = function () {
		if ($("#user_name_input").val() == $.cookie("logName") && $("#user_password_input").val() == $.cookie("password")) {
			$("#rememberedPw").val(1);	
		}
		loginSubmit.click();
	};
};