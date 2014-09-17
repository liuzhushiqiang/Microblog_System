<?php 

class Mb_Comment extends Zend_Db_Table{
	protected $_name = 'mb_comment';
	
	function get_comment($post_id){
		
		$sql = "select mb_user.profile, mb_user.nickname, mb_comment.content, mb_comment.create_date from mb_user, mb_comment where mb_user.id = mb_comment.uid and mb_comment.pid = $post_id;";
		$db = $this->getAdapter ();
 		file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
		
		$res = $db->query ( $sql )->fetchAll ();
		if(count($res) > 0){				
			return $res;
		}else{
			return $res = NULL;
		}
	}
}

?>