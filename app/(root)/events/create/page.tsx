import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const CreateEvent = async () => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;

  console.log(userId);
  return (
    <>
      <section className="py-5 md:py-10">
        <h1>Criar Evento</h1>
      </section>
      <div>
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
