<?php

require_once APPLICATION_PATH.'/models/Mb_Post.php';
require_once APPLICATION_PATH.'/models/Mb_Comment.php';

require_once 'BaseController.php';

class IndexController extends BaseController{

    public function indexAction()
    {
    	$this->_forward("index", "Weibo");
    }
}