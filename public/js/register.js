var form,
	username,
	password,
	repass,
	email,
	btn,
	reg,
	msg,
	emailreg;
	form=document.getElementById('reg-form');
	btn=form.elements['submit'];
	username=form.elements['username'];
	password=form.elements['password'];
	repass=form.elements['repwd'];
	email=form.elements['email'];
	msg=document.getElementById('msg');
	reg=/\s+/;
	emailreg=/^[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/;
disableBtn(btn);
EventUtil.addHandler(username,"blur",function(event){
	event=EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if(target.value==="" || reg.test(target.value)){
		disableBtn(btn);
	} else {
		activeBtn(btn);
	}
});
EventUtil.addHandler(password,"blur",function(event){
	event=EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if(target.value===""){
		disableBtn(btn);
	} else {
		activeBtn(btn);
	}
});
EventUtil.addHandler(repass,"blur",function(event){
	event=EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if(target.value==="" || target.value!==password.value){
		disableBtn(btn);
	} else {
		activeBtn(btn);
	}
})
EventUtil.addHandler(email,"blur",function(event){
	event=EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if(!emailreg.test(target.value)){
		disableBtn(btn);
	} else {
		activeBtn(btn);
	}
})
EventUtil.addHandler(form,"submit",function(event){
	event=EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	btn=target.elements['submit'];
	disableBtn(btn);
	btn.value="LODING";
});