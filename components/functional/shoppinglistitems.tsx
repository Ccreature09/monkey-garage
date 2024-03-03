import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { Order, Item, ProductInfo } from "@/interfaces";

interface ShoppingListItemsProps {
  uid: string | undefined;
  onCartStatusChange: (isNotEmpty: boolean) => void;
}

export default function ShoppingListItems({
  uid,
  onCartStatusChange,
}: ShoppingListItemsProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [productInfo, setProductInfo] = useState<ProductInfo[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (uid) {
      const ordersRef = collection(db, "draftOrders");
      const q = query(ordersRef, where("uid", "==", uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
          const newOrder = { uid: uid, items: [], totalPrice: 0 };
          addDoc(ordersRef, newOrder).catch((error) => {
            console.error("Error creating order: ", error);
          });
        } else {
          const orderData = querySnapshot.docs[0].data() as Order;
          setOrder({ ...orderData, id: querySnapshot.docs[0].id });
          onCartStatusChange(orderData.items.length > 0);
          fetchProductInfo(orderData.items);
        }
      });

      return () => unsubscribe();
    }
  }, [uid, onCartStatusChange]);

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
          size: item.size,
        });
      }
    }

    setProductInfo(productInfoArray);
    calculateTotalPrice(productInfoArray);
  };
  const calculateTotalPrice = (items: ProductInfo[]) => {
    const total = items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  return (
    <div>
      <h2 className="text-5xl font-bold mb-4">Количка</h2>
      <Table className="shadow-xl">
        <TableHeader>
          <TableRow>
            <TableHead>Снимка</TableHead>
            <TableHead>Име</TableHead>
            <TableHead>Количество</TableHead>
            <TableHead>Размер</TableHead>
            <TableHead>Цена</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productInfo.length > 0 ? (
            productInfo.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Image
                    src={item.mainImage}
                    width={80}
                    height={50}
                    alt="Image"
                    className="h-auto w-auto"
                    priority
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>
                <Skeleton className="w-[100px] h-[100px]"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="w-[400px] h-[100px]"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="w-[400px] h-[100px]"></Skeleton>
              </TableCell>
              <TableCell>
                <Skeleton className="w-[400px] h-[100px]"></Skeleton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="text-3xl text-center mt-5">
        {productInfo.length > 0 && (
          <p className="font-semibold">Обща сума: {totalPrice} лв.</p>
        )}
      </div>
    </div>
  );
}
