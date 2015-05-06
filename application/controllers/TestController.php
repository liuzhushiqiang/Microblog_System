<?php 
require_once APPLICATION_PATH . '/../library/predis-1.0/autoload.php';
/**
* TestController
*/
class TestController extends Zend_Controller_Action
{
	public function test1Action()
	{
		$redis = new Predis\Client(array(
			'scheme' => 'tcp',
			'host' => '127.0.0.1',
			'post' => 6379 
			));
		$this->view->res = $redis->get('name');
	}
}
?>