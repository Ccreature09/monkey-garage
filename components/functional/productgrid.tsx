import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  tags: string[];
  mainImage: string;
  images: string[];
  reviews?: Review[];
  averageRating?: number;
}
interface Review {
  user: string;
  text: string;
  photoURL: string;
  stars: number;
  productImageURL: string;
}

const calculateAverageRating = (reviews: Review[]): number => {
  const total = reviews.reduce((acc, review) => acc + review.stars, 0);
  return reviews.length > 0 ? total / reviews.length : 0;
};

interface ProductGridProps {
  category?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("name-asc");
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const sortProducts = (option: string) => {
    let sorted = [...products];

    switch (option) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-high":
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "price-low":
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "tags":
        sorted.sort((a, b) => a.tags.join().localeCompare(b.tags.join()));
        break;
      case "rating":
        sorted.sort((a, b) => {
          const ratingA = a.averageRating ?? 0;
          const ratingB = b.averageRating ?? 0;
          return ratingB - ratingA;
        });
        break;
      default:
        break;
    }

    setSortedProducts(sorted);
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const nextPage = () => {
    if (currentPage < Math.ceil(sortedProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    sortProducts(sortOption);
  }, [sortOption, products]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData: Product[] = querySnapshot.docs.map((doc) => {
        const product = doc.data() as Product;

        const reviewsData = product.reviews || [];

        const averageRating = calculateAverageRating(reviewsData);

        return {
          ...product,
          id: doc.id,
          averageRating,
        };
      });

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const fetchProductsByCategory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData: Product[] = querySnapshot.docs
        .map((doc) => {
          const product = doc.data() as Product;

          const reviewsData = product.reviews || [];
          const averageRating = calculateAverageRating(reviewsData);

          return {
            ...product,
            id: doc.id,
            averageRating,
          };
        })
        .filter((product) => product.tags.includes(category!));

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    if (category) {
      fetchProductsByCategory();
    } else {
      fetchProducts();
    }
  }, [category]);

  return (
    <>
      <h2 className=" text-5xl font-bold text-center">
        Каталог {category && ` - ${category} `}
      </h2>
      <div className="flex justify-end my-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Сортирай по</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={sortOption}
              onValueChange={setSortOption}
            >
              <DropdownMenuRadioItem value="name-asc">
                Име (A-Z)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name-desc">
                Име (Z-A)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-high">
                Цена (Висока - Ниска)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="price-low">
                Цена (Ниска - Висока)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="rating">
                Рейтинг
              </DropdownMenuRadioItem>

              <DropdownMenuRadioItem value="tags">Тагове</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Link
              href={`/products/${encodeURIComponent(product.name)}`}
              key={product.id}
            >
              <Card>
                <CardHeader>
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    width={400}
                    height={100}
                    loading="lazy"
                    className="rounded"
                  />

                  <CardTitle>{product.name}</CardTitle>

                  <div className="text-sm text-slate-500 gap-2 dark:text-slate-400 pb-11">
                    {product.tags.map((tag, index) => (
                      <Badge className="mx-0.5 my-0.5" key={index}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardFooter className="relative">
                  <p className="text-2xl font-bold">{product.price} лв.</p>
                  <button className="absolute right-5 px-4 py-2 rounded-lg  bg-blue-500 text-white bottom-0">
                    Купи
                  </button>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <>
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
            <Skeleton className="w-full h-[600px]" />
          </>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="py-2 px-6 mx-4 shadow-xl rounded-lg">
          {currentPage}
        </span>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(sortedProducts.length / productsPerPage)
          }
        >
          Next
        </Button>
      </div>
    </>
  );
};
