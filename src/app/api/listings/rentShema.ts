import { z } from "zod";
export const rentShema = z.object({
  category: z.string().nonempty({ message: "category is required!" }),
  //location: z.object().nonempty({ message: "location is required!" }),
  guestCount: z.number().min(1, { message: "min value of guest is 1" }),
  roomCount: z.number().min(1, { message: "min value of rooms is 1" }),
  bathroomCount: z.number().min(1, { message: "min value of bathroom is 1" }),
  price: z.number().min(1, { message: "min value of bathroom is 1" }),
  imageSrc: z.string().nonempty({ message: "image is required!" }),
  description: z.string().nonempty({ message: "description is required!" }),
  title: z.string().nonempty({ message: "title is required!" }),
});
