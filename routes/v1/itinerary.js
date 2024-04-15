import express from "express";
import { PrismaClient } from "@prisma/client";

import ItineraryValidator from "../../validators/ItineraryValidator.js";

const router = express.Router();

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { prompt, iaResponse, datetime } = ItineraryValidator.parse(req.body);

  const itinerary = await prisma.itinerary.create({
    data: {
      prompt,
      iaResponse,
      datetime,
    },
  });

  res.status(201).json(itinerary);
});

router.get("/", async (req, res) => {
  const itineraries = await prisma.itinerary.findMany();

  res.json(itineraries);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const itinerary = await prisma.itinerary.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!itinerary) {
    return res.status(404).json({ message: "Itinerary not found" });
  }

  res.json(itinerary);
});

export default router;
