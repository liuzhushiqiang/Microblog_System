<?php 

class Mb_Post extends Zend_Db_Table{
	protected $_name = 'mb_post';
	
	function get_weibo($flag, $page_size, $start_index){
		$sql = null;
		if ($flag) {
			$sql = "select DISTINCT new_user.id, new_user.nickname,  
				new_user.profile, mb_post.content, mb_post.create_time,  
				mb_post.image_url from (select DISTINCT mb_user.id, mb_user.nickname,  
				mb_user.profile from mb_user, mb_user_relation where mb_user.id = ".$_SESSION['user_id']." or (mb_user_relation.uid = ".$_SESSION['user_id']." and mb_user_relation.fid = mb_user.id)) new_user, 
				mb_post where new_user.id = mb_post.uid order by mb_post.create_time desc 
				limit ".$start_index.", ".$page_size.";";
		} else {
			$sql = "select DISTINCT new_user.id, new_user.nickname,  
				new_user.profile, mb_post.content, mb_post.create_time,  
				mb_post.image_url from (select DISTINCT mb_user.id, mb_user.nickname,  
				mb_user.profile from mb_user, mb_user_relation where mb_user.id = ".$_SESSION['user_id']." or (mb_user_relation.uid = ".$_SESSION['user_id']." and mb_user_relation.fid = mb_user.id)) new_user, 
				mb_post where new_user.id = mb_post.uid order by mb_post.create_time desc";
		}
		
		$db = $this->getAdapter ();
// 		file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
		
		$res = $db->query ( $sql )->fetchAll ();
		if(count($res) > 0){				
			return $res;
		}else{
			return $res = NULL;
		}
	}
	
	function get_friends($start_index){
	
		$sql = "select * from mb_user where id >= 1003 and not exists(select * from mb_user_relation where mb_user_relation.uid = 1000 and mb_user_relation.fid = mb_user.id)  
		limit $start_index, 5;";
		$db = $this->getAdapter ();
		// 		file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
	
		$res = $db->query ( $sql )->fetchAll ();
		if(count($res) > 0){
			return $res;
		}else{
			return $res = NULL;
		}
	}
	
	function jiaguanzhu(){
	
		$sql = "insert into mb_user_relation(uid, fid) values(1000, 1004);";
		$db = $this->getAdapter ();
		// 		file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
	
		$db->query ( $sql );
		}
		
	function sousuo($key_word){
	
		$sql = "select mb_user.nickname, mb_user.profile, mb_post.content, mb_post.create_time, mb_post.image_url from mb_user, mb_post where content like '%".$key_word."%' and mb_user.id = ".$_SESSION['user_id']."   
		limit 0, 3;";
		$db = $this->getAdapter ();
		// 		file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
	
		$res = $db->query ( $sql )->fetchAll ();
		if(count($res) > 0){
		return $res;
		}else{
		return $res = NULL;
		}
	}

	function insert_post($weibo_text, $weibo_image,
	 $retransmitted_id) {
		$sql = 
		"insert into mb_post(uid, content, "
			."image_url, retransmitted_id) "
			."values(".$_SESSION[user_id].", '"
			.$weibo_text."', '".$weibo_image."', "
			.retransmitted_id.");";
		$db = $this->getAdapter ();
		// 		file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
	
		return $db->query ( $sql );
	}

	function getmyweibo() {
		$sql = null;
		$sql = "select DISTINCT mb_user.id, nickname,  
				profile, content, mb_post.create_time,  
				mb_post.image_url from mb_user, mb_post
				 where mb_user.id = ".$_SESSION['user_id']." 
				 and mb_user.id = mb_post.uid 
				 order by mb_post.create_time desc 
				limit 0, 5;";
		
		$db = $this->getAdapter ();
// 		file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
		
		$res = $db->query ( $sql )->fetchAll ();
		if(count($res) > 0){				
			return $res;
		}else{
			return $res = NULL;
		}
	}
}

?>