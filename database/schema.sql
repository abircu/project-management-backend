
CREATE DATABASE IF NOT EXISTS project_management
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE project_management;

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  status ENUM('pending', 'active', 'completed') DEFAULT 'pending',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL DEFAULT NULL,
  INDEX idx_status (status),
  INDEX idx_name (name)
);
