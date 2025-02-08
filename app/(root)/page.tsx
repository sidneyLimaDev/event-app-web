import { CarouselBanner } from "@/components/CarouselBanner";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {
  // Aguarde os parâmetros de busca antes de usá-los
  const { page = "1", query = "", category = "" } = (await searchParams) || {};

  // Converta os parâmetros
  const pageNumber = Number(page) || 1;
  const searchText = query as string;
  const categoryText = category as string;

  const events = await getAllEvents({
    query: searchText,
    category: categoryText,
    page: pageNumber,
    limit: 6,
  });

  return (
    <>
      <section className="bg-primary-50 flex justify-center">
        <div className=" py-10 w-full max-w-screen-xl">
          <CarouselBanner />
        </div>
      </section>
      <section id="events" className=" my-8 flex justify-center">
        <div className="w-full max-w-screen-xl">
          <h2 className="text-3xl font-bold">Eventos</h2>
          <div className="flex w-full flex-col gap-5 md:flex-row py-4">
            <Search /> <CategoryFilter />
          </div>
          <Collection
            data={events?.data}
            emptyTitle="Nenhum evento encontrado"
            emptyStateSubtext="Tente alterar os filtros"
            collectionType="All_Events"
            limit={3}
            page={1}
            totalPages={2}
          />
        </div>
      </section>
      <div className="w-full bg-[url(/assets/images/banner-4.png)] h-64 bg-cover flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold">
          Eventos especialmente selecionados para você!
        </h3>
        <p className="mb-4">
          Receba sugestões de eventos adaptadas aos seus interesses! Não deixe
          seus eventos favoritos escaparem.
        </p>
        <Button>Acesse agora</Button>
      </div>
    </>
  );
}
