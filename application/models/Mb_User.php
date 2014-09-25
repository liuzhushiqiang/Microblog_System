<?php 

class Mb_User extends Zend_Db_Table{
	protected $_name = 'mb_user';
	
	function login_check($u_email, $u_pw){
		$pw_md5 = md5($u_pw);
		$res = $this->fetchAll("email = '".$u_email."' and pw = '".$pw_md5."'");
		if(count($res) == 1){				
			return $res;
		}else{
			return $res = NULL;
		}
	}

	function exist_email_address($email_address) {
		$res = $this->fetchAll("email = '".$email_address."'");
		if (count($res) == 1) {
			return 1;
		} else {
			return 0;
		}
	}

	function reset_password($email, $new_password) {
		$sql = "update mb_user set pw = '".md5($new_password)."' where email='".$email."';";
		$db = $this->getAdapter ();
// 		file_put_contents(APPLICATION_PATH."/logfile.txt", "OK?", FILE_APPEND);
		
		$res = $db->query ( $sql );
		if(count($res) > 0){				
			return 1;
		}else{
			return 0;
		}
	}
}

?>