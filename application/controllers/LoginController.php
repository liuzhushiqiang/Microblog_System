<?php

require_once APPLICATION_PATH.'/models/Mb_User.php';
require_once 'BaseController.php';



class  LoginController extends BaseController{
	public function loginAction(){		
		$u_email = $_REQUEST['email'];
		$u_pw = $_REQUEST['password'];
		$mb_user = new Mb_User();	
		if(($res = $mb_user->login_check($u_email, $u_pw)) != NULL){			//file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
			$nickname = $res[0]['nickname'];
			//$_SESSION['nickname'] = $res[0]['nickname'];
			//$_SESSION['uid'] = $res[0]['id'];
			$this->_redirect("index?nickname=$nickname");
		}else{
			$this->view->login_error = 'Wrong Password';
			$this->_forward('login', 'index');
		}
	}
}
?>