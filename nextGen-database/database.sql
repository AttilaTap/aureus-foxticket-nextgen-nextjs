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
    currency ENUM('HUF','EUR','USD') NOT NULL,
    original_price DECIMAL(9,2) NOT NULL,
    original_currency ENUM('HUF','EUR','USD') NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME,
    available ENUM ('YES','NO') NOT NULL,
    how_many INT NOT NULL,
    seat INT,
    section INT,
    row_seating VARCHAR(10),
    comment TEXT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE tickets DROP FOREIGN KEY tickets_ibfk_1;
ALTER TABLE tickets DROP FOREIGN KEY tickets_ibfk_2;

TRUNCATE TABLE tickets;
TRUNCATE TABLE events;
TRUNCATE TABLE users;

ALTER TABLE tickets
  ADD CONSTRAINT tickets_ibfk_1 FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  ADD CONSTRAINT tickets_ibfk_2 FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE;

INSERT INTO users (email, password) VALUES
('admin@nextgen-nexticket.com', '$2a$10$XqEe7PumKfNuoPGEl.GJY.dMXHk5mBJpLifpShZVRDxvT5XwvMprO'), -- password: admin123
('johndoe1234@notrealmail.com', '$2a$10$IHmPGe7vA6gH6.qFBqP9/.KYDXbygGrFdA6kntI13uvOzOrv6hHyO'), -- password: johndoe1234pass
('janedoe5678@fakeinbox.com', '$2a$10$Dhmbak/8v7e0oY7RntKDY.h6v1rKrd7WplFyrs7OMrRYweXEDq7zG'), -- password: janedoe5678pass
('bobbytables@noemailhere.com', '$2a$10$EvCKlTP7beF/qdb.L/nO9ezOJ3X8X0SjsE56SlUM3Oy49lD2g6uSy'), -- password: bobbytablespass
('sallysue999@nonexistent.com', '$2a$10$EF9V3n.Hhs8Zhv9g4E84h.kiNZnpwwzK3MTVROCIkWvWz74/j38zK'), -- password: sallysue999pass
('tomthumb4321@imaginarymail.com', '$2a$10$X/PyVbBhfHsyOePp8ej0EuiqVXJdPBhzyVui5v0HPShOJn8vaLB4K'), -- password: tomthumb4321pass
('aliceinwonderland@unrealmail.com', '$2a$10$hu9rnftTW2OkLctyfEQRC.XVbsEqV7FzPfVf3B57LJvtfiIGX45Wu'), -- password: aliceinwonderlandpass
('peterpan9090@fictitiousmail.com', '$2a$10$.u1f/NXrF2uEcIq/1eG6Iu6hIzbsHJL80.kiVUblZps3qkkb2d4Ue'), -- password: peterpan9090pass
('snowwhite1010@madeupinbox.com', '$2a$10$G5EGm0qGj9p0hwQt4R.4X.N/yvkwze1tiRySvlf.JedAfuTkcsf1u'), -- password: snowwhite1010pass
('jackandjill@inventedemail.com', '$2a$10$/9mYnq5Us74e8IS5eP/xtOKW/mICBbW8Rm3x9VQe4QdSbWsGoI4XK'), -- password: jackandjillpass
('vearant@gmail.com', '$2a$10$RdWhtqlioUEjKgdbF2uEGegGW/d9AnjZK/S6ij38WSPZIbxCtsBFi');

