(function($){
	$.index={};

	// to get the username
	var url=window.location.toString();
	var reg=/uid=([^&]*)(&|$)/;
	var uid=url.match(reg)[1];
	

	var count=0,
		wf;
	wf=document.getElementById('streamUl');
	request=createRequest();
	if (request==null){
		alert("unable to create request");
		return;
	}
	// water fall
	// window.onload=wfHandler;
	
	EventUtil.addHandler(window,"load",waterfall);
	EventUtil.addHandler(document,"scroll",wfHandler);
	function wfHandler(event){
		var scrollHeight=Geometry.getVerticalScroll();
		var viewHeight=Geometry.getViewportHeight();
		var docHeight=Geometry.getDocumentHeight();
		var height=(scrollHeight+viewHeight);
		if(height>=docHeight){
			waterfall();
		}
	}
	function waterfall(){
		li=document.createElement("li");
		li.innerHTML="loading....";
		li.id="load";
		wf.appendChild(li);
		EventUtil.removeHandler(document,"scroll",wfHandler);
		var url="waterfall.php?action=uc&count="+count+"&uid="+uid;
		request.open("GET", url, true);
		request.onreadystatechange=insertDOM;
		request.send(null);
	}
	function insertDOM(){
		var li,
			form,
			commitBtn,
			commitText,
			result,
			id,
			uid,
			content,
			target,
			type,
			url;

		if(request.readyState == 1){
			
		} else {
			if (request.readyState == 4) {
				var status=request.status;
			    if ( status>= 200 && status<=300 || status==304) {
			      for(var i=0,len=wf.childNodes.length;i<len;i++){
					try{
						if(wf.childNodes[i].innerText=='loading....'||wf.childNodes[i].innerText=='Request Error')
							wf.removeChild(wf.childNodes[i]);
					}
					catch(e){}
					};
		      result=JSON.parse(request.responseText);

		      for(var i=0;i<4;i++){
		      	li=document.createElement("li");
		      	var s=result[i].content;
			    s = s.replace(/&lt;/g, "<");  
			    s = s.replace(/&gt;/g, ">");  
			    result[i].content=s;
			    li.innerHTML=tmpl('wf_tmpl',{stream:result[i]});
		      	// li.innerHTML=tmpl('wf_tmpl',{stream:result[i]});
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
		      	
		      	
		      	
		      	wf.appendChild(li);
		      }

		      // if the result is the last one
		      // we must cancel the 'scroll' event
		      if(result[2].id<=1){
	      		EventUtil.removeHandler(document,"scroll",wfHandler);
	      	}else{
		      	EventUtil.addHandler(document,"scroll",wfHandler);
		      }
		      count++;

			      
			    }else{
			    	load.style.background="red"
			    	load.innerHTML="Request Error";
			    }
		  	}
		  }
		  // this function is in the index_select.js
		  // the create the shortcuts
		  // window.index_select();
	}

})(window)
