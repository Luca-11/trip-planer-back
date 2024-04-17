import { z } from "zod";

const ItineraryValidator = z.object({
  prompt: z.string().min(1).max(255),
  iaResponse: z.string().min(1).max(500).optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export default ItineraryValidator;
