USE mysqldb;

INSERT IGNORE INTO users (username, password) VALUES
  ('alice', 'password123'),
  ('bob', 'password456'),
  ('charlie', 'password789');