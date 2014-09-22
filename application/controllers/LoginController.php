<?php

require_once APPLICATION_PATH.'/models/Mb_User.php';
require_once 'BaseController.php';



class  LoginController extends BaseController{
	public function loginAction(){
		session_start();

        if (isset($_SESSION['nick_name'])) {
        	//already login
            $mb_post = new Mb_Post();
        
            $this->view->res = $mb_post->get_weibo(0);
            $this->view->friends = $mb_post->get_friends(0);
        
            $this->_forward("index", "index");
        } else {
        	//need login
            $this->view->login_info = "Please log in!";
            $this->render("login");
        }


	// 	$u_email = $_Post['email'];
	// 	$u_pw = $_Post['password'];
	// 	$mb_user = new Mb_User();	
	// 	if(($res = $mb_user->login_check($u_email, $u_pw)) != NULL){			
	// 	//file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
	// 		$nickname = $res[0]['nickname'];
	// 		//$_SESSION['nickname'] = $res[0]['nickname'];
	// 		//$_SESSION['uid'] = $res[0]['id'];
	// 		$this->_redirect("index?nickname=$nickname");
	// 	}else{
	// 		$this->view->login_error = 'Wrong Password';
	// 		$this->render("login/login");
	// 	}
		}
}
?>