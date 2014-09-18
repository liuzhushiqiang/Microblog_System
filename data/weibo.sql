drop database microblog_system;

create database microblog_system;

use microblog_system;

create table if not exists mb_user(
	id int primary key AUTO_INCREMENT,
	nickname varchar(20) not null,
	pw varchar(50) not null,
	email varchar(50) not null,
	profile varchar(50) not NULL,
	create_date timestamp not null DEFAULT current_timestamp
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1010;

INSERT INTO `mb_user` (`id`, `nickname`, `pw`, `email`, profile, `create_date`) VALUES
(1000, 'shiqiang', md5('shiqiang'), 'shiqiang@shiqiang.com', 'shiqiang.jpg', now()),
(1001, 'jundong', md5('jundong'), 'jundong@jundong.com', 'jundong.jpg', now()),
(1002, 'borong', md5('borong'), 'borong@borong.com', 'borong.jpg',now()),
(1003, 'yulin', md5('yulin'), 'yulin@yulin.com', 'yulin.jpg', now()),
(1004, 'geek1', md5('geek1'), 'geek1@geek1.com', 'geek1.jpg', now()),
(1005, 'geek2', md5('geek2'), 'geek2@geek2.com', 'geek2.jpg', now()),
(1006, 'geek3', md5('geek3'), 'geek3@geek3.com', 'geek3.jpg', now()),
(1007, 'geek4', md5('geek4'), 'geek4@geek4.com', 'geek4.jpg', now()),
(1008, 'geek5', md5('geek5'), 'geek5@geek5.com', 'geek5.jpg', now())
;

CREATE TABLE IF NOT EXISTS `mb_user_relation` (
  `uid` int(40) NOT NULL,
  `fid` int(40) NOT NULL,
  `id` int(11) NOT NULL primary key AUTO_INCREMENT
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10;

INSERT INTO `mb_user_relation` (`uid`, `fid`, `id`) VALUES
(1000, 1001, 1),
(1000, 1002, 2),
(1001, 1000, 3)
;

CREATE TABLE IF NOT EXISTS `mb_post` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `uid` int(40) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10;

insert into mb_post(id, uid, content, image_url, create_time) values
	(1, 1000, "Today is sunny!", "sunny.jpg", now()),
	(2, 1000, "Today is rainy!", NULL, now()),
	(3, 1001, "Today is snowy!", NULL, now()),
	(4, 1003, "A beautiful Day!", null, now())
;

create table mb_comment(
id int primary key auto_increment,
pid int not null,
uid int not null,
content varchar(150) not null,
create_date timestamp not null default current_timestamp()  
);

insert into mb_comment(pid, uid, content) values
	(1, 1001, "play basketball"),
	(1, 1002, "go swimming");

CREATE TABLE IF NOT EXISTS `mb_retransmitted` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `uid` int(40) NOT NULL,
	 pid int not null,
  `content` text NOT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

insert into mb_post(uid, pid, content, image_url, create_time) values
	(1000, 3, "snowy? so cold!", "NULL", now())
;