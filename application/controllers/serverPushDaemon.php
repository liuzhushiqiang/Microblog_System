<?php 
set_time_limit(0);
require_once 'predis-1.0/autoload.php';

$redis = new Predis\Client(array('host' => '127.0.0.1', 'post' => 6379));
while (1) {
	$weiboHashKey = null;
	while (!($weiboHashKey = $redis->brPop('weiboTask', 10))) {
		//循环体为空
	}
	$weiboHashKey = $weiboHashKey[1];
	$weiboData = $redis->hgetall($weiboHashKey);
	$inlineFriends = $redis->sinter('inline', 'user:' . $redis->hget($weiboHashKey, 'uid') . ':followed');
	foreach ($inlineFriends as $key => $value) {
		$redis->lPush('push:user:' . $value, json_encode($weiboData));
	}
}	
?>