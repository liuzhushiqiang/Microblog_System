<?php 

require_once 'BaseController.php';
require_once APPLICATION_PATH . '/models/MbPost.php';

if (!isset($_SESSION)) {
    session_start();
}
/**
* WeiboController.php
*/
class WeiboController extends BaseController
{
	public function indexgetweiboAction()
	{
		$pageSize = 5;
		$curPage = $_GET['curPage'];
		$userId = $_SESSION['uid'];
		$mbPost = new MbPost();
		$this->view->weibo = json_encode($mbPost->indexgetweibo($userId, $pageSize, $curPage));
		$this->render('indexgetweibo');
	}

	public function idgetweiboAction()
	{
		$weiboId = $_GET['weiboId'];
		$mbPost = new MbPost();
		$this->view->weibo = json_encode($mbPost->idgetweibo($weiboId));
		$this->render('idgetweibo');
	}

	public function uploadfileAction()
	{
		foreach ($_FILES as $file) {
			$allowType = array('gif', 'png', 'jpg');
			$size = 5000000;
			$path = APPLICATION_PATH . '/../public/image/user_album/';
			$jsonRes = array('code' => 1, 'info' => '');

			if ($file['error'] > 0) {
				switch ($file['error']) {
					case 1:
						$jsonRes['code'] = 1;
						$jsonRes['info'] = "上传文件大小超出了PHP配置文件中的约定值：upload_max_filesize";
						exit(json_encode($jsonRes));
						break;
					case 2:
						$jsonRes['code'] = 1;
						$jsonRes['info'] = "上传文件大小超出表单中的约定值：MAX_FILE_SIZE";
						exit(json_encode($jsonRes));
						break;
					case 3:
						$jsonRes['code'] = 1;
						$jsonRes['info'] = "上传文件只部分被上载";
						exit(json_encode($jsonRes));
						break;
					case 4:
						$jsonRes['code'] = 1;
						$jsonRes['info'] = "没有上传任何文件";
						exit(json_encode($jsonRes));
						break;
					default:
						$jsonRes['code'] = 1;
						$jsonRes['info'] = "未知错误";
						exit(json_encode($jsonRes));
						break;
				}
			}

			$hz = array_pop(explode('.', $file['name']));
			if (!in_array($hz, $allowType)) {
				$jsonRes['code'] = 0;
				$jsonRes['info'] = "这个后缀是<b>($hz)</b>,不是允许的文件类型";
				exit(json_encode($jsonRes));
			}

			if ($file['size'] > $size) {
				$jsonRes['code'] = 0;
				$jsonRes['info'] = "超过了允许的<b>{$size}</b>字节大小";
				exit(json_encode($jsonRes));
			}

			//随机重命名
			$newName = date('YmdHis-') . rand(100000000, 900000000) . ".$hz";

			if (is_uploaded_file($file['tmp_name'])) {
				if (move_uploaded_file($file['tmp_name'], $path . $newName)) {
					$jsonRes['code'] = 1;
					$jsonRes['info'] = "文件{$newName}上传成功，保存在目录{$path}中，大小为{$file['size']}字节";
					$jsonRes['url'] = 'http://' . $_SERVER['HTTP_HOST'] . '/image/user_album/' . $newName;
					exit(json_encode($jsonRes));
				} else {
					$jsonRes['code'] = 0;
					$jsonRes['info'] = "问题:不能将文件移动到指定目录。";
					exit(json_encode($jsonRes));
				}
			} else {
				$jsonRes['code'] = 0;
				$jsonRes['info'] = "问题:上传文件{$file['name']}不是一个合法的文件";
				exit(json_encode($jsonRes));
			}
		}
	}

	public function sendweiboAction()
	{
		$weiboText = $_GET['weiboText'];
		$imgsPathServer = isset($_GET['imgsPathServer'])? $_GET['imgsPathServer']: null;
		$uid = $_SESSION['uid'];
		$retId = isset($_GET['retId'])? $_GET['retId'] : null;
		$sendTime = date('Y-m-d H-i-s');
		$mbPost = new MbPost();
		$updRes = $mbPost->sendWeibo($uid, $weiboText, $imgsPathServer, $retId, $sendTime);
		$res = array('code' => 1, 'info' => '');
		if ($updRes) {
			//$updRes是插入的最后一行的id值，在此表示插入成功
			$res['info'] = $mbPost->idgetweibo($updRes);
		} else {
			$res['code'] = 0;
			$res['info'] = '插入失败';
		}
		$this->view->res = json_encode($res);
	}
}