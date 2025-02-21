const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Obtener posts públicos y privados (según el usuario autenticado)
router.get("/", async (req, res) => {
  try {
    const userId = req.user?.id;

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { isPublic: true }, // 🔓 Posts públicos visibles para todos
          { authorId: userId }, // 🔒 Posts privados visibles solo para el autor
        ],
      },
      include: { author: true },
    });

    res.json(posts);
  } catch (error) {
    console.error("Error al obtener posts:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear un nuevo post (Público o Privado)
router.post("/", async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;
    const authorId = req.user?.id;

    if (!title || !content || authorId === undefined) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const post = await prisma.post.create({
      data: { title, content, isPublic, authorId },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error al crear post:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
