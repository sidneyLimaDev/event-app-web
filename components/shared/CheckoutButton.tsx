"use client";

import { SignedOut, SignedIn } from "@clerk/nextjs";
import { Event } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: Event }) => {
  /*   const { user } = useUser();
  const userId = user?.publicMetadata.userId as string; */
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div>
      {hasEventFinished ? (
        <p className="text-red-400">Desculpe mas os Tickets acabaram</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="rounded-full">
              <Link href={"/sign-in"}>Comprar Ticket</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
