/*这个sql语句ok了， 取id为指定值的用户的主页要显示的微博（自己的微博和关注的人的微博）*/
select id, uid, content, images_url, retransmission_id from mb_post where uid = 1000 or uid in (select fid from mb_user_relation where uid=1000) order by create_time desc;

/*这个sql语句ok了， 取某人关注的的用户的信息*/
select mb_user_relation.fid, nickname, gender, address, introduction, work_at, profile_url, mb_user_relation.create_time from mb_user, mb_user_relation where mb_user.id = mb_user_relation.uid and mb_user_relation.uid=1000 order by mb_user_relation.create_time desc limit 0, 20;

/*初始化数据库密码*/
UPDATE user SET password=password('root') WHERE user='root';

/*查找某个用户的所有关注的人的信息*/
select * from mb_user where id in(select mb_user_relation.fid from mb_user, mb_user_relation where mb_user.id = 1000 and mb_user.id = mb_user_relation.uid);

/*后台守护进程*/
http://centos.testphp.com/serverPushDaemon.php

/*测试发微博的url*/
http://centos.mb.com/weibo/sendweibo?weiboText=dfjodfjeohf

http://mb.com/weibo/sendweibo?weiboText=dfjodfjeohf

/*初始化Redis数据的url*/
centos.testphp.com/initRedisData/index.php

/*push weibo的url*/
http://centos.mb.com/weibo/pushweibo

/*ab测试*/
./ab -n 1000 -c 10 -H "Cookie:PHPSESSID=c4h1aedl5e85ncg2lbaaghe2v3; logName=30310%40sina.com; password=81dc9bdb52d04dc20036dbd8313ed055" http://centos.mb.com/weibo/sendweibo?weiboText=dfjodfjeohf

./ab -n 1000 -c 10 -H "Cookie:PHPSESSID=dhus59tltoh1cq7m8f7te3bam0; logName=2693%40sina.com; password=81dc9bdb52d04dc20036dbd8313ed055" http://mb.com/weibo/sendweibo?weiboText=dfjodfjeohf

/*互加好友的两个测试用户, 1000对1098的关注是centos上单独加的，windows机器上没有*/
1000 2697
1098 30310