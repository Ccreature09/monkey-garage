import React, { useEffect, useState } from "react";

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
  DocumentData,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Order } from "@/interfaces";

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = collection(db, "orders");
      try {
        const unsubscribe = onSnapshot(ordersRef, (querySnapshot) => {
          const ordersData: Order[] = [];
          querySnapshot.forEach((doc) => {
            const order = doc.data() as DocumentData;
            ordersData.push({
              uid: doc.id,
              ...order,
            } as Order);
          });

          setOrders(ordersData);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const activeOrders = orders
    .filter((order) => order.orderStatus === "Active")
    .slice(indexOfFirstItem, indexOfLastItem);

  const markOrderAsCompleted = async (orderId: string) => {
    try {
      const ordersRef = collection(db, "orders");
      const querySnapshot = await getDocs(
        query(ordersRef, where("orderId", "==", orderId))
      );

      if (!querySnapshot.empty) {
        const orderDoc = querySnapshot.docs[0];
        const orderData = orderDoc.data();

        if (orderData.orderStatus === "Active") {
          const updatedOrderData = { ...orderData, orderStatus: "Completed" };

          await updateDoc(orderDoc.ref, updatedOrderData);
        }
      }
    } catch (error) {
      console.error("Error marking order as completed: ", error);
    }
  };

  return (
    <>
      <Table className="shadow-xl">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead className="text-center">Items</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeOrders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell>{order.name + " " + order.surname}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>{order.phoneNumber}</TableCell>
              <TableCell>
                {order.items &&
                  order.items.map((value, key) => (
                    <div key={key}>
                      <p className="text-center">
                        {value.quantity} * {value.name}{" "}
                        {value.size && " - Размер "} {value.size}
                      </p>
                    </div>
                  ))}
              </TableCell>
              <TableCell>{order.totalPrice} лв.</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>
                <Button
                  onClick={() => markOrderAsCompleted(order.orderId)}
                  disabled={order.orderStatus === "Completed"}
                >
                  Mark as Completed
                </Button>
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
        <span className="py-2 px-6 shadow-xl rounded-lg">{currentPage}</span>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={activeOrders.length < itemsPerPage}
        >
          Next
        </Button>
      </div>
    </>
  );
}
