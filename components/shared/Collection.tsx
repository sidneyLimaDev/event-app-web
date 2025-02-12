import React from "react";
import Card from "./Card";
import { Event } from "@prisma/client";
import Pagination from "./Pagination";

type CollectionProps = {
  data: (Event & { category: { name: string; id: string } })[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  totalPages = 0,
  page,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    /*  console.log(collectionType), */
    <>
      {data?.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event.id} className="flex justify-center">
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center min-h-[200px] w-full gap-3 rounded-[14px] bg-gray-50 py-28 text-center">
          <h3 className="font-bold">{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
