import React from "react";
import { Button } from "../ui/button";
import { Event } from "@prisma/client";

const Checkout = ({ event, userId }: { event: Event; userId: string }) => {
  const onCheckout = async () => {
    console.log("checkout");
  };
  return (
    <form action={onCheckout}>
      <Button type="submit" role="link">
        {event.isFree ? "Pegue seu Ticket" : "Comprar Ticket"}
      </Button>
    </form>
  );
};

export default Checkout;
