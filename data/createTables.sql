-- user 테이블 생성
CREATE TABLE `test`.`user` (
  `id` VARCHAR(45) NOT NULL,
  `pw` VARCHAR(255) NOT NULL,
  `u_name` VARCHAR(45) NOT NULL,
  `birth` DATETIME NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  `nick_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nick_name_UNIQUE` (`nick_name` ASC) VISIBLE);

-- media 테이블 생성
CREATE TABLE `test`.`media` (
  `m_num` INT NOT NULL AUTO_INCREMENT,
  `m_name` VARCHAR(45) NOT NULL,
  `m_name2` VARCHAR(45) NOT NULL,
  `m_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`m_num`));

-- place 테이블 생성
CREATE TABLE `test`.`place` (
  `p_num` INT NOT NULL AUTO_INCREMENT,
  `p_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`p_num`));

-- location 테이블 생성
CREATE TABLE `test`.`location` (
  `l_num` INT NOT NULL AUTO_INCREMENT,
  `m_num` INT NOT NULL,
  `p_num` INT NOT NULL,
  `description` TEXT NOT NULL,
  `l_image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`l_num`),
  FOREIGN KEY (m_num)
    REFERENCES media(m_num) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (p_num)
    REFERENCES place(p_num) ON UPDATE CASCADE ON DELETE RESTRICT);

-- community 테이블 생성
CREATE TABLE `test`.`community` (
  `cm_num` INT NOT NULL AUTO_INCREMENT,
  `cm_title` VARCHAR(45) NOT NULL,
  `cm_content` TEXT NOT NULL,
  `writer` VARCHAR(45) NOT NULL,
  `cm_type` VARCHAR(45) NOT NULL,
  `wr_date` DATETIME NOT NULL,
  `cm_image` VARCHAR(255) NULL,
  `cm_likeCount` INT NULL,
  `cm_commentCount` INT NULL,
  `cm_scrapCount` INT NULL,
  PRIMARY KEY (`cm_num`));

-- likelist 테이블 생성
CREATE TABLE `test`.`likelist` (
  `like_num` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(45) NOT NULL,
  `l_num` INT NOT NULL,
  PRIMARY KEY (`like_num`),
  FOREIGN KEY (id)
    REFERENCES user(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (l_num)
    REFERENCES location(l_num) ON UPDATE CASCADE ON DELETE RESTRICT);

-- puzzle 테이블 생성
CREATE TABLE `test`.`puzzle` (
  `pz_num` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(45) NOT NULL,
  `m_num` INT NOT NULL,
  `poster` VARCHAR(255) NOT NULL,
  `record_image1` VARCHAR(255) NOT NULL,
  `record_title1` VARCHAR(45) NOT NULL,
  `record_content1` TEXT NOT NULL,
  `record_image2` VARCHAR(255) NOT NULL,
  `record_title2` VARCHAR(45) NOT NULL,
  `record_content2` TEXT NOT NULL,
  `record_image3` VARCHAR(255) NOT NULL,
  `record_title3` VARCHAR(45) NOT NULL,
  `record_content3` TEXT NOT NULL,
  `record_image4` VARCHAR(255) NOT NULL,
  `record_title4` VARCHAR(45) NOT NULL,
  `record_content4` TEXT NOT NULL,
  PRIMARY KEY (`pz_num`),
  FOREIGN KEY (id)
    REFERENCES user(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (m_num)
    REFERENCES media(m_num) ON UPDATE CASCADE ON DELETE RESTRICT);

-- request 테이블 생성
CREATE TABLE `test`.`request` (
  `r_num` INT NOT NULL AUTO_INCREMENT,
  `media_name` VARCHAR(45) NOT NULL,
  `m_type` VARCHAR(45) NOT NULL,
  `r_content` TEXT NOT NULL,
  `r_image` VARCHAR(255) NULL,
  `id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`r_num`),
  FOREIGN KEY (id)
    REFERENCES user(id) ON UPDATE CASCADE ON DELETE RESTRICT);

-- mycourse 테이블 생성
CREATE TABLE `test`.`mycourse` (
  `mc_num` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(45) NOT NULL,
  `my_course` TEXT NOT NULL,
  `mc_title` VARCHAR(45) NOT NULL,
  `mc_image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`mc_num`),
  FOREIGN KEY (id)
    REFERENCES user(id) ON UPDATE CASCADE ON DELETE RESTRICT);

-- course 테이블 생성
CREATE TABLE `test`.`course` (
  `c_num` INT NOT NULL AUTO_INCREMENT,
  `l_num` INT NOT NULL,
  `course` TEXT NOT NULL,
  PRIMARY KEY (`c_num`),
  FOREIGN KEY (l_num)
    REFERENCES location(l_num) ON UPDATE CASCADE ON DELETE RESTRICT);


