import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient();
const MISTRAL_API_KEY = process.env.MISTRAL_API_URL;
const prePrompt =
  "Tu es un planificateur de voyage, expert en tourisme. Pour la destination, le nombre de jours et le moyen de locomotion que je te donnerai à la fin du message, programme moi un itinéraire en plusieurs étapes Format de données souhaité: un JSON Avec, pour chaque étape: - le nom du lieu (clef JSON: name) -sa position géographique (clef JSON: location-> avec latitude/longitude en numérique) - une courte description (clef JSON: description) Donne-moi juste cette liste d'étape, sans texte autour.";

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'The field "prompt" is required.' });
  }

  try {
    const mistralResponse = await fetch(
      "https://api.mistral.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: "open-mistral-7b",
          messages: [{ role: "user", content: prePrompt + " " + prompt }],
        }),
      }
    );

    const mistralData = await mistralResponse.json();

    const trip = await prisma.itinerary.create({
      data: {
        prompt,
        iaResponse: JSON.stringify(mistralData.choices[0].message.content),
      },
    });

    res.status(200).json(trip);
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'The field "prompt" is required.' });
  }

  try {
    const mistralResponse = await fetch(
      "https://api.mistral.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: "open-mistral-7b",
          messages: [{ role: "user", content: prePrompt + " " + prompt }],
        }),
      }
    );

    const mistralData = await mistralResponse.json();

    const trip = await prisma.itinerary.update({
      where: {
        id: id,
      },
      data: {
        prompt,
        iaResponse: JSON.stringify(mistralData.choices[0].message.content),
      },
    });

    res.status(200).json(trip);
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
});

export default router;
