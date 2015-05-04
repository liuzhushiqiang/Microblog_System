//这个函数依赖于showOneWeibo.js
function showWeibo () {
		$.ajax({
			url: "/weibo/indexgetweibo",
			type: "get",
			data: {"curPage": 1},
			dataType: "json",	
			success: function (data) {
			$.each(data, function (newWeiboKey, newWeiboValue) {
				$("#content").append(showOneWeibo(newWeiboValue));
			})
		},
		error: function () {
			alert("访问出错");
		}
	});
}

$("document").ready(function () {
	showWeibo();
})