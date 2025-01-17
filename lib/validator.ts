import { z } from "zod";
export const eventFormSchema = z.object({
  title: z.string().min(3, "O titulo tem que ter mais que 3 caracteres"),
  description: z
    .string()
    .min(3, "A descrição tem que ter mais que 3 caracteres")
    .max(400, "A descrição tem que ter menos que 100 caracteres"),
  location: z
    .string()
    .min(3, "A localização tem que ter mais que 3 caracteres")
    .max(100, "A localização tem que ter menos que 100 caracteres"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z
    .string()
    .min(3, "O preço tem que ter mais que 3 caracteres")
    .max(100, "O preço tem que ter menos que 100 caracteres"),
  isFree: z.boolean(),
  url: z.string().url(),
  ticket: z.number().min(1, "O ticket tem que ser maior que 1"),
  maxTicket: z.number().min(1, "O maxTicket tem que ser maior ou igual a 1"),
});
