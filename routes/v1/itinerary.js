import express from "express";
import { PrismaClient } from "@prisma/client";
import ItineraryValidator from "../../validators/ItineraryValidator.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient();

const model = process.env.MISTRAL_MODEL;
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_API_URL = process.env.MISTRAL_API_URL;
const prePrompt = process.env.PRE_PROMPT;

router.get("/", async (req, res) => {
  const itineraries = await prisma.itinerary.findMany({
    orderBy: {
      updated_at: "desc",
    },
    take: 4,
  });

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

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'The field "prompt" is required.' });
  }

  try {
    const mistralResponse = await fetch(process.env.MISTRAL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: prePrompt + " " + prompt }],
      }),
    });

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
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { prompt } = ItineraryValidator.parse(req.body);

  try {
    console.log("Making request to Mistral API...");

    const mistralResponse = await fetch(process.env.MISTRAL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: prePrompt + " " + prompt }],
      }),
    });

    console.log("Received response from Mistral API:", mistralResponse);

    const mistralData = await mistralResponse.json();

    console.log("Parsed response data:", mistralData);

    console.log("Updating itinerary in database...");

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

    console.log("Updated itinerary:", itinerary);

    res.json(itinerary);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
