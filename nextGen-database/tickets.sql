CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seat_number INT NOT NULL,
    event_id INT NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'available',
    FOREIGN KEY (event_id) REFERENCES events(id)
);
