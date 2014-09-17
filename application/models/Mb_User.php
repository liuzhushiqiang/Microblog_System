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
}

?>