import express from "express";

import itinerary from "./v1/itinerary.js";
import mistral from "./v1/mistral.js";

const router = express.Router();

router.use("/itinerary", itinerary);
router.use("/mistral", mistral);

export default router;
