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
  `Password` VARCHAR(200) NULL,
  PRIMARY KEY (`Code`));

CREATE TABLE `gestionpizzeria`.`client` (
  `Code` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NOT NULL,
  `Phone` VARCHAR(45) NULL,
  PRIMARY KEY (`Code`));

CREATE TABLE `gestionpizzeria`.`address` (
  `Code` INT NOT NULL AUTO_INCREMENT,
  `Address` VARCHAR(100) NOT NULL,
  `Client` INT NOT NULL,
  PRIMARY KEY (`Code`),
  INDEX `Client_idx` (`Client` ASC) VISIBLE,
  CONSTRAINT `Client`
    FOREIGN KEY (`Client`)
    REFERENCES `gestionpizzeria`.`client` (`Code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
