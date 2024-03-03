import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  collection,
  onSnapshot,
  deleteDoc,
  DocumentData,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Product } from "@/interfaces";

export default function ProductList({
  onEditProduct,
}: {
  onEditProduct: (productId: string) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, "products");
      try {
        const unsubscribe = onSnapshot(productsRef, (querySnapshot) => {
          const productsData: Product[] = [];
          querySnapshot.forEach((doc) => {
            const product = doc.data() as DocumentData;
            productsData.push({
              id: doc.id,
              ...product,
            } as Product);
          });

          setProducts(productsData);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    setMounted(true);
    fetchProducts();
  }, []);

  const deleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, "products", productId));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const editProduct = (productId: string) => {
    onEditProduct(productId);
  };

  const addProductToCarousel = async (productId: string) => {
    const product = products.find((p) => p.id === productId);

    if (product) {
      const carouselRef = doc(db, "carousel/productsCarousel");

      try {
        // Fetch the existing document data
        const documentSnapshot = await getDoc(carouselRef);
        const data = documentSnapshot.data();

        // Check if the product is already in the carousel
        if (data && data.products && data.products[productId]) {
          // Product is already in the carousel, remove it
          const { [productId]: removedProduct, ...remainingProducts } =
            data.products;

          await updateDoc(doc(db, "carousel/productsCarousel"), {
            products: remainingProducts,
          });
        } else {
          // Product is not in the carousel, add it
          const updatedProducts = {
            ...data?.products,
            [productId]: {
              name: product.name,
              imageUrl: product.mainImage,
              price: product.price,
            },
          };

          await updateDoc(doc(db, "carousel/productsCarousel"), {
            products: updatedProducts,
          });
        }
      } catch (error) {
        console.error("Error updating carousel: ", error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {mounted && (
        <>
          <Table className="shadow-xl">
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      width={100}
                      height={0}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price} лв.</TableCell>
                  <TableCell>
                    <div className="justify-center flex ">
                      <Button
                        className="mx-1"
                        onClick={() => editProduct(product.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="mx-1"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="justify-center flex">
                      <Link
                        className="my-2 mx-1"
                        href={`/products/${encodeURIComponent(product.name)}`}
                        key={product.id}
                      >
                        <Button className="">Visit Page</Button>
                      </Link>
                      <Button
                        className="my-2 mx-1"
                        onClick={() => addProductToCarousel(product.id)}
                      >
                        Toggle Carousel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="pagination justify-center mt-5 flex gap-11">
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="py-2 px-6 shadow-xl rounded-lg">
              {currentPage} / {currentProducts.length}
            </span>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentProducts.length < itemsPerPage}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </>
  );
}
