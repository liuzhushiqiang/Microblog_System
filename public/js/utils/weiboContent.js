//这个函数依赖于showOneWeibo.js
function showWeibo (curPage) {
		$.ajax({
			url: "/weibo/indexgetweibo",
			type: "get",
			data: {"curPage": curPage},
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
	showWeibo(1);
})