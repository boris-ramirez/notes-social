const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();

const router = express.Router();
const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              image: profile.photos[0].value,
            },
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login",
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, image: true },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) return done(null, false, { message: "Usuario no encontrado" });

      if (!user.password) {
        return done(null, false, {
          message:
            "Este usuario no tiene contraseña. Inicia sesión con Google.",
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return done(null, false, { message: "Contraseña incorrecta" });

      return done(null, user);
    }
  )
);

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ error: "Error al registrar usuario" });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/user", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "No autenticado" });
  }
  res.json(req.user);
});

router.get("/logout", (req, res) => {
  req.logout(() => res.json({ message: "Sesión cerrada" }));
});

router.post("/set-password", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  if (user.password) {
    return res
      .status(400)
      .json({ error: "Este usuario ya tiene una contraseña establecida." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  res.json({
    message:
      "Contraseña establecida correctamente. Ahora puedes iniciar sesión con tu correo y contraseña.",
  });
});

module.exports = router;
