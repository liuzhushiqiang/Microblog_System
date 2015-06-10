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
}