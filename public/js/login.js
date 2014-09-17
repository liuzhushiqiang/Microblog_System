var email,
	password,
	login,
	reg,
	msg,
	loginForm,
	background;
	email=document.getElementById('email');
	password=document.getElementById('password');
	login=document.getElementById('login');
	msg=document.getElementById('msg');
	loginForm=document.getElementById('loginForm');
	reg=/\s+/;
	background=document.getElementById('background');

window.onload=function(){
	disableBtn();
	email.onblur=testemail;
	email.onkeydown=clearMsg;
	password.onblur=testPwd;
	password.onkeydown=clearMsg;
	if(msg.innerHTML==""){
		activeBtn();
	}
	loginForm.submit=function(){
		testemail();
		testPwd();
		this.submit();
	}
	var num=Math.ceil(Math.random()*3);
	background.src="../image/"+num+".jpg";
	setInterval(function(){
		var num=Math.ceil(Math.random()*3);
		background.src="../image/"+num+".jpg";
		fadeIn(background);
	},10000);


}

function fadeOut(element) {
	for(var i=0;i<20;i++){
		(function(){
			var pos=100-i*5;
			setTimeout(function(){
				setOpacity(element,pos)
			},i*50);
		})(i)
	}
}
function fadeIn(element){
	setOpacity(element,0);
	for(var i=0;i<20;i++){
		(function(){
			var pos=i*5;
			setTimeout(function(){
				setOpacity(element,pos)
			},i*50);
		})(i)
	}
}
function setOpacity(element, level){
	if(element.filter){
		element.style.filter="alpha(opacity="+level+")";
	}else{
		element.style.opacity=level/100;
	}
}




function testemail(){
	if(this.value==="" || reg.test(this.value)){
		msg.innerHTML="email cannot empty!";
		// email.focus();
		disableBtn();
	}else if(!/^[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/.test(this.value)){
		msg.innerHTML="only email";
		disableBtn();
	}
	checkreg(this.value);
}
function checkreg(string){
	request=createRequest();
	url="checkreg.php";
	data="email="+this.value;
	request.open("POST",url,true);
	request.setRequestHeader("Content-Type","application/x-www-form-urlendcoded");
	request.send(data);
	request.onreadystatechange=function(){
		if(request.readyState == 4){
			var status=request.status;
			if(status>=200 && status<=300 || status==304){
				console.log(request.responseText);
			}
		}
	}
}
function testPwd(){
	if(this.value==="" || reg.test(this.value)){
		msg.innerHTML="password cannot empty!";
		// password.focus();
		disableBtn();
	}
}
function disableBtn(){
	login.disabled=true;
	login.style.background="#ccc";
}
function activeBtn(){
	login.disabled=false;
	login.style.background="#5cc5ba";
}
function clearMsg(){
	msg.innerHTML="";
	activeBtn();
}
