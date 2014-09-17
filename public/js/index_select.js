(function($){
	// this javascript file is use to 
	// make the 'j' 'k' and so on
	// to make use
	// such like 'j' is next stream 
	// and 'k' is previous stream 
	// 'l' is to retweet

	$.index_select=function(){
		
		var wf,
			li,
			current,
			count,
			top;
		wf=document.getElementById('streamUl');
		li=wf.getElementsByTagName('li');
		top=wf.offsetTop;
		count=0;
		EventUtil.addHandler(document,'keypress',function(event){
			event=EventUtil.getEvent(event);
			var code=EventUtil.getCharCode(event);
			var key=String.fromCharCode(code);
			window.scroll(0,top);
			if(key==="j"){
				// li[count].className="current";
				// li[count-1].className="";
				top=li[count++].offsetTop;

			}else if(key==="k"){
				// li[count].className="current";
				// li[count+1].className="";
				top=li[count--].offsetTop;
			}
		});
	}
})(window)

