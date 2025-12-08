CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name TEXT NOT NULL,
    role_add_content BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(20) NOT NULL,
    user_password TEXT NOT NULL,
    user_birth_date TIMESTAMP NOT NULL DEFAULT NOW(),
    user_knowledge_level TEXT NOT NULL DEFAULT 'Principiante',  -- Principiante, Intermedio, Avanzado
    role_id INT NOT NULL,

    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- signs tags
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name TEXT NOT NULL
);

CREATE TABLE signs (
    sign_id SERIAL PRIMARY KEY,
    sign_text TEXT NOT NULL,
    sign_video_url TEXT NOT NULL,
    sign_image_url TEXT,  -- optional
    tag_id INT NOT NULL,

    CONSTRAINT fk_tag_id FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);

-- ROLE INSERT
INSERT INTO roles VALUES 
(DEFAULT, 'Padre', FALSE),
(DEFAULT, 'Docente', TRUE);

-- TAGS INSERT
INSERT INTO tags (tag_name) VALUES
('Alfabético'),
('Animales'),
('Configuración Manual'),
('Días de la Semana'),
('Frases Comunes'),
('Frutas'),
('Geografía');

-- USERS INSERT DATA SAMPLE
INSERT INTO users (user_name, user_password, user_birth_date, role_id) VALUES
('Padre1', 'padre123', NOW(), 1),
('Docente1', 'docente123', NOW(), 2);
