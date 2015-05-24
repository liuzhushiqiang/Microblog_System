//这个函数依赖于showOneWeibo.js
$(document).ready(function () {
	function connect () {
		$.ajax({
			"url": "/weibo/pushweibo",
			"type": "GET",
			"dataType": 'json',
			"success": function (data) {
				//显示一条微博（data是html字符串）
				//当data不为null的时候才需要显示data的内容
				if (data){
					$("#weiboHint").css("display", "block");
					$("#weiboHint").click(function () {
						$("#content").prepend(showOneWeibo(data));
						$("#weiboHint").css("display", "none");
					});
				}
				//setTimeout(function () {connect();}, 5000);
			},
			"error": function () {
				//alert("error");
				//这里如果不把setimeout的回调函数封装到一个fun里会有浏览器兼容性问题，chrome和火狐settimeout会失效
				//setTimeout(function () {connect();}, 5000);
			}
		});
	}
	setInterval(
		function () {
			connect();
		},
		5000
	);
});