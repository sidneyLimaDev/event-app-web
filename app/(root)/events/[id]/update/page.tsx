import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type UpdateEventProps = {
  params: {
    id: string;
  };
};
const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = await auth();

  const event = await getEventById(id);
  console.log("page", event);

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="py-5 md:py-10">
        <h1>Atualizar Evento</h1>
      </section>
      <div>
        <EventForm
          event={event}
          eventId={event.id}
          userId={userId}
          type="Update"
        />
      </div>
    </>
  );
};

export default UpdateEvent;
