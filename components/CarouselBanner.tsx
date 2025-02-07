"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselBanner() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  // Array com URLs das imagens
  const images = [
    {
      url: "https://kh5qzrp39y.ufs.sh/f/1TIMouXnTebEu2ivQMk6aw6CltEfHVm8JjbuU0dvSFqpZ9Pc",
      description: "Descrição da imagem 1",
    },
    {
      url: "https://kh5qzrp39y.ufs.sh/f/1TIMouXnTebEHQQuMlaljaRpC6cPd9tqXmys3DUf5unvxKzY",
      description: "Descrição da imagem 1",
    },
  ];

  return (
    <div className="flex justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-[90%] max-"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex p-0 items-center justify-center">
                    <Image
                      src={image.url}
                      width={1200}
                      height={400}
                      alt={image.description}
                      className="h-full w-full rounded-md"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
