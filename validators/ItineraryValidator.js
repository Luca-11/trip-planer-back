import { z } from "zod";

const ItineraryValidator = z.object({
  prompt: z.string().min(1).max(255),
  iaResponse: z.string().min(1).max(500),
  datetime: z.string().datetime().optional(),
});

export default ItineraryValidator;
