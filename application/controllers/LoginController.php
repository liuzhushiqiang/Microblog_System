<?php

require_once APPLICATION_PATH.'/models/MbUser.php';
require_once APPLICATION_PATH.'/util/class.phpmailer.php';
require_once 'BaseController.php';

if (!isset($_SESSION)) {
    session_start();
}

class LoginController extends BaseController{
	/**
	 * [loginAction description]
	 * @return [type] [description]
	 */
	public function loginAction() {
		$email = $_POST['logName'];
		$pw = $_POST['password'];
		if ($_POST['rememberedPw'] == 0) {
			$pw = md5($pw);
		}
		$mbUser = new MbUser();
		if (($res = $mbUser->loginCheck($email, $pw)) != NULL) {
			$_SESSION['nickName'] = $res['nickname'];
			$_SESSION['uid'] = $res['id'];
			if ($_POST['keep_login']) {
				setcookie('logName', $email, time() + 3600 * 24 * 7,
				 "/", $_SERVER['HTTP_HOST'], false, false);
				setcookie('password', $pw,
				 time() + 3600 * 24 * 7, "/", $_SERVER['HTTP_HOST'], false, false);
			}
			$this->_redirect("/index/index");
		} else {
			$this->view->loginInfo = "用户名或密码错误！";
			$this->render("showwelcome");
		}
	}

	public function showwelcomeAction()
	{
		$this->render('showwelcome');
	}

	/**
	 * [logoutAction description]
	 * @return [type] [description]
	 */
	public function logoutAction(){
		unset($_SESSION['nickName']);
		unset($_SESSION['uid']);
		setcookie('logName', null, time() - 1, "/", "mb.com", false, true);
		setcookie('password', null, time() - 1, "/", "mb.com", false, true);
		$this->_redirect("/login/showwelcome");
	}

	public function getNewPw()
	{
		$newPw = "";
		for ($i=0; $i < 16; $i++) { 
			$newPw .= chr(mt_rand(48, 122));
		}
		return $newPw;
	}

	//这个邮件发送函数还不够灵活，包括认证方式，邮件服务器（有自己的邮局就会更好）
	public function send_email($sender_username, $sender_password, $receiver_username, $receiver_new_password) {
		$mail = new phpmailer ();
		$mail->CharSet = "utf-8";
		$mail->Mailer = "smtp";
		$mail->SMTPAuth = true;	
		$mail->Username = $sender_username;	//这里填写完整的邮箱用户名（发送邮箱）
		$mail->Password = $sender_password;	//这里要填真实的密码
		//下面的变量是用来设置在邮件接收方如何显示邮件信息的，from、fromName可以自己设置并不要求和真实邮件地址相同
		$mail->From = "liuzhushiqiang@sina.com";
		$mail->FromName = "mb.com";
		$mail->Host = "smtp.sina.com";

		$mail->Port = 25;
		
		$mail->Subject = "Reset Password";
		//如果没有在前面设置utf-8编码，中文会出问题
		$mail->Body = "Your new password:".$receiver_new_password.
		".\r\nTake it private please!\r\n";
		$mail->AddAddress ($receiver_username);	//这里填写接受者的完成邮箱用户名
		//$mail->AddAttachment("c:/test.txt");	//这里发送附件
		
		if (!$mail->Send ()){
			return 0;
		}else{
			return 1;
		}
	}

	public function forgetpasswordAction() {
		$email_address = $_REQUEST['email_address'];
		$user = new mbUser();
		if ($user->exist_email_address($email_address)) {
			$newPw = $this->getNewPw();
			if ($this->send_email(
				"liuzhushiqiang@sina.com", "sina18850545881", 
				$email_address, $newPw)) {
				if ($user->reset_password($email_address, $newPw)) {
					$this->view->reset_password_info = 
					"Success!";
					$this->_forward("forgetpassword", "index");
				} else {
					$this->view->reset_password_info = 
					"Error!";
					$this->_forward("forgetpassword", "index");
				}
			} else {
				$this->view->reset_password_info = 
				"Error!";
				$this->_forward("forgetpassword", "index");
			}
		} else {
			//该邮箱没有注册过
			$this->view->reset_password_info = 
				"Invalid email address!";
			$this->_forward("forgetpassword", "index");
		}
	}

	public function showforgetAction()
	{
		$this->render('showforget');
	}
}
?>