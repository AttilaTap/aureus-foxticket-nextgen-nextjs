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
    type ENUM('entrance', 'non-entrance') NOT NULL,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(9, 2) NOT NULL,
    currency ENUM('HUF', 'EUR', 'USD') NOT NULL,
    original_price DECIMAL(9, 2) NOT NULL,
    original_currency ENUM('HUF', 'EUR', 'USD') NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    available ENUM('YES', 'NO') NOT NULL,
    how_many INT NOT NULL,
    seat VARCHAR(20),
    section VARCHAR(20),
    row_seating VARCHAR(20),
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
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
('admin@nextgen-nexticket.com', '$2a$10$LZ4vq6ApY0NXwM47C.0JYOOTYdY8NyVG4JmjO/Y8w.55TEBLcrnUS'), -- password: admin123
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
('Eiffel Tower Jazz Fest', 'Eiffel Tower', 'Paris', 'France', '2023-10-13 18:00:00', '2023-10-16 23:59:59', 'A 3-day jazz festival at the iconic Eiffel Tower', True),
('Tokyo Tech Summit', 'Tokyo Dome', 'Tokyo', 'Japan', '2024-06-23 09:00:00', '2024-06-23 18:00:00', 'A one-day event for tech enthusiasts', False),
('Sydney Opera Night', 'Sydney Opera House', 'Sydney', 'Australia', '2024-02-18 19:00:00', '2024-02-18 23:00:00', 'Enjoy a night of classic opera performances', False),
('Oktoberfest', 'Theresienwiese', 'Munich', 'Germany', '2023-10-01 10:00:00', '2023-10-07 23:59:59', 'The world''s largest Volksfest', True),
('Dubai Airshow', 'Al Maktoum Airport', 'Dubai', 'UAE', '2023-11-17 09:00:00', '2023-11-21 18:00:00', 'One of the largest and most successful airshows', True),
('Moscow Ballet', 'Bolshoi Theatre', 'Moscow', 'Russia', '2023-12-11 19:00:00', '2023-12-11 22:00:00', 'A stunning ballet performance', False),
('Vancouver Food Fest', 'Stanley Park', 'Vancouver', 'Canada', '2024-08-12 11:00:00', '2024-08-16 20:00:00', '5 days of delicious local and international foods', True),
('Sao Paulo Art Expo', 'Ibirapuera Park', 'Sao Paulo', 'Brazil', '2024-01-22 10:00:00', '2024-01-25 19:00:00', 'A global art fair in Brazil''s largest city', True),
('Nairobi Music Festival', 'KICC', 'Nairobi', 'Kenya', '2024-03-12 15:00:00', '2024-03-15 23:59:59', 'Enjoy 4 days of musical acts from around Africa', True),
('New York Comic Con', 'Javits Center', 'New York', 'USA', '2024-10-03 10:00:00', '2024-10-06 18:00:00', 'A 4-day event for comic book and movie fans', True),
('Beijing Olympics', 'Olympic Park', 'Beijing', 'China', '2024-07-15 09:00:00', '2024-07-20 23:59:59', 'A multi-sport event in Beijing', True),
('Delhi Literature Fest', 'Central Park', 'Delhi', 'India', '2023-11-05 10:00:00', '2023-11-08 19:00:00', 'A 3-day festival celebrating literature', True),
('Rome Film Festival', 'Auditorium Parco', 'Rome', 'Italy', '2024-04-10 09:00:00', '2024-04-10 23:00:00', 'A classic film festival', False),
('Buenos Aires Tango Night', 'Teatro Colón', 'Buenos Aires', 'Argentina', '2024-09-09 20:00:00', '2024-09-09 23:59:59', 'A night dedicated to tango music and dance', False),
('Cape Town Jazz Concert', 'Artscape Theatre', 'Cape Town', 'South Africa', '2024-12-12 18:00:00', '2024-12-12 23:00:00', 'A one-day jazz concert in Cape Town', False);

