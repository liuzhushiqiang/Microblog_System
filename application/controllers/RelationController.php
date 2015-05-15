<?php 
require_once 'BaseController.php';
require_once APPLICATION_PATH . '/models/MbRelation.php';
require_once APPLICATION_PATH . '/models/MbUser.php';

/**
* RelationController
*/
class RelationController extends BaseController
{
	public function showfollowingAction()
	{
		$mbRelation = new MbRelation();
		if (!isset($_SESSION)) {
    		session_start();
		}
		$this->view->res = $mbRelation->getFollowing($_SESSION['uid']);
		$mbUser = new MbUser();
		$this->view->selfInfo = $mbUser->idGetUser($_SESSION['uid']);
	}
}
