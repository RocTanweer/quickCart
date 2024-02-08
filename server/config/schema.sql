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