INSERT INTO tickets 
(type, name, price, currency, original_price, original_currency, start_time, end_time, available, how_many, seat, section, row_seating, user_id, event_id, category)
VALUES
('entrance', 'Eiffel Tower Jazz Fest 3-Day Pass', 180, 'EUR', 200, 'EUR', '2023-10-13 18:00:00', '2023-10-14 23:59:59', 'YES', 8, 1, 1, 'A', 2, 1, '2-Day Pass'),
('entrance', 'Eiffel Tower Jazz Fest VIP Experience', 400, 'EUR', 450, 'EUR', '2023-10-13 18:00:00', NULL, 'YES', 3, 1, 1, 'B', 7, 1, 'VIP'),
('entrance', 'Eiffel Tower Jazz Fest Single-Day Ticket', 100, 'EUR', 120, 'EUR', '2023-10-16 08:00:00', '2023-10-16 23:59:59', 'YES', 15, 1, 1, 'C', 8, 1, 'Single-Day Ticket'),
('entrance', 'Tokyo Tech Summit VIP', 25000, 'HUF', 28000, 'HUF', '2024-06-23 09:00:00', NULL, 'YES', 9, 2, 2, 'A', 3, 2, 'VIP'),
('entrance', 'Tokyo Tech Summit Regular', 15000, 'HUF', 18000, 'HUF', '2024-06-23 09:00:00', NULL, 'YES', 19, 2, 2, 'B', 7, 2, 'Regular'),
('entrance', 'Sydney Opera Night VIP', 200, 'EUR', 250, 'EUR', '2024-02-18 19:00:00', NULL, 'YES', 22, 3, 3, 'A', 1, 3, 'VIP'),
('entrance', 'Sydney Opera Night Regular', 150, 'EUR', 180, 'EUR', '2024-02-18 19:00:00', NULL, 'YES', 4, 3, 3, 'B', 4, 3, 'Regular'),
('entrance', 'Oktoberfest 7-Day Pass', 250, 'EUR', 280, 'EUR', '2023-10-01 10:00:00', '2023-10-07 23:59:59', 'YES', 2, 4, 4, 'A', 9, 4, 'Week Pass'),
('entrance', 'Oktoberfest Single-Day Ticket', 60, 'EUR', 65, 'EUR', '2023-10-03 08:00:00', '2023-10-03 23:59:59', 'YES', 6, 4, 4, 'B', 2, 4, 'Single-Day Ticket'),
('entrance', 'Oktoberfest VIP Experience', 350, 'EUR', 400, 'EUR', '2023-10-01 10:00:00', '2023-10-07 23:59:59', 'YES', 1, 4, 4, 'C', 5, 4, 'VIP Experience'),
('entrance', 'Dubai Airshow Early Bird', 400, 'EUR', 500, 'EUR', '2023-11-17 09:00:00', '2023-11-21 18:00:00', 'YES', 17, 5, 5, 'A', 8, 5, 'Early Bird'),
('entrance', 'Dubai Airshow Regular', 500, 'EUR', 600, 'EUR', '2023-11-17 09:00:00', '2023-11-21 18:00:00', 'YES', 3, 5, 5, 'B', 4, 5, 'Regular'),
('entrance', 'Dubai Airshow VIP', 700, 'EUR', 800, 'EUR', '2023-11-17 09:00:00', '2023-11-21 18:00:00', 'YES', 2, 5, 5, 'C', 9, 5, 'VIP'),
('entrance', 'Moscow Ballet Regular', 160000, 'HUF', 180000, 'HUF', '2023-12-11 19:00:00', NULL, 'YES', 10, 6, 6, 'A', 6, 6, 'Regular'),
('entrance', 'Moscow Ballet VIP', 240000, 'HUF', 260000, 'HUF', '2023-12-11 19:00:00', NULL, 'YES', 19, 6, 6, 'B', 10, 6, 'VIP'),
('entrance', 'Vancouver Food Fest Early Bird', 180, 'EUR', 200, 'EUR', '2024-08-12 11:00:00', '2024-08-16 20:00:00', 'YES', 8, 7, 7, 'A', 3, 7, 'Early Bird'),
('entrance', 'Vancouver Food Fest Single Day - Regular', 120, 'EUR', 130, 'EUR', '2024-08-12 11:00:00', '2024-08-12 22:00:00', 'YES', 27, 7, 7, 'E', 6, 7, 'Single Day - Regular'),
('entrance', 'Vancouver Food Fest Single Day - VIP', 220, 'EUR', 240, 'EUR', '2024-08-12 11:00:00', '2024-08-12 22:00:00', 'YES', 9, 7, 7, 'F', 1, 7, 'Single Day - VIP'),
('entrance', 'Sao Paulo Art Expo Early Bird', 160000, 'HUF', 180000, 'HUF', '2024-01-22 10:00:00', '2024-01-25 19:00:00', 'YES', 15, 8, 8, 'A', 2, 8, 'Early Bird'),
('entrance', 'Sao Paulo Art Expo Regular', 200000, 'HUF', 220000, 'HUF', '2024-01-22 10:00:00', '2024-01-25 19:00:00', 'YES', 21, 8, 8, 'B', 5, 8, 'Regular'),
('entrance', 'Sao Paulo Art Expo VIP Experience', 280000, 'HUF', 300000, 'HUF', '2024-01-22 10:00:00', '2024-01-25 19:00:00', 'YES', 1, 8, 8, 'C', 10, 8, 'VIP Experience'),
('entrance', 'Nairobi Music Early Bird', 160, 'EUR', 180, 'EUR', '2024-03-12 15:00:00', '2024-03-15 23:59:59', 'YES', 18, 9, 9, 'A', 8, 9, 'Early Bird'),
('entrance', 'Nairobi Music Regular', 200, 'EUR', 220, 'EUR', '2024-03-12 15:00:00', '2024-03-15 23:59:59', 'YES', 3, 9, 9, 'B', 3, 9, 'Regular'),
('entrance', 'Nairobi Music VIP Single-Day Ticket', 300, 'EUR', 320, 'EUR', '2024-03-15 08:00:00', '2024-03-15 23:59:59', 'YES', 9, 9, 9, 'C', 6, 9, 'Single Day - VIP'),
('entrance', 'New York Comic Con Early Bird', 120000, 'HUF', 130000, 'HUF', '2024-10-03 10:00:00', '2024-10-06 18:00:00', 'YES', 5, 10, 10, 'A', 9, 10, 'Early Bird'),
('entrance', 'New York Comic Con Regular', 160000, 'HUF', 170000, 'HUF', '2024-10-03 10:00:00', '2024-10-06 18:00:00', 'YES', 13, 10, 10, 'B', 1, 10, 'Regular'),
('entrance', 'New York Comic Con VIP', 240000, 'HUF', 250000, 'HUF', '2024-10-03 10:00:00', '2024-10-06 18:00:00', 'YES', 4, 10, 10, 'C', 4, 10, 'VIP'),
('entrance', 'Beijing Olympics Early Bird', 350, 'EUR', 400, 'EUR', '2024-07-15 09:00:00', '2024-07-20 23:59:59', 'YES', 15, 11, 11, 'A', 7, 11, 'Early Bird'),
('entrance', 'Beijing Olympics Regular', 500, 'EUR', 550, 'EUR', '2024-07-15 09:00:00', '2024-07-20 23:59:59', 'YES', 7, 11, 11, 'B', 5, 11, 'Regular'),
('entrance', 'Beijing Olympics VIP', 1200, 'EUR', 1300, 'EUR', '2024-07-15 09:00:00', '2024-07-20 23:59:59', 'YES', 29, 11, 11, 'C', 10, 11, 'VIP'),
('entrance', 'Delhi Literature Fest 3-Day Pass', 180000, 'HUF', 200000, 'HUF', '2023-11-05 10:00:00', '2023-11-08 19:00:00', 'YES', 24, 12, 12, 'A', 2, 12, '3-Day Pass'),
('entrance', 'Delhi Literature Fest Single-Day Ticket', 70000, 'HUF', 75000, 'HUF', '2023-11-05 10:00:00', '2023-11-05 22:00:00', 'YES', 16, 12, 12, 'B', 6, 12, 'Single-Day Ticket'),
('entrance', 'Delhi Literature Fest VIP Experience', 300000, 'HUF', 330000, 'HUF', '2023-11-05 10:00:00', '2023-11-08 19:00:00', 'YES', 7, 12, 12, 'C', 9, 12, 'VIP Experience'),
('entrance', 'Rome Film Festival Early Bird', 120, 'EUR', 130, 'EUR', '2024-04-10 09:00:00', NULL, 'YES', 13, 13, 13, 'A', 1, 13, 'Early Bird'),
('entrance', 'Rome Film Festival Regular', 160, 'EUR', 170, 'EUR', '2024-04-10 09:00:00', NULL, 'YES', 15, 13, 13, 'B', 4, 13, 'Regular'),
('entrance', 'Rome Film Festival VIP', 240, 'EUR', 250, 'EUR', '2024-04-10 09:00:00', NULL, 'YES', 10, 13, 13, 'C', 7, 13, 'VIP'),
('entrance', 'Buenos Aires Tango Night Early Bird', 40000, 'HUF', 42000, 'HUF', '2024-09-09 20:00:00', NULL, 'YES', 9, 14, 14, 'A', 3, 14, 'Early Bird'),
('entrance', 'Buenos Aires Tango Night Regular', 52000, 'HUF', 54000, 'HUF', '2024-09-09 20:00:00', NULL, 'YES', 21, 14, 14, 'B', 8, 14, 'Regular'),
('entrance', 'Cape Town Jazz Concert Early Bird', 160, 'EUR', 170, 'EUR', '2024-12-12 18:00:00', NULL, 'YES', 33, 15, 15, 'A', 5, 15, 'Early Bird'),
('entrance', 'Cape Town Jazz Concert Regular', 200, 'EUR', 210, 'EUR', '2024-12-12 18:00:00', NULL, 'YES', 25, 15, 15, 'B', 2, 15, 'Regular');