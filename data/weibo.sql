drop database if exists mb;

create database mb;

use mb;

create table if not exists mb_user(
	id int primary key AUTO_INCREMENT,
	nickname varchar(20) not null,
	pw varchar(50) not null,
	email varchar(50) not null,
  gender char(2) not NULL,
  address varchar(100),
  phone_number varchar(20),
  introduction varchar(256),
  personal_tag varchar(256), 
  work_at varchar(50),
	profile_url varchar(256),
  verified tinyint default 0,
	create_datetime datetime not null
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1000;


create table if not exists mb_user_delete(
  id int primary key AUTO_INCREMENT,
  nickname varchar(20) not null,
  pw varchar(50) not null,
  email varchar(50) not null,
  gender char(2) not NULL,
  address varchar(100),
  phone_number varchar(20),
  introduction varchar(256),
  personal_tag varchar(256), 
  work_at varchar(50),
  profile_url varchar(256),
  verified tinyint default 0,
  create_datetime datetime not null
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1000;

create table if not exists mb_user_addinfo(
  id int primary key auto_increment,
  friend_category text,
  privacy_settting tinyint,
  notification_setting tinyint,
  black_list text
) default CHARSET=utf8 auto_increment = 1000;

CREATE TABLE IF NOT EXISTS `mb_post` (
  `id` int primary key AUTO_INCREMENT,
  `uid` int not null,
  `content` text NOT NULL,
  `images_url` text,
  retransmission_id int,
  topic_id int,
  `create_time` datetime NOT NULL
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1000;

CREATE TABLE IF NOT EXISTS `mb_user_relation` (
  `uid` int NOT NULL,
  `fid` int not null,
  friend_category varchar(20),
  `id` int primary key AUTO_INCREMENT,
  remark_name varchar(20),
  create_time datetime not null
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1000;

create table if not exists mb_comment(
id int primary key auto_increment,
pid int not null,
uid int not null,
content text not null,
create_date datetime not null
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1000;

CREATE TABLE IF NOT EXISTS `mb_private_message` (
  `id` int primary key AUTO_INCREMENT,
  `uid` int NOT NULL,
  pid int not null,
  `content` text NOT NULL,
  `create_time` datetime NOT NULL
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1000;

CREATE TABLE IF NOT EXISTS `mb_message_at` (
  `id` int primary key AUTO_INCREMENT,
  `uid` int NOT NULL,
  `pid` int NOT NULL,
  `create_time` datetime NOT NULL
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=1000;

create table if not exists mb_collection(
  id int primary key auto_increment,
  uid int not null,
  pid int not null,
  create_time datetime not NULL
  ) default CHARSET=utf8 auto_increment=1000;

create table if not exists mb_love(
  id int primary key auto_increment,
  uid int not null,
  pid int not null,
  create_time datetime not null
) default CHARSET=utf8 auto_increment=1000;

create table if not exists mb_user_advice(
  id int primary key auto_increment,
  uid int not null,
  content text not null,
  image_url text,
  create_time datetime not null
) default CHARSET=utf8 auto_increment=1000;

create table if not exists mb_veri_info(
  id int primary key auto_increment,
  uid int not null,
  veri_type tinyint not null,
  citizen_id_name varchar(20) not null,
  citizen_id_num varchar(20) not null,
  phone_number varchar(20) not null,
  veri_reason text not null,
  veri_file_url varchar(256) not null,
  veri_status tinyint not null,
  create_time datetime not null
) default CHARSET=utf8 auto_increment=1000;

create table if not exists mb_topic(
  id int primary key auto_increment,
  create_uid int not null,
  topic_name varchar(256) not null,
  topic_image varchar(256),
  create_time datetime not null
) default CHARSET=utf8 auto_increment=1000;

create table if not exists mb_user_reported(
  id int primary key auto_increment,
  uid int not null,
  reported_uid int not null,
  status tinyint not null,
  reported_content text not null,
  create_time datetime not null
) default CHARSET=utf8 auto_increment=1000;

create table if not exists mb_post_reported(
  id int primary key auto_increment,
  uid int not null,
  reported_pid int not null,
  reported_content text not null,
  status tinyint not null,
  create_time datetime not null
) default CHARSET=utf8 auto_increment=1000;

create table if not exists mb_sys_message(
  id int primary key auto_increment,
  uid int not null,
  sender_uid int not null,
  content text not null,
  mess_type tinyint not null,
  create_time datetime not null
) default CHARSET=utf8 auto_increment=1000






