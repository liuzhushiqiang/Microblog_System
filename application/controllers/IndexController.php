<?php

require_once APPLICATION_PATH.'/models/Mb_Post.php';
require_once APPLICATION_PATH.'/models/Mb_Comment.php';

require_once 'BaseController.php';

class IndexController extends BaseController{

    public function indexAction()
    {
    	session_start();
        if (isset($_SESSION['user_id'])) {
            $mb_post = new Mb_Post();
        
            $this->view->res = $mb_post->get_weibo(0);
        
            $this->render("index");
        } else {
            $this->render("login");
        }
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