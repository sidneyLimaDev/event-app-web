import { CarouselBanner } from "@/components/CarouselBanner";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { getAllEvents } from "@/lib/actions/event.actions";

export default async function Home() {
  const events = await getAllEvents({
    query: "",
    category: "",
    limit: 6,
    page: 1,
  });

  console.log("Page", events);
  return (
    <>
      <section className="bg-primary-50">
        <div className=" py-10">
          <CarouselBanner />
        </div>
      </section>
      <section id="events" className=" my-8">
        <h2>Eventos</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search /> <CategoryFilter />
        </div>
        <Collection
          data={events?.data}
          emptyTitle="Nenhum evento encontrado"
          emptyStateSubtext="Tente alterar os filtros"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
}
