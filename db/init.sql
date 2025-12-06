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
    role_id INT NOT NULL,

    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- ROLE INSERT

INSERT INTO roles VALUES 
(DEFAULT, 'Padre', FALSE),
(DEFAULT, 'Docente', TRUE);
