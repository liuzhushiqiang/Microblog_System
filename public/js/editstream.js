(function(){
	var target,
		id,
		btn,
		li,
		form,
		text,
		savebtn,
		request;
	this.index.editshow=function(event){
		event=event||window.event;
		EventUtil.preventDefault(event);
		target=EventUtil.getTarget(event);
		btn=target;
		btn.innerHTML="cancel";
		id=target.parentNode.parentNode.getAttribute("data-id");
		li=target.parentNode.parentNode.parentNode;
		content=li.getElementsByTagName('div')[1];
	
		if(content.getAttribute("data-editable")==="false"){
			text=content.innerHTML;
			content.setAttribute("data-editable","true");
			content.setAttribute("data-content",text);
			content.innerHTML=tmpl("edit_tmpl",{edit:text});

			form=content.getElementsByTagName('form')[0];
			savebtn=form.submit;
			EventUtil.addHandler(savebtn,'click',function(event){
				event=EventUtil.getEvent(event);
				EventUtil.preventDefault(event);
				text=form.content.value;
				
				url="edit.php";
				data="pid="+id+"&content="+text+"&action=edit";

				request=createRequest();
				request.open("POST",url,true);
				request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				request.send(data);
				request.onreadystatechange=function(){
					if(request.readyState==4){
						var status=request.status;
						if(status>=200&&status<=300||status==340){
							var result=request.responseText;
							if(result=="success"){
								content.setAttribute("data-editable","false");
								btn.innerHTML="edit";
								content.innerHTML=text;
							}else{
								console.log("failed");
							}
						}
					}
				};
			});
		}else{
			content.setAttribute("data-editable","false");
			text=content.getAttribute("data-content");
			content.innerHTML=text;
			btn.innerHTML="edit";
		}
	};
	this.index.deletestream=function(event){
		event=EventUtil.getEvent(event);
		target=EventUtil.getTarget(event);
		EventUtil.preventDefault(event);

		var cf=confirm("Are you sure to delete this one?");
		if(cf===false)
			return;
		
		id=target.parentNode.parentNode.getAttribute("data-id");
		li=target.parentNode.parentNode.parentNode;
		var ul=li.parentNode;

		request=createRequest();
		url="edit.php?action=delete&pid="+id;
		request.open("GET",url,true);
		request.send(null);
		request.onreadystatechange=function(){
			var status=request.status;
			if(status>=200&&status<=300||status==340){
				var result=request.responseText;
				if(result=="success"){
					ul.removeChild(li);
				}else{
					console.log("failed");
				}
			}
		}
	}
})()