CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    level varchar(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);