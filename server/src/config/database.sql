CREATE DATABASE IF NOT EXISTS gestionpizzeria;

Use gestionpizzeria;

CREATE TABLE `gestionpizzeria`.`product` (
  `Code` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NULL,
  `Price` DECIMAL(10,2) NULL,
  `Unit` INT NULL,
  `Tax` DECIMAL(10,2) NULL,
  PRIMARY KEY (`Code`));

CREATE TABLE `gestionpizzeria`.`user` (
  `Code` INT NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(100) NULL,
  `Password` VARCHAR(500) NULL,
  PRIMARY KEY (`Code`));