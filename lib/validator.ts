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
  startDateTime: z.date().refine((date) => date > new Date(), {
    message: "A data de início deve ser no futuro.",
  }),
  endDateTime: z.date().refine((date) => date > new Date(), {
    message: "A data de término deve ser no futuro.",
  }),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
  tickets: z.number().min(1, "O ticket tem que ser maior que 1"),
  maxTickets: z.number().min(1, "O maxTicket tem que ser maior ou igual a 1"),
});
