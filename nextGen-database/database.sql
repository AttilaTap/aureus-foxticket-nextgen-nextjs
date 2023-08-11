CREATE DATABASE IF NOT EXISTS nextticket;

USE nextticket;

CREATE TABLE IF NOT EXISTS users (
        user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR (100) UNIQUE NOT NULL,
        password VARCHAR (100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );


CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,  
    name VARCHAR(50) NOT NULL,  
    location VARCHAR(100) NOT NULL,  
    start_time DATETIME NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS tickets (
	ticket_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type ENUM('entrance','non-entrance'),
    name VARCHAR(50) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    currency ENUM('HUF','EU','$') NOT NULL,
    original_price DECIMAL(9,2) NOT NULL,
    original_currency ENUM('HUF','EU','$') NOT NULL,
    date VARCHAR(50) NOT NULL,
    available ENUM ('YES','NO') NOT NULL,
    how_many INT NOT NULL,
    seat INT NOT NULL DEFAULT 0,
    section INT NOT NULL DEFAULT 0,
    row_seating VARCHAR(4) NOT NULL DEFAULT '',
    comment TEXT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES events(id)
    ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;