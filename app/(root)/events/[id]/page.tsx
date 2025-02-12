import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
/* import { SearchParamProps } from "@/types"; */
import { formatDate } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const EventDetails = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { id } = await params;
  const { page } = await searchParams;

  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category.id,
    eventId: event.id,
    page: page as string,
  });

  /*   console.log(event);
  console.log(event.imageUrl); */

  return (
    <>
      <section className="flex justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl items-center">
          <Image
            src={event.imageUrl}
            alt="event image"
            width={1000}
            height={1000}
            className="w-full min-h-[300px] object-cover object-center"
          />
          <div className="flex w-full flex-col gap-4 p-5 md:p-10">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold">{event.title}</h2>
              <div className=" gap-3  sm:items-center">
                <p className="ml-2 mt-2">
                  Organizador:{" "}
                  <span className="text-blue-600">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
                <div className="flex gap-3">
                  <p className="bg-green-500/10 py-2 px-4 text-green-600 rounded-full">
                    {event.isFree
                      ? "Gratuito"
                      : `R$ ${parseInt(event.price).toFixed(2)}`}
                  </p>
                  <p className="text-muted-foreground bg-gray-500/10 py-2 px-4 rounded-full">
                    {event.category.name}
                  </p>
                </div>
              </div>
            </div>
            <CheckoutButton event={event} />
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 md:gap-3 items-center">
                <Calendar size={24} />
                <p>{formatDate(new Date(event.startDateTime), "dd/MM/yyyy")}</p>
              </div>
            </div>
            <div className="flex gap-1 md:gap-3 items-center">
              <MapPin size={24} />
              <p>{event.location}</p>
            </div>
            <div>
              {event.url ? (
                <p className="flex items-center gap-1 mt-2">
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {event.url}
                  </a>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="flex-wrap my-8 flex justify-center gap-8 md:gap-12 md:flex-row ">
        <div className="max-w-screen-xl w-full">
          <h2 className="text-2xl">Descrição</h2>
          <p>{event.description}</p>
        </div>
      </section>
      <section className="flex-wrap my-8 flex justify-center gap-8 md:gap-12 ">
        <div className="max-w-screen-xl w-full ">
          <h2 className="text-2xl mb-4">Eventos Relacionados</h2>
          <Collection
            data={relatedEvents?.data}
            emptyTitle="Nenhum evento encontrado"
            emptyStateSubtext="Tente alterar os filtros"
            collectionType="All_Events"
            limit={3}
            page={1}
            totalPages={relatedEvents?.totalPages}
          />
        </div>
      </section>
    </>
  );
};

export default EventDetails;
