import { Router } from "express";
import { db } from "../db";
import { CreateUserDto } from "../dto/createUserDto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

const router = Router();

// Crear usuario
router.post("/register", async (req, res) => {
  const dto = plainToInstance(CreateUserDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const { 
    user_name, 
    user_password, 
    user_email, 
    user_birth_date, 
    user_knowledge_level, 
    role_id,
    user_first_time_login
  } = dto;

  try {
    const result = await db.query(
      `INSERT INTO users (
         user_name, 
         user_password, 
         user_email, 
         user_birth_date, 
         user_knowledge_level, 
         role_id,
         user_first_time_login
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        user_name, 
        user_password, 
        user_email, 
        user_birth_date, 
        user_knowledge_level, 
        role_id,
        user_first_time_login
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error); // Mira la terminal de la API para ver el detalle exacto del error SQL
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  try {
    const result = await db.query(`
      SELECT
        u.user_id,
        u.user_name,
        u.user_password,
        u.user_email,
        u.user_birth_date,
        u.user_knowledge_level,
        u.user_first_time_login,
        u.role_id
      FROM users u
      WHERE user_email = $1 AND user_password = $2`,
      [ email, password ]
    );

    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en login" });
  }
});

router.patch("/knowledge", async (req, res) => {
  const { user_id, knowledge_level } = req.body;

  if (!user_id || !knowledge_level) {
    return res.status(400).json({ error: "Not Enough Data" });
  }

  try {
    const result = await db.query(
      `UPDATE users
      SET user_knowledge_level = $2
      WHERE user_id = $1
      RETURNING *`,
      [ user_id, knowledge_level ]
    );

    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el nivel de conocimiento" });
  }
});

// Obtener usuarios
router.get("/all", async (_, res) => {
  try {
    const result = await db.query(`
      SELECT 
        u.user_id,
        u.user_name,
        u.user_password,
        u.user_email,
        u.user_birth_date,
        u.user_knowledge_level,
        u.user_first_time_login,
        u.role_id
      FROM users u
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

export default router;
