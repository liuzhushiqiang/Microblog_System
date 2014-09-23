<?php

require_once APPLICATION_PATH.'/models/Mb_User.php';
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

		$mb_user = new Mb_User();	
		if (($res = $mb_user->login_check($u_email, $u_pw)) != NULL) {
			$_SESSION['nick_name'] = $res[0]['nickname'];
			$_SESSION['user_id'] = $res[0]['id'];
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
		session_destroy();
		$this->_forward("index", "index");
	}
}
?>