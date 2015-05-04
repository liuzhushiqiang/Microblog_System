function super_function_type_onclick(obj)
{
	$(obj).next().css("display", "block");
}

function emoItemOnmouseenter (obj) {
	$(obj).children(".emoHint").css("display", "block");
}


function emoItemOnmouseleave (obj) {
	$(obj).children(".emoHint").css("display", "none");
}

function emoOnclick (obj) {
	var emoText = $(obj).children().children("img").attr("name");
	$("#send_weibo_textarea").val($("#send_weibo_textarea").val() + "[" + emoText + "]");
	$("#send_weibo_textarea").focus();
	$(obj).parent().parent().parent().css("display", "none");
}

function send_weibo_with_super_function_hidden_panel_close_onclick(obj)
{
	var send_weibo_with_super_function_hidden
	= obj.parentNode.parentNode.parentNode.parentNode;
	send_weibo_with_super_function_hidden.style.display = "none";
}

//这个函数依赖于showOneWeibo.js
function sendWeibo () {
	function appendWeibo (newWeiboValue) {
		$("#content").prepend(showOneWeibo(newWeiboValue));
	}
	//接受可选的参数arguments[0]
	var imgsPathServer = arguments[0]? arguments[0]: "";
	var weiboText = $("#send_weibo_textarea").val();
	$.ajax({
		url: "/weibo/sendweibo",
		type: "get",
		data: {"weiboText": weiboText, "imgsPathServer": imgsPathServer},
		dataType: "json",
		success: function (data) {
			if (data.code) {
				//服务器端发微博成功
				//data.code == 1的时候表示服务器发微博成功
				//data.info代表已发微博的信息(来自数据库)
				
				//显示该条微博
				appendWeibo(data.info);
				//隐藏功能panel
				$(".send_weibo_with_super_function_hidden_panel_close").click();
				//清空输入域
				$("#send_weibo_textarea").val("");
			} else {
				//服务器端发微博失败
				alert("微博发送失败：服务器发送失败");
			}
		},
		error: function () {
			alert("微博发送失败");
		}
	})
}

function uploadInit () {
	function previewImage(file,callback){
		//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
		if(!file || !/image\//.test(file.type)) return; //确保文件是图片
		if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
			var fr = new mOxie.FileReader();
			fr.onload = function(){
				callback(fr.result);
				fr.destroy();
				fr = null;
			}
			fr.readAsDataURL(file.getSource());
		}else{
			var preloader = new mOxie.Image();
			preloader.onload = function() {
				preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
				//得到图片src,实质为一个base64编码的数据
				var imgsrc = preloader.type=='image/jpeg' ? 
				preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL();
				callback && callback(imgsrc); //callback传入的参数为预览图片的url
				preloader.destroy();
				preloader = null;
			};
			preloader.load( file.getSource() );
		}	
	}

	var uploader = new plupload.Uploader({ //实例化一个plupload上传对象
		browse_button : 'send_weibo_with_super_function_hidden_panel_item_add_image',
		url : '/weibo/uploadfile',
		flash_swf_url : '/js/plupload/Moxie.swf',
		silverlight_xap_url : '/js/plupload/Moxie.xap',
		filters: {
		  mime_types : [ //只允许上传图片文件
		    { title : "图片文件", extensions : "jpg,gif,png" }
		  ],
		  max_file_size: "5mb"
		}
	});	
	uploader.init(); //初始化


	//绑定文件添加进队列事件
	uploader.bind('FilesAdded', function(uploader,files){
		for(var i = 0, len = files.length; i<len; i++){
			var file_name = files[i].name; //文件名
			//构造html来更新UI
			$preImg = $("<div class=\"send_weibo_with_super_function_hidden_panel_item\">\
	            	<img class=\"send_weibo_with_super_function_hidden_panel_item_image_preview\" id=file-" + files[i].id + " src=\"\"/>\
					<a href=\"#\"><div class=\"send_weibo_with_super_function_hidden_panel_item_delete_image\">\
						<div class=\"send_weibo_with_super_function_hidden_panel_item_delete_image_text\">删除</div>\
					</div></a>\
				</div>");
			$("#send_weibo_with_super_function_hidden_panel_item_add_image").parent().parent().before($preImg);
			(function ($preImgTmp) {
				$preImgTmp.children("a").children(":first").click(function () {
					uploader.removeFile(uploader.getFile($preImgTmp.children("img").attr("id").substring(5)));
					$preImgTmp.remove();
				});
			})($preImg);
			(function (i) {
				previewImage(files[i], function (imgSrc) {
					$("#file-" + files[i].id).attr("src", imgSrc);
				});
			})(i);
		}
	});

	uploader.bind("Error", function (uploader, errObject) {
		//客户端文件上传操作出错
		window.alert("文件上传失败：" + errObject.message);
		uploader.destroy();
		uploadInit(sendWeibo);
	})

	var imgsPathServer = "";

	uploader.bind("FileUploaded", function (uploader, file, responseObject) {
		//检查服务器端文件上传操作是否出错
		if (responseObject.status == 200 && eval("(" + responseObject.response + ")").code == 1) {
			//服务器端上传成功
			imgsPathServer += eval("(" + responseObject.response + ")").url + ";";
		} else {
			window.alert("文件上传失败：服务器上传失败");
			uploader.destroy();
			uploadInit(sendWeibo);
		}

	});

	uploader.bind("UploadComplete", function (uploader, files) {
		//图片上传成功后，再发送微博文本内容
		imgsPathServer = imgsPathServer.substring(0, imgsPathServer.length - 1);
		sendWeibo(imgsPathServer);
		//不管文本内容发送成功还是失败都要清空图片预览和uploader对象，如果只是图片发送成功而文本内容发送失败服务器端会有垃圾图片(数据库中不存在url指向这些图片的记录，因为server端插入数据库没有成功，如果需要保证 发送文本内容和发送图片内容的“事务性”略复杂（因为我发送两种请求是用的不同的ajax实例）)
		$(".send_weibo_with_super_function_hidden_panel_item:not(#addImg)").remove();
		uploader.destroy();
		uploadInit(sendWeibo);
	});

	$("#send_weibo_button").click(function () {
		if (uploader.files) {
			//开始上传图片
			uploader.start();
			//如果图片全部上传成功，之后UploadComplete事件的回调函数会继续发送微博文本
		} else {
			//发不带图片的微博
			sendWeibo();
		}
	});
}

$(document).ready(function () {
	uploadInit(sendWeibo);
});