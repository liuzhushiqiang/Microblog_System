<?php

require_once APPLICATION_PATH.'/models/Mb_Post.php';
require_once APPLICATION_PATH.'/models/Mb_Comment.php';
require_once APPLICATION_PATH.'/util/PageClass.php';
require_once APPLICATION_PATH.'/models/Mb_User.php';

require_once 'BaseController.php';

session_start();

/**
 * to do:
 * http://www.cnblogs.com/jackluo/p/3728933.html
 * http://vistaswx.com/blog/article/php-server-push
 * http://tech.techweb.com.cn/thread-439108-1-1.html
 */

class IndexController extends BaseController{

    public function indexAction()
    {
        if (isset($_SESSION['user_id'])) {
            /**
             * 分页显示
             */
            $mb_post = new Mb_Post();
            $rowsPerPage = 5;    //perPage recordes  
            $curPage = 1;
            if($this->_request->getParam('page')) {
               $curPage = $this->_request->getParam('page');
            }
            //search data and display
            $this->view->res = $mb_post->get_weibo(true, $rowsPerPage, 
                ($curPage-1)*$rowsPerPage);
            $rows = count($mb_post->get_weibo(false));
            $Pager = new PageClass($rows,$rowsPerPage); 
            $this->view->pagebar = $Pager->getNavigation();

            //get friends
            $this->view->friends = $mb_post->get_friends(0);  
        
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
        
        $this->view->res = $mb_post->getmyweibo();
        
        $this->render('autorefresh');
    }
    
    public function commentAction(){
        $mb_comment = new Mb_Comment();
        $this->view->res = $mb_comment->get_comment(1);
        $this->render('comment');
    }
    
    public function jiaguanzhuAction(){
        $mb_post = new Mb_Post();
        $mb_post->jiaguanzhu();
        $this->render('comment');
    }
    
    public function sousuoAction(){
        $mb_post = new Mb_Post();
        $key_word = $_GET['key_word'];
        $this->view->res = $mb_post->sousuo($key_word);
        $this->render('sousuo');
    }

    public function sendweiboAction() {
        $mb_post = new Mb_Post();
        if($mb_post->insert_post(
            $_REQUEST['weibo_text'], 
            $_REQUEST['weibo_image'], 
            $_REQUEST['retransmitted_id'])) {
            //file_put_contents('debug.txt', "come here sendweibo?");
            $this->render("sendweiboajax");
        } else {
            
        }
    }

    public function uploadifyAction() {
        $tmp_name =$_FILES['file']['tmp_name'];  // 文件上传后得临时文件名
        $name     =$_FILES['file']['name'];     // 被上传文件的名称
        $size     =$_FILES['file']['size'];    //  被上传文件的大小
        $type     =$_FILES['file']['type'];   // 被上传文件的类型
        //$dir      = $uploaddir.date("Ym");
        //@chmod($dir,0777);//赋予权限
        //@is_dir($dir) or mkdir($dir,0777);
        //chmod($dir,0777);//赋予权限
        $type = explode(".",$name);
        $type = @$type[1];
        $date   = date("YmdHis");
        move_uploaded_file($_FILES['file']['tmp_name'], APPLICATION_PATH."/image/".$date.".".$type);
        return $date.".".$type;
    }

    public function myweiboAction() {
        $mb_post = new Mb_Post();
        $this->view->res = $mb_post->getmyweibo();
        $this->render('myweibo');
    }
}