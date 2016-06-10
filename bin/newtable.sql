DROP TABLE IF EXISTS `record`;
DROP TABLE IF EXISTS `word`;
DROP TABLE IF EXISTS `lesson`;
DROP TABLE IF EXISTS `users`;


CREATE TABLE `lesson` (
  `id` int UNIQUE NOT NULL AUTO_INCREMENT,
  `book` varchar(32) CHARACTER SET utf8 DEFAULT NULL,
  `chapter` int(11) DEFAULT NULL,
  `lesson` int(11) DEFAULT NULL,
  UNIQUE KEY (`book`, `chapter`, `lesson`),
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `username` char(128) NOT NULL,
  `pwd` char(255) NOT NULL,
  `auth` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `word` (
  `id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `kana` varchar(255) CHARACTER SET utf8 NOT NULL,
  `kanji` varchar(255) CHARACTER SET utf8,
  `type` varchar(15) CHARACTER SET utf8,
  `trans` varchar(255) CHARACTER SET utf8,
  `lid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lesson_word` (`lid`),
  FOREIGN KEY (`lid`) REFERENCES `lesson` (`id`)
);

CREATE TABLE `record` (
  `id` int(11) UNIQUE NOT NULL AUTO_INCREMENT,
  `wid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `total_record` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `record_repeat` (`wid`,`uid`),
  FOREIGN KEY (`uid`) REFERENCES `users` (`id`),
  FOREIGN KEY (`wid`) REFERENCES `word` (`id`)
);

INSERT INTO `test`.`users` (`id`, `username`, `pwd`, `auth`) VALUES ('1', 'admin', '123', '0');