-- USE name_of_db;

-- DROP TABLE usersDb;

USE name_of_db;

CREATE TABLE IF NOT EXISTS usersDb (
        user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR (100) UNIQUE NOT NULL,
        password VARCHAR (100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );