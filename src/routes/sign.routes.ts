import { Router } from "express";
import { db } from "../db";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateSignDto } from "../dto/createSignDto";
import { CreateSignSynonymDto } from "../dto/createSignSynonymDto";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const dto = plainToInstance(CreateSignDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) return res.status(400).json({ errors });

    const result = await db.query(
      `INSERT INTO signs (sign_title, sign_video_url, sign_image_url, sign_section, tag_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        dto.sign_title,
        dto.sign_video_url,
        dto.sign_image_url ?? null,
        dto.sign_section,
        dto.tag_id,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (_, res) => {
  const result = await db.query(`SELECT * FROM signs`);
  res.json(result.rows);
});

router.get("/:id", async (req, res) => {
  const result = await db.query(
    `SELECT * FROM signs WHERE sign_id = $1`,
    [req.params.id]
  );
  if (result.rowCount === 0) return res.status(404).json({ error: "No encontrado" });
  res.json(result.rows[0]);
});

router.put("/:id", async (req, res) => {
  const dto = plainToInstance(CreateSignDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) return res.status(400).json({ errors });

  const result = await db.query(
    `UPDATE signs
    SET sign_title = $1, sign_video_url = $2, sign_image_url = $3 sign_section = $4, tag_id = $5
     WHERE sign_id = $6 RETURNING *`,
    [
      dto.sign_title,
      dto.sign_video_url,
      dto.sign_image_url ?? null,
      dto.sign_section,
      dto.tag_id,
      req.params.id,
    ]
  );

  if (result.rowCount === 0) return res.status(404).json({ error: "No encontrado" });
  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const result = await db.query(
    `DELETE FROM signs WHERE sign_id = $1 RETURNING *`,
    [req.params.id]
  );
  if (result.rowCount === 0) return res.status(404).json({ error: "No encontrado" });
  res.json({ message: "Eliminado" });
});

router.post("/:id/synonyms", async (req, res) => {
  const dto = plainToInstance(CreateSignSynonymDto, {
    ...req.body,
    sign_id: Number(req.params.id),
  });

  const errors = await validate(dto);
  if (errors.length > 0) return res.status(400).json({ errors });

  const result = await db.query(
    `INSERT INTO signs_synonyms (synonym_word, sign_id)
     VALUES ($1, $2) RETURNING *`,
    [dto.synonym_word, dto.sign_id]
  );

  res.json(result.rows[0]);
});

router.get("/:id/synonyms", async (req, res) => {
  const result = await db.query(
    `SELECT * FROM signs_synonyms WHERE sign_id = $1`,
    [req.params.id]
  );
  res.json(result.rows);
});

router.get("/:id/synonyms/:synonym_id", async (req, res) => {
  const result = await db.query(
    `SELECT * FROM signs_synonyms WHERE synonym_id = $1 AND sign_id = $2`,
    [req.params.synonym_id, req.params.id]
  );

  if (result.rowCount === 0) return res.status(404).json({ error: "No encontrado" });
  res.json(result.rows[0]);
});

router.put("/:id/synonyms/:synonym_id", async (req, res) => {
  const dto = plainToInstance(CreateSignSynonymDto, {
    ...req.body,
    sign_id: Number(req.params.id),
  });

  const errors = await validate(dto);
  if (errors.length > 0) return res.status(400).json({ errors });

  const result = await db.query(
    `UPDATE signs_synonyms
      SET synonym_word = $1, sign_id = $2
      WHERE synonym_id = $3 AND sign_id = $4 RETURNING *`,
    [dto.synonym_word, dto.sign_id, req.params.synonym_id, req.params.id]
  );

  if (result.rowCount === 0) return res.status(404).json({ error: "No encontrado" });
  res.json(result.rows[0]);
});

router.delete("/:id/synonyms/:synonym_id", async (req, res) => {
  const result = await db.query(
    `DELETE FROM signs_synonyms WHERE synonym_id = $1 AND sign_id = $2 RETURNING *`,
    [req.params.synonym_id, req.params.id]
  );

  if (result.rowCount === 0) return res.status(404).json({ error: "No encontrado" });
  res.json({ message: "Eliminado" });
});

export default router;
