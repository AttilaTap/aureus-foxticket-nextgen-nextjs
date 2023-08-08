CREATE DATABASE IF NOT EXISTS nextticket;

USE nextticket;

CREATE TABLE IF NOT EXISTS users (
        user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR (100) UNIQUE NOT NULL,
        password VARCHAR (100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT INT NOT NULL PRIMARY KEY,
    seat_number INT NOT NULL,
    event_id INT NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'available',
    FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT INT NOT NULL PRIMARY KEY,  
    name VARCHAR(50) NOT NULL,  
    location VARCHAR(100) NOT NULL,  
    start_time DATETIME NOT NULL,
    description TEXT
);