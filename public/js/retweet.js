(function($){
	var target,
		id,
		btn;
	$.index.retweetshow=function(event){
		event=event||window.event;
		EventUtil.preventDefault(event);
		target=EventUtil.getTarget(event);
		id=target.parentNode.parentNode.getAttribute("data-id");
		alert("retweet:stream"+id);
	}
})(window)