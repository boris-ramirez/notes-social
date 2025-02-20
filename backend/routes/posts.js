const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Obtener todos los posts
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true }, // Incluir info del autor
    });
    res.json(posts);
  } catch (error) {
    console.error("Error al obtener posts:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear un nuevo post
router.post("/", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId }, // Conectamos con el usuario existente
        },
      },
      include: { author: true },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error al crear post:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
