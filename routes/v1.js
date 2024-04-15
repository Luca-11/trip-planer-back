import express from "express";

import itinerary from "./v1/itinerary.js";

const router = express.Router();

router.use("/itinerary", itinerary);

export default router;
