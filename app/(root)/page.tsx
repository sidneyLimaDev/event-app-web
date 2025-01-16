import { CarouselBanner } from "@/components/CarouselBanner";

export default function Home() {
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
          Search CategoryFilter
        </div>
      </section>
    </>
  );
}
