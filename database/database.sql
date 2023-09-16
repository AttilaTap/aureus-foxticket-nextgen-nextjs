CREATE DATABASE IF NOT EXISTS nextticket;

USE nextticket;

CREATE TABLE IF NOT EXISTS users (
        user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR (100) UNIQUE NOT NULL,
        password VARCHAR (100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        authToken varchar(255),
        tokenExpiry DATETIME

    );

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    city VARCHAR(50),
    country VARCHAR(50),
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    description TEXT,
    is_festival BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(9, 2) NOT NULL,
    currency ENUM('HUF', 'EUR', 'USD') NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    available ENUM('YES', 'NO', 'SOLD') NOT NULL,
    how_many INT NOT NULL,
    seat VARCHAR(20),
    section VARCHAR(20),
    row_seating VARCHAR(20),
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    buyer_id INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Remove foreign key linking tickets to users. This is necessary to truncate the tables.
ALTER TABLE tickets DROP FOREIGN KEY tickets_ibfk_1;
ALTER TABLE tickets DROP FOREIGN KEY tickets_ibfk_2;

-- Empty the tickets table first, then the events table, then the users table.
TRUNCATE TABLE tickets;
TRUNCATE TABLE events;
TRUNCATE TABLE users;

ALTER TABLE tickets
-- Add foreign key from tickets to users, delete related tickets if user is deleted.
  ADD CONSTRAINT tickets_ibfk_1 FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
-- Add foreign key from tickets to events, delete related tickets if event is deleted.
  ADD CONSTRAINT tickets_ibfk_2 FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE;

INSERT INTO users (email, password) VALUES
('admin@nexticket.com', '$2a$10$LZ4vq6ApY0NXwM47C.0JYOOTYdY8NyVG4JmjO/Y8w.55TEBLcrnUS'), -- password: admin123
('johndoe1234@notrealmail.com', '$2a$10$QAKp5JETPqFO/YPmvHNOzu8xMinTY4.tq/uhQQJ7Jzid0qo9os48e'), -- password: johndoe1234pass
('janedoe5678@fakeinbox.com', '$2a$10$p8J7WqT.oGdBHl8zvH1nhOPomBJgEXwFR8R8.peIK5SgS290vuDD.'), -- password: janedoe5678pass
('bobbytables@noemailhere.com', '$2a$10$pNNNKy3E9OIwObrLx00JQ.emiXxLpCnbkH7VzNwvcqXCZFu9xY5ta'), -- password: bobbytablespass
('sallysue999@nonexistent.com', '$2a$10$ewGTHT1U3Hk/Tadq0gb3..oEB5WYE6froGKaOS5j/NtT0TpG3CD6y'), -- password: sallysue999pass
('tomthumb4321@imaginarymail.com', '$2a$10$OdWHTp2150RaMh/3Z5ADce34tvxFNyIb2Y9hdrc4L2jAmSoXWceu.'), -- password: tomthumb4321pass
('aliceinwonderland@unrealmail.com', '$2a$10$vfdv5YquKBMVN5qoeDYyjO.mPLy6DnBIEQFfL05PqputbyfWW1GMi'), -- password: aliceinwonderlandpass
('peterpan9090@fictitiousmail.com', '$2a$10$Hs/lZpleALhJk.wtCcK7Ou5J9EZu7Jfb0GDps05mSbZpkNrOSlQim'), -- password: peterpan9090pass
('snowwhite1010@madeupinbox.com', '$2a$10$sMmZWdLta0a1twtK05lkQOWM5vOnQ9nBF9oCgFSgueeUjgmphsFEK'), -- password: snowwhite1010pass
('jackandjill@inventedemail.com', '$2a$10$QGBm3JLXuImpj24H7BXIse280HrA/7GNtFB62.xB.o0k.mmYt5CU2'), -- password: jackandjillpass
('vearant@gmail.com', '$2a$10$RdWhtqlioUEjKgdbF2uEGegGW/d9AnjZK/S6ij38WSPZIbxCtsBFi');

INSERT INTO events (name, location, city, country, start_time, end_time, description, is_festival) VALUES
('Techtopia Summit', 'Tokyo Dome', 'Tokyo', 'Japan', '2024-06-23 09:00:00', '2024-06-23 18:00:00', 'A one-day event for tech enthusiasts', False),
('Harbor Melodies', 'Sydney Opera House', 'Sydney', 'Australia', '2024-02-18 19:00:00', '2024-02-18 23:00:00', 'Enjoy a night of classic opera performances', False),
('Bavarian Brew Bash', 'Theresienwiese', 'Munich', 'Germany', '2023-10-01 10:00:00', '2023-10-07 23:59:59', 'The world''s largest Volksfest', True),
('Tropical Canvas', 'Ibirapuera Park', 'Sao Paulo', 'Brazil', '2024-01-22 10:00:00', '2024-01-25 19:00:00', 'A global art fair in Brazil''s largest city', True),
('CosmicCon', 'Javits Center', 'New York', 'USA', '2024-10-03 10:00:00', '2024-10-06 18:00:00', 'A 4-day event for comic book and movie fans', True),
('Cinematica', 'Auditorium Parco', 'Rome', 'Italy', '2024-04-10 09:00:00', '2024-04-10 23:00:00', 'A classic film festival', False);

INSERT INTO tickets 
(name, price, currency, start_time, end_time, available, how_many, seat, section, row_seating, user_id, event_id, category)
VALUES
('Techtopia Summit VIP', 25500, 'HUF', '2024-06-23 09:00:00', NULL, 'YES', 1, 1, 2, 'A', 3, 1, 'VIP'),
('Techtopia Summit VIP', 48000, 'HUF', '2024-06-23 09:00:00', NULL, 'YES', 2, '2-3', 2, 'A', 6, 1, 'VIP'),
('Techtopia Summit Regular', 15000, 'HUF', '2024-06-23 09:00:00', NULL, 'YES', 1, 1, 3, 'B', 9, 1, 'Regular'),
('Techtopia Summit Regular', 16000, 'HUF', '2024-06-23 09:00:00', NULL, 'YES', 1, 1, 3, 'B', 5, 1, 'Regular'),
('Techtopia Summit Standing', 40000, 'HUF', '2024-06-23 09:00:00', NULL, 'YES', 4, NULL, 4, NULL, 10, 1, 'Standing'),
('Harbor Melodies VIP', 360, 'EUR', '2024-02-18 19:00:00', NULL, 'YES', 2, '3-4', 3, 'A', 10, 2, 'VIP'),
('Harbor Melodies VIP', 200, 'EUR', '2024-02-18 19:00:00', NULL, 'YES', 1, 4, 3, 'A', 7, 2, 'VIP'),
('Harbor Melodies Regular', 150, 'EUR', '2024-02-18 19:00:00', NULL, 'YES', 1, 3, 3, 'B', 6, 2, 'Regular'),
('Harbor Melodies Standing', 200, 'EUR', '2024-02-18 19:00:00', NULL, 'YES', 2, NULL, 4, NULL, 2, 2, 'Standing'),
('Harbor Melodies Standing', 90, 'EUR', '2024-02-18 19:00:00', NULL, 'YES', 1, NULL, 4, NULL, 8, 2, 'Standing'),
('Harbor Melodies Standing', 320, 'EUR', '2024-02-18 19:00:00', NULL, 'YES', 4, NULL, 4, NULL, 3, 2, 'Standing'),
('Bavarian Brew Bash VIP - Complete', 400, 'EUR', '2023-10-01 10:00:00', '2023-10-07 23:59:59', 'YES', 1, NULL, NULL, NULL, 3, 3, 'VIP - Complete'),
('Bavarian Brew Bash Regular - Complete', 280, 'EUR', '2023-10-01 10:00:00', '2023-10-07 23:59:59', 'YES', 1, NULL, NULL, NULL, 9, 3, 'Regular - Complete'),
('Bavarian Brew Bash Regular - Complete', 275, 'EUR', '2023-10-01 10:00:00', '2023-10-07 23:59:59', 'YES', 1, NULL, NULL, NULL, 1, 3, 'Regular - Complete'),
('Bavarian Brew Bash Regular - Complete', 285, 'EUR', '2023-10-01 10:00:00', '2023-10-07 23:59:59', 'YES', 1, NULL, NULL, NULL, 4, 3, 'Regular - Complete'),
('Bavarian Brew Bash VIP - 1 Day Pass', 240, 'EUR', '2023-10-01 10:00:00', '2023-10-01 23:59:59', 'YES', 3, NULL, NULL, NULL, 2, 3, 'VIP - 1 Day Pass'),
('Bavarian Brew Bash VIP - 1 Day Pass', 190, 'EUR', '2023-10-01 10:00:00', '2023-10-01 23:59:59', 'YES', 2, NULL, NULL, NULL, 5, 3, 'VIP - 1 Day Pass'),
('Bavarian Brew Bash VIP - 1 Day Pass', 260, 'EUR', '2023-10-01 10:00:00', '2023-10-01 23:59:59', 'YES', 3, NULL, NULL, NULL, 8, 3, 'VIP - 1 Day Pass'),
('Bavarian Brew Bash VIP - 2 Day Pass', 150, 'EUR', '2023-10-01 10:00:00', '2023-10-02 23:59:59', 'YES', 1, NULL, NULL, NULL, 6, 3, 'VIP - 2 Day Pass'),
('Bavarian Brew Bash Regular - 1 Day Pass', 45, 'EUR', '2023-10-01 10:00:00', '2023-10-01 23:59:59', 'YES', 1, NULL, NULL, NULL, 8, 3, 'Regular - 1 Day Pass'),
('Bavarian Brew Bash Regular - 1 Day Pass', 50, 'EUR', '2023-10-01 10:00:00', '2023-10-01 23:59:59', 'YES', 1, NULL, NULL, NULL, 9, 3, 'Regular - 1 Day Pass'),
('Bavarian Brew Bash Regular - 1 Day Pass', 50, 'EUR', '2023-10-01 10:00:00', '2023-10-01 23:59:59', 'YES', 1, NULL, NULL, NULL, 10, 3, 'Regular - 1 Day Pass'),
('Bavarian Brew Bash Regular - 2 Day Pass', 90, 'EUR', '2023-10-01 10:00:00', '2023-10-02 23:59:59', 'YES', 1, NULL, NULL, NULL, 4, 3, 'Regular - 2 Day Pass'),
('Bavarian Brew Bash Regular - 2 Day Pass', 91, 'EUR', '2023-10-01 10:00:00', '2023-10-03 23:59:59', 'YES', 1, NULL, NULL, NULL, 7, 3, 'Regular - 3 Day Pass'),
('Tropical Canvas Regular - Complete', 480000, 'HUF', '2024-01-22 10:00:00', '2024-01-25 19:00:00', 'YES', 3, NULL, NULL, NULL, 2, 4, 'Regular - Complete'),
('Tropical Canvas Regular - Complete', 155000, 'HUF', '2024-01-22 10:00:00', '2024-01-25 19:00:00', 'YES', 1, NULL, NULL, NULL, 8, 4, 'Regular - Complete'),
('Tropical Canvas Regular - 1 Day Pass', 45000, 'HUF', '2024-01-22 10:00:00', '2024-01-25 19:00:00', 'YES', 1, NULL, NULL, NULL, 1, 4, 'Regular - 1 Day Pass'),
('Tropical Canvas Regular - 1 Day Pass', 46000, 'HUF', '2024-01-22 10:00:00', '2024-01-25 19:00:00', 'YES', 1, NULL, NULL, NULL, 2, 4, 'Regular - 1 Day Pass'),
('Tropical Canvas VIP - Complete', 280000, 'HUF', '2024-01-22 10:00:00', '2024-01-25 19:00:00', 'YES', 1, 8, 8, 'C', 10, 4, 'VIP - Complete'),
('CosmicCon Regular - Complete', 120000, 'HUF', '2024-10-03 10:00:00', '2024-10-06 18:00:00', 'YES', 1, 10, 10, 'A', 9, 5, 'Regular - Complete'),
('CosmicCon Regular - Complete', 220000, 'HUF', '2024-10-03 10:00:00', '2024-10-06 18:00:00', 'YES', 2, '11-12', 9, 'A', 7, 5, 'Regular - Complete'),
('CosmicCon Regular - Complete', 320000, 'HUF', '2024-10-03 10:00:00', '2024-10-06 18:00:00', 'YES', 3, '12-13-14', 8, 'A', 5, 5, 'Regular - Complete'),
('CosmicCon VIP - Complete', 240000, 'HUF', '2024-10-03 10:00:00', '2024-10-06 18:00:00', 'YES', 1, 10, 10, 'C', 11, 5, 'VIP - Complete'),
('CosmicCon VIP - Complete', 230000, 'HUF', '2024-10-03 10:00:00', '2024-10-06 18:00:00', 'YES', 1, 6, 10, 'C', 1, 5, 'VIP - Complete'),
('CosmicCon Standing - Complete', 150000, 'HUF', '2024-10-03 10:00:00', '2024-10-06 18:00:00', 'YES', 1, NULL, NULL, NULL, 1, 5, 'Standing- Complete'),
('Cinematica Regular', 120, 'EUR', '2024-04-10 09:00:00', NULL, 'YES', 2, '13-14', 1, 'A', 1, 6, 'Regular'),
('Cinematica Regular', 110, 'EUR', '2024-04-10 09:00:00', NULL, 'YES', 2, '7-8', 5, 'B', 4, 6, 'Regular'),
('Cinematica Regular', 115, 'EUR', '2024-04-10 09:00:00', NULL, 'YES', 2, '6-7', 6, 'C', 7, 6, 'Regular');