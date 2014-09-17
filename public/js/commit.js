(function($){
	var target,
		pid,
		btn,
		li,
		items,
		flag;
	$.index.commitshow=function(event){
		event=event||window.event;
		EventUtil.preventDefault(event);
		target=EventUtil.getTarget(event);
		btn=target.parentNode.parentNode;
		pid=btn.getAttribute("data-id");
		flag=btn.getAttribute("data-flag");
		items=btn.parentNode;

		if(flag==="1"){
			// var div=document.createElement("div");
			var load=document.createElement("div");
			load.id="load";
			load.innerHTML="I'm trying to search who commits this guy..";
			items.appendChild(load);

			request=createRequest();
			if(request==null){
				alert('unable to create request');
				return;
			}
			var url="commit_query.php?pid="+pid;
			request.open("GET", url, true);
			request.onreadystatechange=queryCommit;
			request.send(null);

			// var formdiv=document.createElement("div");
			// formdiv.innerHTML=tmpl('commit_tmpl',{});
			// div.appendChild(formdiv);
			// items.appendChild(li);
		}else{
			while(items.lastChild.nodeName.toLowerCase()!=="ul")
				items.removeChild(items.lastChild);
		}
		btn.setAttribute("data-flag",-flag);
		
	}

function queryCommit(){
	if(request.readyState == 4){
		var status=request.status;
		if(status>=200&&status<=300||status==304){
				items.removeChild(items.lastChild);
				var div=document.createElement("div");
				var result=JSON.parse(request.responseText);
				if(result!==null){
					div.innerHTML=tmpl('commit_tmpl',{commit:result});
					items.appendChild(div);
				}
				var formdiv=document.createElement("div");
				formdiv.innerHTML=tmpl('commitform_tmpl',{});
				items.appendChild(formdiv);
				var commitForm=formdiv.getElementsByTagName('form')[0];
				var btn=commitForm.commitBtn;
				EventUtil.addHandler(commitForm,'submit',function(event){
					event=EventUtil.getEvent(event);
					EventUtil.preventDefault(event);
				});
				EventUtil.addHandler(btn,'click',function(event){
					var content=commitForm.commitText.value;
					var id=commitForm.parentNode.parentNode.childNodes[5].getAttribute("data-id");
					
					if(content!==""){
						request=createRequest();
						var url="commit.php";
						data="uid="+$.uid+"&content="+content+"&pid="+id;
						
						request.open("POST",url,true);
						request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
						request.send(data);
						request.onreadystatechange=function(){
							var result=JSON.parse(request.responseText);
							var div=document.createElement("div");
							div.innerHTML=tmpl('commit_tmpl',{commit:[result]});
							items.insertBefore(div,items.lastChild);
							commitForm.reset();
						}
					}
					
				})
		}
	}
}
})(window)
