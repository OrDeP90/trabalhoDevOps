CREATE TABLE IF NOT EXISTS doadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  tipo_sanguineo VARCHAR(3) NOT NULL,
  data_nascimento DATE NOT NULL,
  email VARCHAR(100),
  consentimento BOOLEAN DEFAULT false
);
