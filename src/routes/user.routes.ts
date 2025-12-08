import { Router } from "express";
import { db } from "../db";
import { CreateUserDto } from "../dto/createUserDto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

const router = Router();

// Crear usuario
router.post("/", async (req, res) => {
  const dto = plainToInstance(CreateUserDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const { user_name, user_password, user_birth_date } = dto;

  try {
    const result = await db.query(
      `INSERT INTO users (user_name, user_password, user_birth_date)
       VALUES ($1, $2, $3) RETURNING *`,
      [user_name, user_password, user_birth_date]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  try {
    const result = await db.query(`
      SELECT
        u.user_id,
        u.user_name,
        u.user_password,
        u.user_birth_date,
        r.role_name
      FROM users u
      INNER JOIN roles r ON u.role_id = r.role_id
      WHERE user_name = $1 AND user_password = $2`,
      [ name, password ]
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
  const { userId, knowledgeLevel } = req.body;

  if (!userId || !knowledgeLevel) {
    return res.status(400).json({ error: "Not Enough Data" });
  }

  try {
    const result = await db.query(
      `UPDATE users
      SET user_knowledge_level = $2
      WHERE user_id = $1
      RETURNING user_id, user_name, user_knowledge_level`,
      [ userId, knowledgeLevel ]
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
        u.user_birth_date,
        r.role_name
      FROM users u
      INNER JOIN roles r ON u.role_id = r.role_id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

export default router;
