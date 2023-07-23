import { z } from "zod";

export const resaveShema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  listingId: z.string().nonempty({ message: "listingID is required!" }),
});
