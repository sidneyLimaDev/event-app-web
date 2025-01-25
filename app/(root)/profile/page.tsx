import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <>
      {/* Tickets */}
      <section>
        <div className="flex-wrap flex justify-center sm:justify-between ">
          <h3 className="text-2xl text-center sm:text-left">Meus Tickets</h3>
          <Button asChild className="rounded-full">
            <Link href={"/#events"}>Ver mais eventos</Link>
          </Button>
        </div>
      </section>
      {/* Events */}
      {/*       <section className="flex-wrap flex justify-center sm:justify-between ">
      <Collection
          data={events?.data}
          emptyTitle="Nenhum Ticket encontrado"
          emptyStateSubtext="Explore os eventos disponíveis"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section> */}

      {/* Events Orgnized */}
      <section>
        <div className="flex-wrap flex justify-center sm:justify-between ">
          <h3 className="text-2xl text-center sm:text-left">
            Eventos que eu organizo
          </h3>
          <Button asChild className="rounded-full">
            <Link href={"/events/create"}>Criar novo evento</Link>
          </Button>
        </div>
      </section>

      <section className="flex-wrap flex justify-center sm:justify-between ">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="Nenhum evento criado"
          emptyStateSubtext="Crie seu evento agora"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          urlParamName="eventsPage"
          totalPages={2}
        />
      </section>
    </>
  );
};

export default ProfilePage;
