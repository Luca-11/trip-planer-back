import express from "express";
import { PrismaClient } from "@prisma/client";

import ItineraryValidator from "../../validators/ItineraryValidator.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const prisma = new PrismaClient();

// router.post("/", async (req, res) => {
//   const { prompt, iaResponse, created_at, updated_at } =
//     ItineraryValidator.parse(req.body);

//   const itinerary = await prisma.itinerary.create({
//     data: {
//       prompt,
//       iaResponse,
//       created_at,
//       updated_at,
//     },
//   });

//   res.status(201).json(itinerary);
// });

router.get("/", async (req, res) => {
  const itineraries = await prisma.itinerary.findMany();

  res.json(itineraries);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const itinerary = await prisma.itinerary.findUnique({
    where: {
      id: id,
    },
  });

  if (!itinerary) {
    return res.status(404).json({ message: "Itinerary not found" });
  }

  res.json(itinerary);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { prompt } = ItineraryValidator.parse(req.body);

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
          model: "mistral-small-latest",
          messages: [{ role: "user", content: prePrompt + " " + prompt }],
        }),
      }
    );

    const mistralData = await mistralResponse.json();

    console.log(mistralData.choices[0].message.content);

    const itinerary = await prisma.itinerary.update({
      where: {
        id: id,
      },
      data: {
        prompt,
        iaResponse: JSON.parse(mistralData.choices[0].message.content),
        updated_at: new Date(),
      },
    });

    res.json(itinerary);
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
});

const MISTRAL_API_KEY = process.env.MISTRAL_API_URL;
const prePrompt =
  "Tu es un planificateur de voyage, expert en tourisme. Pour la destination, le nombre de jours et le moyen de locomotion que je te donnerai à la fin du message, programme moi un itinéraire en plusieurs étapes Format de données souhaité: une liste d'élement en JSON, avec, pour chaque étape: - le nom du lieu (clef JSON: name) -sa position géographique (clef JSON: location-> avec latitude/longitude en numérique) - une courte description du lieu (clef JSON: description) Donne-moi uniquement cette liste d'étape JSON, tu as interdiction de rajouter des informations supplémentaires en dehors de la liste JSON.Tu ne dois pas rajouter de texte ou des commentaires après m'avoir envoyé la liste JSON.";

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
          model: "mistral-small-latest",
          messages: [{ role: "user", content: prePrompt + " " + prompt }],
        }),
      }
    );

    const mistralData = await mistralResponse.json();

    console.log(mistralData.choices[0].message.content);

    const itinerary = await prisma.itinerary.create({
      data: {
        prompt,
        iaResponse: JSON.parse(mistralData.choices[0].message.content),
      },
    });

    res.status(201).json(itinerary);
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { prompt, iaResponse } = ItineraryValidator.parse(req.body);

  const itinerary = await prisma.itinerary.update({
    where: {
      id: id,
    },
    data: {
      prompt,
      iaResponse,
      updatedAt: new Date(),
    },
  });

  res.json(itinerary);
});

export default router;
