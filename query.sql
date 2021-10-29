CREATE DATABASE `userdb`;

USE `userdb`;

CREATE TABLE IF NOT EXISTS `usertbl` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  firstname varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  address varchar(250) NOT NULL,
  postcode varchar(10) NOT NULL,
  phone varchar(15) NOT NULL,
  email varchar(50) NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
