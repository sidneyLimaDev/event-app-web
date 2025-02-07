import { auth } from "@clerk/nextjs/server";
import { Event } from "@prisma/client";
import { formatDate } from "date-fns";
import { ArrowBigRight, Edit, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfimation";

type CardProps = {
  event: Event & { category: { name: string; id: string } }; // Incluindo category diretamente no tipo
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizerId.toString();

  /* console.log("Card", event); */
  return (
    <div className="group relative w-full h-full max-w-[400px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg md:min-h-[438px] ">
      <Link
        href={`/events/${event.id}`}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      >
        <Image
          src={event.imageUrl}
          alt="event image"
          width={500}
          height={500}
          className="w-full h-[250px] object-cover object-center"
        />
        <span className="text-muted-foreground bg-orange-400 text-white py-2 px-4 rounded-tr-lg absolute -mt-10">
          {event.category.name}
        </span>
      </Link>
      {isEventCreator && !hidePrice && (
        <div className="flex flex-col absolute top-2 right-2 gap-2 rounded-xl bg-white p-2 shadow-sm transition-all text-blue-500">
          <Link href={`/events/${event.id}/update`}>
            <Edit />
          </Link>
          <hr className="px-2" />
          <DeleteConfirmation eventId={event.id} />
        </div>
      )}
      <div className="p-3">
        <p className="text-blue-500 font-medium">
          {formatDate(new Date(event.startDateTime), "dd MMM")} -{" "}
          {formatDate(new Date(event.endDateTime), "dd MMM")}{" "}
        </p>

        <h3 className="text-lg font-medium">{event.title}</h3>
        <p className="text-sm from-neutral-400 text-wrap text-ellipsis overflow-hidden line-clamp-2 mb-1">
          {event.description}
        </p>
        <p className="text-xs from-neutral-400 flex items-center text-nowrap text-ellipsis overflow-hidden">
          <MapPin width={14} height={14} /> {event.location}
        </p>
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="bg-green-500/10 py-2 px-4 text-green-600 rounded-full">
              {event.isFree
                ? "Gratuito"
                : `R$ ${parseInt(event.price).toFixed(2)}`}
            </span>
          </div>
        )}

        <div className="flex content-between">
          {hasOrderLink && (
            <Link href={`/orders?evenId=${event.id}`}>
              <p className="text-blue-500">Detalhes do pedido</p>
              <ArrowBigRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
