/**
 * 构造某微博的显示html（包括转发和原文）
 * @param  {object} newWeiboValue weibo对象，查数据库得到
 * @return {string}               用来追击的html字符串
 */
function showOneWeibo (newWeiboValue) {
	function showContent (content) {
		var con = content.split(/\[([^\]]*)\]/g);
		var ret = "";
		for (var i = 0; i < Math.floor(con.length / 2); i++) {
			ret += con[i * 2] + "<img class=\"showEmo\" src=\"/image/emotion/" + con[i * 2 + 1] + ".gif\">";
		};
		ret += con[con.length - 1];
		return ret;
	}

	var newWeiboHtml = "<div class=\"new_weibo\" weiboId=\"" + newWeiboValue.id + "\">\
									<div class=\"new_weibo_user_name\">\
										<a\ href=\"#\"><img src=\"" + newWeiboValue.profile_url + "\">" + newWeiboValue.nickname + "</a>\
									</div>\
									<div class=\"newWeiboConWrap\">\
										<div class=\"new_weibo_content\">" + showContent(newWeiboValue.content) + "</div>";
				if (newWeiboValue.images_url) {
					var images = newWeiboValue.images_url.split(";");
					newWeiboHtml += "<div class=\"imgsWrap\">";
					$.each(images, function (key, value) {
						newWeiboHtml += "<a href=\"#\"><img src=\"" + value + "\"></a>";
					});
					newWeiboHtml += "</div></div>";
				} else {
					if (newWeiboValue.retransmission_id) {
						do {
							var flag = 1;
							$.ajax({
								url: "weibo/getoneweibo", 
								type: "get", 
								data: {"weiboId": newWeiboValue.retransmission_id}, 
								dataType: "json", 
								success: function (retWeibo) {
									if (!retWeibo.retransmission_id) {
										newWeiboHtml += "</div><div class=\"retransOriginWrap\">\
										<div c\lass=\"retransOriginUserName\">\
											<a\ href=\"#\">@" + retWeibo.nickname + "</a>\
										</div>\
										<div class=\"retransOriginContent\">" + showContent(retWeibo.content) + "</div>\
										<div class=\"imgsWrap\">\
											<a href=\"#\"><img src=\"" + retWeibo.profile_url + "\"></a>\
										</div>\
										<div class=\"weibo_info\">\
											<div class=\"date_time\">\
												<a href=\"#\">" + retWeibo.create_time + "</a>\
											</div>\
											<div class=\"from_address\"> 来自网站 </div>\
											<div class=\"comment_and_retransmission\">\
												<a href=\"#\">原文转发</a> | <a href=\"#\">原文评论</a>\
											</div>\
											<div class=\"clear\"></div>\
										</div>\
										</div>";
										flag = 0;
									} else {
										newWeiboHtml += "<div class=\"retransUserName\">\
											//<a href=\"#\">@" + retWeibo.nickname + "</a>：\
										</div>\
										<div class=\"retransContent\">\
											" + showContent(retWeibo.content) + "\
										</div>";
									}
								},
								error: function () {
									alert("访问出错");
								}
							});
						} while(flag);
					}
				}

				newWeiboHtml += "<div class=\"weibo_info\">\
					<div class=\"date_time\">\
						<a href=\"#\">" + newWeiboValue.create_time + "</a>\
					</div>\
					<div class=\"from_address\"> 来自网站 </div>\
					<div class=\"comment_and_retransmission\">\
						<a href=\"#\">转发</a> | <a href=\"#\">收藏</a> | <span id=\"comment\" cursor=\"pointer\">评论</span>\
					</div>\
					<div class=\"clear\"></div>\
				</div></div>";
				return newWeiboHtml;
}