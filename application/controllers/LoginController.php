<?php

require_once APPLICATION_PATH.'/models/Mb_User.php';
require_once APPLICATION_PATH.'/util/Send_Email_Util.php';
require_once 'BaseController.php';

session_start();

class  LoginController extends BaseController{
	/**
	 * [loginAction description]
	 * @return [type] [description]
	 */
	public function loginAction() {		
		$u_email = $_REQUEST['email'];
		$u_pw = $_REQUEST['password'];
		//file_put_contents("debug.txt", "debug login login \r\n", FILE_APPEND);
		$mb_user = new Mb_User();	
		if (($res = $mb_user->login_check($u_email, $u_pw)) != NULL) {
			$_SESSION['nick_name'] = $res[0]['nickname'];
			$_SESSION['user_id'] = $res[0]['id'];
			if ($_REQUEST['keep_login'] == "keep_login") {
				setcookie('user_email', $u_email, time() + 3600 * 24 * 7,
				 "/", "mb.com", false, true);
				setcookie('user_password', base64_encode($u_pw),
				 time() + 3600 * 24 * 7, "/", "mb.com", false, true);
			}
			$this->_redirect("");
		} else {
			$this->view->login_info = "Wrong Passwd";
			$this->_forward("index", "index");
		}
	}

	/**
	 * [logoutAction description]
	 * @return [type] [description]
	 */
	public function logoutAction(){
		unset($_SESSION['user_id']);
		unset($_SESSION['nick_name']);
		setcookie('user_email', null, time() - 1, "/", "mb.com", false, true);
		setcookie('user_password', null, time() - 1, "/", "mb.com", false, true);
		$this->_redirect("");
	}

	public function forgetpasswordAction() {
		$email_address = $_REQUEST['email_address'];
		$user = new Mb_User();
		if ($user->exist_email_address($email_address)) {
			$send_email_util = new Send_Email_Util();
			if ($send_email_util->send_email(
				"liuzhushiqiang@sina.com", "sina18850545881", 
				$email_address, "123456")) {
				if ($user->reset_password($email_address, "123456")) {
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
}
?>