import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type Params = Promise<{ id: string }>;

const UpdateEvent = async ({ params }: { params: Params }) => {
  // Espera a promessa ser resolvida para acessar o id
  const { id } = await params;

  // Fazendo a autenticação
  const { sessionClaims } = await auth();

  // Buscando o evento pelo ID
  const event = await getEventById(id);
  console.log("page", event);

  // Pegando o userId da sessão
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
