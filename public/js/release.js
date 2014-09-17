(function($){
	var releaseForm,
			releaseBtn,
			li,
			request,
			msg,
			url,
			wf,
			uc;
	releaseForm=document.getElementById('re-form');
	releaseBtn=document.getElementById('releaseBtn');
	msg=document.getElementById('msg');
	wf=document.getElementById('streamUl');
	uc=document.getElementById('uc');

	// to get the username
	for(var i=0,len=uc.childNodes.length;i<len;i++){
		if(uc.childNodes[i].nodeName.toLowerCase()==="a"){
			$.username=uc.childNodes[i].innerHTML;
			$.uid=uc.childNodes[i].getAttribute("href");
			$.uid=$.uid.replace(/uc\.php\?uid\=/,"");
			break;
		}
	}

	EventUtil.addHandler(releaseBtn,'click',function(event){
		// event=event||window.event
		event=EventUtil.getEvent(event);
		// target=event.target||event.srcElement;
		target=EventUtil.getTarget(event);
		target=target.parentNode.parentNode;
		EventUtil.preventDefault(event);

		content=target.content.value;
		if(/^\s+/.test(content)){
			msg.innerHTML='cannot start with white space';
			disableBtn(releaseBtn);
			return;
		}

		request=createRequest();
		if(request==null){
			alert('unable to create request');
			return;
		}

		li=document.createElement("li");
		li.innerHTML="I'm trying to create a message to your followers....";
		li.id="load";
		wf.insertBefore(li,wf.firstChild);

		url="release_ok.php";
		var type=target['type'].value;
		var content=target['content'].value;
		var data="type="+type+"&content="+content;
		request.open("POST",url,true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		request.send(data);
		request.onreadystatechange=releaseOk;
		
	});
	function releaseOk(){
		if(request.readyState == 4){
			var status=request.status;
			if(status>=200 && status<=300 || status==304){
				wf.removeChild(wf.firstChild);
				var result=JSON.parse(request.responseText);
				// to add username to reuslt
				result.user=$.username;

				li=document.createElement("li");
				li.innerHTML=tmpl('wf_tmpl',{stream:result});

				// add commmit event
				var btns=li.getElementsByTagName('ul');
		      	var btn=btns[0].getElementsByTagName('li');
		      	var a=btn[0].getElementsByTagName('a');
		      	var re=btn[1].getElementsByTagName('a');
		      	EventUtil.addHandler(a[0],'click',$.index.commitshow);
		      	EventUtil.addHandler(re[0],'click',$.index.retweetshow);
				if(btn[2]){
		      		var edit=btn[2].getElementsByTagName('a');
		      		EventUtil.addHandler(edit[0],'click',$.index.editshow);
		      		var del=btn[3].getElementsByTagName('a');
		      		EventUtil.addHandler(del[0],'click',$.index.deletestream);
		      	}

		      	var userdiv=li.getElementsByTagName('div')[0];
		      	var user=userdiv.getElementsByTagName('a')[0];
		      	EventUtil.addHandler(user,'mouseover',$.index.showinfo);
		      	EventUtil.addHandler(user,'mouseout',$.index.hiddeninfo);

				wf.insertBefore(li,wf.firstChild);
				releaseForm.reset();
			}else{
				wf.firstChild.innerHTML="oh, WTF!";
				wf.firstChild.style.background="red";
			}
		}
	}
})(window)