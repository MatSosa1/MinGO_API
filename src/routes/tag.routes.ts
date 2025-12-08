import { Router } from "express";
import { db } from "../db";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateTagDto } from "../dto/createTagDto";

const router = Router();

router.post("/", async (req, res) => {
  const dto = plainToInstance(CreateTagDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) return res.status(400).json(errors);

  try {
    const result = await db.query(
      `INSERT INTO tags (tag_name) VALUES ($1) RETURNING *`,
      [dto.tag_name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear tag" });
  }
});

router.get("/", async (_, res) => {
  const result = await db.query(`SELECT * FROM tags`);
  res.json(result.rows);
});

router.get("/:id", async (req, res) => {
  const result = await db.query(`SELECT * FROM tags WHERE tag_id = $1`, [
    req.params.id,
  ]);
  if (result.rowCount === 0) return res.status(404).json({ error: "Tag no encontrado" });
  res.json(result.rows[0]);
});

router.put("/:id", async (req, res) => {
  const dto = plainToInstance(CreateTagDto, req.body);
  const errors = await validate(dto);

  if (errors.length > 0) return res.status(400).json(errors);

  const result = await db.query(
    `UPDATE tags SET tag_name = $1 WHERE tag_id = $2 RETURNING *`,
    [dto.tag_name, req.params.id]
  );

  if (result.rowCount === 0) return res.status(404).json({ error: "Tag no encontrado" });
  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const result = await db.query(`DELETE FROM tags WHERE tag_id = $1 RETURNING *`, [
    req.params.id,
  ]);
  if (result.rowCount === 0) return res.status(404).json({ error: "Tag no encontrado" });
  res.json({ message: "Tag eliminado" });
});

export default router;
