CREATE TABLE produtor (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    municipio VARCHAR(100),
    comunidade VARCHAR(100),
    familiar TINYINT,
    estado VARCHAR(50),
    data_cadastro VARCHAR(10)
);
