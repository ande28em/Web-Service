-- Remove any existing database and user.
DROP DATABASE IF EXISTS social;
DROP USER IF EXISTS social_user@localhost;

-- Create social database and user. Ensure Unicode is fully supported.
CREATE DATABASE social CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER social_user@localhost IDENTIFIED WITH mysql_native_password BY 'social';
GRANT ALL PRIVILEGES ON social.* TO social_user@localhost;

USE social
GO

DROP TABLE IF EXISTS guest

CREATE TABLE guest (
  id SERIAL PRIMARY KEY,
  firstname text,
  lastname text
)
GO