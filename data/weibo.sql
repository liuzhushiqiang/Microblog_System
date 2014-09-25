drop database if exists microblog_system;

create database microblog_system;

use microblog_system;

create table if not exists mb_user(
	id int primary key AUTO_INCREMENT,
	nickname varchar(20) not null,
	pw varchar(50) not null,
	email varchar(50) not null,
	profile varchar(50) not NULL,
  address varchar(50) not null,
	create_date timestamp not null DEFAULT current_timestamp()
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1011;

INSERT INTO `mb_user` (`id`, `nickname`, `pw`, `email`, profile, address, `create_date`) VALUES
(1000, 'shiqiang', md5('shiqiang'), 'shiqiang@shiqiang.com', 'shiqiang.jpg', '福建-厦门-集美', now()),
(1001, 'jundong', md5('jundong'), 'jundong@jundong.com', 'jundong.jpg', '福建-厦门-集美', now()),
(1002, 'borong', md5('borong'), 'borong@borong.com', 'borong.jpg', '福建-厦门-集美', now()),
(1003, 'yulin', md5('yulin'), 'yulin@yulin.com', 'yulin.jpg', '福建-厦门-集美', now()),
(1004, 'geek1', md5('geek1'), 'geek1@geek1.com', 'geek1.jpg', '福建-泉州-石狮', now()),
(1005, 'geek2', md5('geek2'), 'geek2@geek2.com', 'geek2.jpg', '福建-泉州-石狮', now()),
(1006, 'geek3', md5('geek3'), 'geek3@geek3.com', 'geek3.jpg', '福建-泉州-石狮', now()),
(1007, 'geek4', md5('geek4'), 'geek4@geek4.com', 'geek4.jpg', '福建-泉州-石狮', now()),
(1008, 'geek5', md5('geek5'), 'geek5@geek5.com', 'geek5.jpg', '福建-泉州-石狮', now()),
(1009, 'geek6', md5('geek6'), 'geek6@geek6.com', 'geek6.jpg', '福建-泉州-石狮', now()),
(1010, '2514881230', md5('2514881230'), '2514881230@qq.com', '2514881230.jpg', '福建-厦门-集美', now())
;

CREATE TABLE IF NOT EXISTS `mb_post` (
  `id` int primary key AUTO_INCREMENT,
  `uid` int NOT NULL ,
  `content` varchar(150) NOT NULL,
  `image_url` varchar(150) DEFAULT NULL,
  retransmitted_id int default null,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  foreign key (uid) references mb_user(id)
  ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1010;

insert into mb_post(id, uid, content, image_url, retransmitted_id, create_time) values
  (1, 1000, "Today is sunny!", "sunny.jpg", 3, now()),
  (2, 1000, "Today is rainy!", NULL, null, now()),
  (3, 1001, "Today is snowy!", NULL, null, now()),
  (4, 1003, "A beautiful Day!", null, null, now())
;

CREATE TABLE IF NOT EXISTS `mb_user_relation` (
  `uid` int NOT NULL,
  `fid` int NOT NULL,
  `id` int primary key AUTO_INCREMENT,
  create_time timestamp default current_timestamp() not null,
  foreign key (uid) references mb_user(id),
  foreign key (fid) references mb_user(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1010;

INSERT INTO `mb_user_relation` (`uid`, `fid`, `id`) VALUES
(1000, 1001, 1),
(1000, 1002, 2),
(1001, 1000, 3)
;

create table if not exists mb_comment(
id int primary key auto_increment,
pid int not null,
uid int not null,
content varchar(150) not null,
create_date timestamp not null default current_timestamp(),
foreign key (pid) references mb_post(id),
foreign key (uid) references mb_user(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1010;

insert into mb_comment(pid, uid, content) values
	(1, 1001, "play basketball"),
	(1, 1002, "go swimming");

CREATE TABLE IF NOT EXISTS `mb_message_private` (
  `id` int primary key AUTO_INCREMENT,
  `uid` int NOT NULL,
  fid int not null,
  `content` varchar(150) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  foreign key (uid) references mb_user(id),
  foreign key (fid) references mb_user(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1010;

CREATE TABLE IF NOT EXISTS `mb_message_at` (
  `id` int primary key AUTO_INCREMENT,
  `uid` int NOT NULL,
  fid int not null,
  `pid` int NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  foreign key (uid) references mb_user(id), 
  foreign key (fid) references mb_user(id),
  foreign key (pid) references mb_post(id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1010;

create table if not exists mb_collect(
  id int primary key auto_increment,
  pid int not null,
  create_time timestamp default current_timestamp() not NULL,
  foreign key (pid) references mb_post(id)
  ) engine=innodb default CHARSET=utf8 auto_increment=1010;