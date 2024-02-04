-- Create the database
CREATE DATABASE IF NOT EXISTS `quickcart`;

-- Use the database
USE `quickcart`;

-- Create the user table
CREATE TABLE IF NOT EXISTS `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `name` varchar(30) NOT NULL,
    `email` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    `profile_image` varchar(255) NOT NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `email_UNIQUE` (`email`)
);