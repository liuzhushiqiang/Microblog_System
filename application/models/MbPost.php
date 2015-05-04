<?php 

class MbPost extends Zend_Db_Table{
	protected $_name = 'mb_post';
	
	function indexgetweibo($userId, $pageSize, $curPage){
		$db = $this->getAdapter();
		$limit1 = ($curPage - 1) * $pageSize;
		$limit2 = $pageSize;
		$sql = 'select mb_post.id, uid, content, images_url, retransmission_id, mb_post.create_time, mb_user.profile_url, mb_user.nickname from mb_post, mb_user where (uid = ' . $db->quoteInto('?', $userId) . ' or uid in (select fid from mb_user_relation where uid=' . $db->quoteInto('?', $userId) . ')) and mb_user.id = mb_post.uid order by create_time desc limit ' . $db->quoteInto('?', $limit1) . ',' . $db->quoteInto('?', $limit2);
		//file_put_contents('./debug.txt', $sql);
		//exit;
		return $db->query ( $sql )->fetchAll ();
	}

	public function idgetweibo($weiboId)
	{
		$db = $this->getAdapter();
		$sql = 'select mb_post.id, uid, content, images_url, retransmission_id, mb_post.create_time, mb_user.profile_url, mb_user.nickname from mb_post, mb_user where mb_post.id = ' . $db->quoteInto('?', $weiboId) . ' and mb_user.id = mb_post.uid';
		//file_put_contents('./debug.txt', $sql);
		//exit;
		return $db->query ( $sql )->fetch();
	}

	public function sendWeibo($uid, $weiboText, $imgsPathServer, $retId, $sendTime)
	{
		$data = array('uid' => $uid, 'content' => $weiboText, 'images_url' => $imgsPathServer, 'retransmission_id' => $retId, 'create_time' => $sendTime);
		return $this->insert($data);
	}
}

?>