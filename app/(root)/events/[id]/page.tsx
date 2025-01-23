import { getEventById } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import { formatDate } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventById(id);
  console.log(event);
  console.log(event.imageUrl);

  return (
    <section className="flex justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={event.imageUrl}
          alt="event image"
          width={1000}
          height={1000}
          className="w-full min-h-[300px] object-cover object-center"
        />
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl">{event.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="bg-green-500/10 py-2 px-4 text-green-600 rounded-full">
                  {event.isFree ? "Gratuito" : `R$ ${event.price}`}
                </p>
                <p className="text-muted-foreground bg-gray-500/10 py-2 px-4 rounded-full">
                  {event.category.name}
                </p>
              </div>
              <p className="ml-2 mt-2">
                Organizador:{" "}
                <span className="text-blue-600">
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </p>
            </div>
          </div>
          {/* Buy Button */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3 items-center">
              <Calendar size={24} />
              <p>{formatDate(new Date(event.startDateTime), "dd/MM/yyyy")}</p>
            </div>
          </div>
          <div className="flex gap-2 md:gap-3 items-center">
            <MapPin size={24} />
            <p>{event.location}</p>
          </div>
          <div>
            <h3 className="text-xl">Descrição</h3>
            <p>{event.description}</p>
            {event.url ? (
              <p className="flex items-center gap-2 mt-2">
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
  );
};

export default EventDetails;