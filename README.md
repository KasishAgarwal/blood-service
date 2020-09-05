CREATE DATABASE demo_db;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

SELECT * FROM user;

 CREATE TABLE user(
id INT NOT NULL auto_increment,
firstName VARCHAR(20) NOT NULL,
lastName VARCHAR(20) NOT NULL,
emailid VARCHAR(200) NOT NULL unique,
contact BIGINT NOT NULL,
bloodGroup VARCHAR(5) NOT NULL,
skill VARCHAR(20) NOT NULL,
userName VARCHAR(20) NOT NULL unique,
password VARCHAR(20) NOT NULL,
filename varchar(255) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE image (
  name varchar(255) NOT NULL,
  type varchar(100) NOT NULL,
  size int NOT NULL,
  id int auto_increment,
  primary key(id)
) ;

Select * from image;

Select * from user;

INSERT INTO image(name, type, size) VALUES ("myImage-1596654907091.png", "image/png", "500551");

DELETE FROM user WHERE userName = 'kasish' and password = 'Kasish@123' ;

DELETE FROM image WHERE id NOT IN (SELECT id FROM user);

select name from image where (Select id from user where userName='kasish')=id;