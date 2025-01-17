import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const UpdateEvent = async () => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="py-5 md:py-10">
        <h1>Atualizar Evento</h1>
      </section>
      <div>
        <EventForm userId={userId} type="Update" />
      </div>
    </>
  );
};

export default UpdateEvent;
