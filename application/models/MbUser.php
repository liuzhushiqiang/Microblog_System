<?php 

class MbUser extends Zend_Db_Table{
	protected $_name = 'mb_user';
	
	function loginCheck($email, $pw){
		$db = $this->getAdapter();
		$where = $db->quoteInto('email = ?', $email) . $db->quoteInto('and pw = ?', $pw);
		return $this->fetchRow($where);
	}

	function exist_email_address($email_address) {
		$db = $this->getAdapter();
		$where = $db->quoteInto('email = ?', $email_address);
		return $this->fetchRow("email = '".$email_address."'");
	}

	function reset_password($email, $new_password) {
		$db = $this->getAdapter();
		$set = array('pw' => md5($new_password));
		$where = $db->quoteInto('email = ?', $email);		
		return $this->update($set, $where);
	}

	public function idGetUser($userId)
	{
		$db = $this->getAdapter();
		$where = $db->quoteInto('id=?', $userId);
		return $this->fetchRow($where);
	}
}

?>