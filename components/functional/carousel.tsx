import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "@/firebase/firebase";
import { Skeleton } from "../ui/skeleton";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function MainCarousel() {
  const [mainCarouselData, setMainCarouselData] = useState<
    { id: string; url: string }[]
  >([]);

  function CarouselPlugin() {
    const plugin = React.useRef(
      Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    return (
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {mainCarouselData.map((image, index) => (
            <CarouselItem key={image.id}>
              <div className="p-1 flex mx-auto">
                <img src={image.url} className="flex mx-auto" alt="" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="mx-5" />
        <CarouselNext className="mx-5" />
      </Carousel>
    );
  }

  useEffect(() => {
    const fetchMainCarouselData = async () => {
      try {
        const carouselDoc = doc(db, "carousel/mainCarousel");

        const documentSnapshot = await getDoc(carouselDoc);
        const data = documentSnapshot.data();

        if (data && data.urls) {
          setMainCarouselData(data.urls);
        }
      } catch (error) {
        console.error("Error fetching main carousel data: ", error);
      }
    };

    fetchMainCarouselData();
  }, []);

  return (
    <>
      {mainCarouselData.length === 0 ? (
        <Skeleton className="h-[50vh] w-full" />
      ) : (
        <CarouselPlugin></CarouselPlugin>
      )}
    </>
  );
}

export function ProductsCarousel() {
  const [productsCarouselData, setProductsCarouselData] = useState<{
    [key: string]: { name: string; price: number; imageUrl: string };
  }>({});

  useEffect(() => {
    const fetchProductsCarouselData = async () => {
      try {
        const carouselDoc = doc(db, "carousel", "productsCarousel");

        const documentSnapshot = await getDoc(carouselDoc);

        const data = documentSnapshot.data();

        if (data && data.products) {
          setProductsCarouselData(data.products);
        }
      } catch (error) {
        console.error("Error fetching products carousel data: ", error);
      }
    };

    fetchProductsCarouselData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="m-10">
        <h2 className="text-3xl font-bold">Най продавани продукти:</h2>
        <hr className="my-3" />
        {Object.keys(productsCarouselData).length === 0 ? (
          <Skeleton className="h-[50vh] w-full" />
        ) : (
          <Slider {...settings}>
            {Object.entries(productsCarouselData).map(
              ([productId, productData], index) => (
                <div key={index} className=" p-3 border-2">
                  <Image
                    src={productData.imageUrl}
                    alt={`Product ${index + 1}`}
                    width={250}
                    height={250}
                    className="w-[250px] object-contain h-[250px] mx-auto"
                  />
                  <h3 className="font-semibold text-center my-2 text-4xl">
                    {productData.name}
                  </h3>
                  <p className="text-center text-xl font-medium">
                    {productData.price} лв.
                  </p>
                  <Link
                    key={productId}
                    href={`/products/${encodeURIComponent(productData.name)}`}
                  >
                    <button className="  px-4 py-2 mt-2 rounded-lg w-full bg-blue-500 text-white bottom-0">
                      Купи
                    </button>
                  </Link>
                </div>
              )
            )}
          </Slider>
        )}
      </div>
    </>
  );
}
