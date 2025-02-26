import adjectives from "adjectives";
import { Router } from "express";
import nocache from "nocache";

import { capitalizeFirstLetter, getRandomElement } from "./lib.js";

const router = Router();

router.use(nocache());

router.get("/", (req, res) => {
  const adj = capitalizeFirstLetter(getRandomElement(adjectives));
  res.json({ message: `Hello, ${adj} World!` });
});

router.use((req, res) => {
  res.status(404).json({
    error: 404,
    message: "Not Found",
  });
});

router.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({
    error: 500,
    message: "Internal Server Error",
  });
});

export default router;
