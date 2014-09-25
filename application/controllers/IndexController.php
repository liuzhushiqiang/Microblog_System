<?php

require_once APPLICATION_PATH.'/models/Mb_Post.php';
require_once APPLICATION_PATH.'/models/Mb_Comment.php';

require_once 'BaseController.php';

session_start();


class IndexController extends BaseController{

    public function indexAction()
    {
        if (isset($_SESSION['user_id'])) {
            $mb_post = new Mb_Post();
        
            $this->view->res = $mb_post->get_weibo(0);
        
            $this->render("index");
        } else {
            //file_put_contents("debug.txt", "debug index index \r\n", FILE_APPEND);

            if (isset($_COOKIE['user_email']) && isset($_COOKIE['user_password'])) {
                //file_put_contents("debug.txt", "debug index index \r\n", FILE_APPEND);

                $_REQUEST[email] = $_COOKIE['user_email'];
                $_REQUEST[password] = base64_decode($_COOKIE['user_password']); 
                $this->_forward("login", "login");
            } else {
                $this->render("login");
            }
        }
    }

    public function forgetpasswordAction() {
        $this->render("forgetpassword");
    }

    public function autorefreshAction(){
        $mb_post = new Mb_Post();
        
        $this->view->res = $mb_post->get_weibo(10);
        
        $this->render('autorefresh');
    }
    
    public function commentAction(){
        $mb_comment = new Mb_Comment();
        $this->view->res = $mb_comment->get_comment(1);
        $this->render('comment');
    }
    
    public function jiaguanzhuAction(){
        $mb_post = new Mb_Post();
        $mb_post->jiaguanzhu(1);
        $this->render('comment');
    }
    
    public function sousuoAction(){
        $mb_post = new Mb_Post();
        $key_word = $_GET['key_word'];
        $this->view->res = $mb_post->sousuo($key_word);
        $this->render('sousuo');
    }
}