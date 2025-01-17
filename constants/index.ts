export const headerLinks = [
  { label: "Home", href: "/" },
  { label: "Criar evento", href: "/events/create" },
  { label: "Meu Perfil", href: "/profile" },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
  ticket: 1,
  maxTicket: 1,
};