INSERT INTO events (name, location, start_time, description) VALUES
('Rock Fest 2023', 'Madison Square Garden, New York', '2023-09-17 18:00:00', 'Join us for the biggest rock music festival of the year! Featuring top rock bands and solo artists.'),
('Jazz Night Out', 'Apollo Theater, Harlem', '2023-09-18 19:00:00', 'Experience a night of soulful jazz music with renowned artists at the historic Apollo Theater.'),
('Broadway Bash', 'Times Square, New York', '2023-09-19 20:00:00', 'Celebrate the magic of Broadway with live performances from your favorite musicals.'),
('Food Truck Fiesta', 'Brooklyn Bridge Park, Brooklyn', '2023-09-20 12:00:00', 'Satisfy your taste buds with a variety of gourmet food from local food trucks at Brooklyn Bridge Park.'),
('Comedy Central Live', 'The Comedy Store, Los Angeles', '2023-09-21 21:00:00', 'Get ready to laugh your heart out with stand-up performances by the funniest comedians in the industry.'),
('Classical Concert', 'Carnegie Hall, New York', '2023-09-22 19:30:00', 'Immerse yourself in the beauty of classical music performed by world-class musicians at Carnegie Hall.'),
('Art and Wine Festival', 'Union Square, San Francisco', '2023-09-23 15:00:00', 'Enjoy a curated selection of artwork from local artists paired with fine wine from the best vineyards.'),
('Cinematic Symphony', 'Walt Disney Concert Hall, Los Angeles', '2023-09-24 20:00:00', 'Relive iconic movie moments through orchestral performances of famous film scores.'),
('Beach Volleyball Showdown', 'Santa Monica Beach, Los Angeles', '2023-09-25 14:00:00', 'Watch teams compete for the title of Beach Volleyball Champion in this action-packed event.'),
('Stargazing Soiree', 'Griffith Observatory, Los Angeles', '2023-09-26 22:00:00', 'Discover the wonders of the night sky with guided stargazing sessions at the Griffith Observatory.');

INSERT INTO tickets (type, name, price, currency, original_price, original_currency, start_date, end_date, available, how_many, seat, section, row_seating, comment, user_id, event_id) VALUES
('entrance', 'Rock Festival Early Bird', 60000, 'HUF', 80000, 'HUF', '2023-09-01 09:00:00', NULL, 'YES', 27, 1, 1, 'A', 'Early bird discount', 1, 1),
('entrance', 'Jazz Night VIP', 225, 'EUR', 270, 'EUR', '2023-09-07 09:00:00', '2023-09-13 20:00:00', 'NO', 53, 2, 5, 'B', 'VIP Access and seating', 2, 2),
('non-entrance', 'Comedy Show Regular', 14000, 'HUF', 16000, 'HUF', '2023-09-10 09:00:00', NULL, 'YES', 41, 3, 3, 'C', 'Regular seating area', 3, 3),
('entrance', 'Symphony Orchestra Balcony', 32000, 'HUF', 36000, 'HUF', '2023-09-14 09:00:00', NULL, 'YES', 12, 4, 4, 'D', 'Balcony seating', 4, 4),
('non-entrance', 'Stand-Up Comedy Gold', 54, 'EUR', 63, 'EUR', '2023-09-16 09:00:00', '2023-09-20 20:00:00', 'NO', 6, 5, 5, 'E', 'Gold seating area', 5, 5),
('entrance', 'Circus Extravaganza Family Pack', 80000, 'HUF', 88000, 'HUF', '2023-09-20 09:00:00', NULL, 'YES', 58, 6, 6, 'F', 'Family package for 4', 6, 6),
('non-entrance', 'Pop Concert Platinum', 270, 'EUR', 315, 'EUR', '2023-09-23 09:00:00', '2023-09-27 20:00:00', 'NO', 99, 7, 7, 'G', 'Platinum seating area', 7, 7),
('entrance', 'Art Exhibit Early Access', 45, 'EUR', 54, 'EUR', '2023-09-25 09:00:00', NULL, 'YES', 84, 8, 8, 'H', 'Access before public opening', 8, 8),
('non-entrance', 'Musical Theatre Premium', 108, 'EUR', 117, 'EUR', '2023-09-28 09:00:00', '2023-10-01 20:00:00', 'NO', 48, 9, 9, 'I', 'Premium seating area', 9, 9),
('entrance', 'Food Festival Family Pass', 300, 'USD', 340, 'USD', '2023-09-30 09:00:00', NULL, 'YES', 44, 10, 10, 'J', 'Pass for 4 family members', 10, 10);
