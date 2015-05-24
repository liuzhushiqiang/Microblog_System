<?php
require_once 'BaseController.php';
require_once APPLICATION_PATH . '/models/MbPost.php';
require_once APPLICATION_PATH . '/models/MbUser.php';

header("Connection: Keep-Alive");

if (!isset($_SESSION)) {
    session_start();
}

class IndexController extends BaseController{

    public function indexAction()
    {
        if (isset($_SESSION['uid'])) {
            $mbUser = new MbUser();
            $this->view->selfInfo = $mbUser->idGetUser($_SESSION['uid']);
            $this->render("index");
        } else {
            $this->_redirect('/login/showwelcome');
        }
    }

    // public function autorefreshAction(){
    //     $mb_post = new Mb_Post();
        
    //     $this->view->res = $mb_post->getmyweibo();
        
    //     $this->render('autorefresh');
    // }
    
    // public function commentAction(){
    //     $mb_comment = new Mb_Comment();
    //     $this->view->res = $mb_comment->get_comment(1);
    //     $this->render('comment');
    // }
    
    // public function jiaguanzhuAction(){
    //     $mb_post = new Mb_Post();
    //     $mb_post->jiaguanzhu();
    //     $this->render('comment');
    // }
    
    // public function sousuoAction(){
    //     $mb_post = new Mb_Post();
    //     $key_word = $_GET['key_word'];
    //     $this->view->res = $mb_post->sousuo($key_word);
    //     $this->render('sousuo');
    // }

    // public function sendweiboAction() {
    //     $mb_post = new Mb_Post();
    //     if($mb_post->insert_post(
    //         $_POST['weibo_text'], 
    //         $_POST['weibo_image'], 
    //         $_POST['retransmitted_id'])) {
    //         //file_put_contents('debug.txt', "come here sendweibo?");
    //         $this->render("sendweiboajax");
    //     } else {
            
    //     }
    // }

    // public function uploadifyAction() {
    //     $tmp_name =$_FILES['file']['tmp_name'];  // 文件上传后得临时文件名
    //     $name     =$_FILES['file']['name'];     // 被上传文件的名称
    //     $size     =$_FILES['file']['size'];    //  被上传文件的大小
    //     $type     =$_FILES['file']['type'];   // 被上传文件的类型
    //     //$dir      = $uploaddir.date("Ym");
    //     //@chmod($dir,0777);//赋予权限
    //     //@is_dir($dir) or mkdir($dir,0777);
    //     //chmod($dir,0777);//赋予权限
    //     $type = explode(".",$name);
    //     $type = @$type[1];
    //     $date   = date("YmdHis");
    //     move_uploaded_file($_FILES['file']['tmp_name'], APPLICATION_PATH."/image/".$date.".".$type);
    //     return $date.".".$type;
    // }

    // public function myweiboAction() {
    //     $mb_post = new Mb_Post();
    //     $this->view->res = $mb_post->getmyweibo();
    //     $this->render('myweibo');
    // }
}