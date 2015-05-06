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
		$serv = new swoole_server("127.0.0.1", 9501);
		$serv->set(array(
		    'worker_num' => 8,   //工作进程数量
		    'daemonize' => true, //是否作为守护进程
		));
		$serv->on('connect', function ($serv, $fd){
		    echo "Client:Connect.\n";
		});
		$serv->on('receive', function ($serv, $fd, $from_id, $data) {
		    $serv->send($fd, 'Swoole: '.$data);
		    $serv->close($fd);
		});
		$serv->on('close', function ($serv, $fd) {
		    echo "Client: Close.\n";
		});
		$serv->start();
	}

	public function test3Action()
	{
		$client = new swoole_client(SWOOLE_SOCK_TCP, SWOOLE_SOCK_ASYNC);
		//设置事件回调函数
		$client->on("connect", function($cli) {
		    $cli->send("hello world\n");
		});
		$client->on("receive", function($cli, $data){
		    echo "Received: ".$data."\n";
		});
		$client->on("error", function($cli){
		    echo "Connect failed\n";
		});
		$client->on("close", function($cli){
		    echo "Connection close\n";
		});
		//发起网络连接
		$client->connect('127.0.0.1', 9501, 0.5);
	}
}
?>