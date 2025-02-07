import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const CreateEvent = async () => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;

  console.log(userId);
  return (
    <>
      <section className="py-5 md:py-10 flex justify-center">
        <div className="w-full max-w-screen-xl mx-auto px-5">
          <h1 className="text-3xl font-bold mb-4">Criar Evento</h1>
          <EventForm userId={userId} type="Create" />
        </div>
      </section>
      <div></div>
    </>
  );
};

export default CreateEvent;
