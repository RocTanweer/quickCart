-- Create the database
CREATE DATABASE IF NOT EXISTS `quickcart`;

-- Use the database
USE `quickcart`;

-- Create the user table
CREATE TABLE IF NOT EXISTS `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `profile_image` VARCHAR(255) NOT NULL,
    `role` ENUM('USER','ADMIN') NOT NULL DEFAULT 'USER',
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `email_UNIQUE` (`email`)
);

-- Create product category table 
CREATE TABLE IF NOT EXISTS `product_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `thumbnail` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
);

-- Create product brand table
CREATE TABLE IF NOT EXISTS `product_brand` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
);

-- Create product table
CREATE TABLE IF NOT EXISTS `product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_category_id` INT NOT NULL,
  `product_brand_id` INT NOT NULL,
  `unit_price` DECIMAL(9,2) NOT NULL,
  `stock_quantity` INT NOT NULL DEFAULT '0',
  `name` VARCHAR(150) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_category_id_idx` (`product_category_id`),
  KEY `fk_product_brand_id_idx` (`product_brand_id`),
  CONSTRAINT `fk_product_brand_id` FOREIGN KEY (`product_brand_id`) REFERENCES `product_brand` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_product_category_id` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`id`) ON DELETE RESTRICT
);