<?php
	/**
	* mb_relation
	*/
class MbRelation extends Zend_Db_Table
{
	protected $_name = 'mb_user_relation';

	public function getFollowing($uid)
	{
		$db = $this->getAdapter();
		$sql = 'select * from mb_user where id in(select mb_user_relation.fid from mb_user, mb_user_relation where mb_user.id = ' . $db->quoteInto('?', $uid) . ' and mb_user.id = mb_user_relation.uid) order by id limit 0,10';
		//file_put_contents('./debug.txt', $sql);
		//exit;
		return $db->query ( $sql )->fetchAll ();
	}
}
?>