import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { db } from "@/firebase/firebase";
import Link from "next/link";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { Item, Order, ProductInfo } from "@/interfaces";

interface ShoppingCartProps {
  uid: string | undefined;
}

export default function ShoppingCart({ uid }: ShoppingCartProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [productInfo, setProductInfo] = useState<ProductInfo[]>([]);

  useEffect(() => {
    if (uid) {
      const ordersRef = collection(db, "draftOrders");
      const q = query(ordersRef, where("uid", "==", uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
          const newOrder = {
            uid: uid,
            items: [],
            totalPrice: 0, // Initialize totalPrice
          };
          addDoc(ordersRef, newOrder).catch((error) => {
            console.error("Error creating order: ", error);
          });
        } else {
          // Get the existing draft order
          const orderData = querySnapshot.docs[0].data() as Order;
          setOrder({
            ...orderData,
            id: querySnapshot.docs[0].id,
          });

          // Fetch product info and set totalPrice
          fetchProductInfo(orderData.items);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [uid]);

  const fetchProductInfo = async (items: Item[]) => {
    const productsRef = collection(db, "products");
    const productInfoArray: ProductInfo[] = [];

    for (const item of items) {
      const productQuery = query(productsRef, where("name", "==", item.name));
      const productQuerySnapshot = await getDocs(productQuery);

      if (!productQuerySnapshot.empty) {
        const productData = productQuerySnapshot.docs[0].data() as {
          name: string;
          mainImage: string;
          price: number;
        };
        productInfoArray.push({
          name: productData.name,
          mainImage: productData.mainImage,
          price: productData.price,
          quantity: item.quantity,
          size: item.size, // Include size if present
        });
      }
    }

    setProductInfo(productInfoArray);
  };

  const updateQuantityInFirestore = async (
    index: number,
    increment: boolean
  ) => {
    if (order && order.items[index]) {
      const updatedOrder = { ...order };
      if (increment) {
        updatedOrder.items[index].quantity += 1;
      } else if (updatedOrder.items[index].quantity > 1) {
        updatedOrder.items[index].quantity -= 1;
      } else {
        updatedOrder.items.splice(index, 1);
      }

      // Calculate the total price by iterating through items
      let totalPrice = 0;
      for (const item of updatedOrder.items) {
        const product = productInfo.find((p) => p.name === item.name);
        if (product) {
          totalPrice += product.price * item.quantity;
        }
      }

      updatedOrder.totalPrice = totalPrice;

      const orderDocRef = doc(db, "draftOrders", updatedOrder.id);
      await updateDoc(orderDocRef, {
        items: updatedOrder.items,
        totalPrice: totalPrice,
      }).catch((error) => {
        console.error("Error updating order in Firestore: ", error);
      });
    }
  };

  const totalPrice = productInfo.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </SheetTrigger>
      <SheetContent className="max-h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-4xl font-black">Количка</SheetTitle>
        </SheetHeader>
        <Separator className="mt-5" />

        {order && productInfo && (
          <ul>
            {productInfo.map((product, index) => (
              <li className="flex mt-5" key={index}>
                <div>
                  <Image
                    src={product.mainImage}
                    alt=""
                    width={120}
                    height={0}
                  />
                </div>

                <div className="ml-3">
                  <p className="text-3xl font-black">{product.name}</p>
                  <p className="text-2xl flex flex-row">
                    {product.price * product.quantity} лв.
                    <br />
                    {product.size && "Size: "} {product.size}
                  </p>
                  <div className="flex gap-4 mt-4 ">
                    <Button
                      onClick={() => updateQuantityInFirestore(index, false)}
                    >
                      -
                    </Button>
                    <p className="text-2xl"> {product.quantity}</p>
                    <Button
                      onClick={() => updateQuantityInFirestore(index, true)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="text-3xl font-semibold text-center mt-5">
          {productInfo.length > 0 && <p>Oбща сума: {totalPrice} лв.</p>}
        </div>
        <div className="mx-auto flex mt-10">
          {productInfo.length > 0 && (
            <Link className=" mx-auto w-full flex" href={"/order"}>
              <Button className="w-full">Поръчай</Button>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
