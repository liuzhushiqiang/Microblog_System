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

	public function test2Action()
	{
		$http = new swoole_http_server("0.0.0.0", 9501);

$http->on('request', function ($request, $response) {
    $response->gzip();
    $response->header("Content-Type", "text/html; charset=utf-8");
    $response->end("<h1>Hello Swoole. #".rand(1000, 9999)."</h1>");
});
	}

	public function test3Action()
	{
	}
}
?>