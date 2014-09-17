<?php

require_once APPLICATION_PATH.'/models/Mb_Post.php';
require_once APPLICATION_PATH.'/models/Mb_Comment.php';

require_once 'BaseController.php';

class IndexController extends BaseController{

    public function indexAction()
    {
        //������һЩ���⣬����ٽ����
        //1.����֣�render����home������������action��homeAction����css��JS������������,
        //�ѵ�һ��Ҫ��·����baseURL������
        //2.����apache��������������ˣ�ֻ����һ�������������ӳ���е���ң�����о�һ��Apache��
        //zend framework��Դ���ԭ��
        //3.PHP��html�ı��������Ǹ��ӣ�Ҫ���н����
        //4.��ҳͼƬ���ŵ�js����ת��ͼ��û����
    	//file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
    	//file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
    	
    	$mb_post = new Mb_Post();
    	 
    	$this->view->res = $mb_post->get_weibo(0);
    	$this->view->friends = $mb_post->get_friends(0);
        
        $this->render('index');
    }
    
    public function loginAction()
    {
    	$this->render('login');
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

