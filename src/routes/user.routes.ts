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

  const { user_name, user_password, user_birth_date, role_id } = dto;

  try {
    const result = await db.query(
      `INSERT INTO users (user_name, user_password, user_birth_date)
       VALUES ($1, $2, $3) RETURNING *`,
      [user_name, user_password, user_birth_date, role_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// Obtener usuarios
router.get("/", async (_, res) => {
  try {
    const result = await db.query(`
      SELECT 
        u.user_id,
        u.user_name,
        u.user_password,
        u.user_birth_date,
        r.role_name,
        r.role_add_content
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
