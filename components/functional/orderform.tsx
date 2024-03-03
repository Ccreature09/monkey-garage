import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getAuth, User, onAuthStateChanged } from "firebase/auth";
import { app, db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  surname: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  address: z.string(),
  email: z.string().email({
    message: "Invalid email format.",
  }),
});

interface OrderFormProps {
  onOrderSubmit: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onOrderSubmit }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      phoneNumber: "",
      address: "",
      email: "",
    },
  });
  useEffect(() => {
    if (user) {
      form.setValue("email", user.email || "");
    }
  }, [user]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const orderId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const orderData = {
      orderId: orderId,
      uid: "",
      items: [],
      totalPrice: 0,
      name: values.name,
      surname: values.surname,
      phoneNumber: values.phoneNumber,
      address: values.address,
      email: values.email,
      orderStatus: "Active",
    };

    if (user && user.uid) {
      const draftOrdersRef = collection(db, "draftOrders");
      const querySnapshot = await getDocs(
        query(draftOrdersRef, where("uid", "==", user.uid))
      );

      if (!querySnapshot.empty) {
        const draftOrderDoc = querySnapshot.docs[0];
        const draftOrderData = draftOrderDoc.data();

        orderData.uid = draftOrderData.uid;
        orderData.items = draftOrderData.items;
        orderData.totalPrice = draftOrderData.totalPrice;

        try {
          const docRef = doc(collection(db, "orders"));
          await setDoc(docRef, orderData);
          await deleteDoc(doc(draftOrdersRef, draftOrderDoc.id));
          onOrderSubmit();

          form.reset();
        } catch (error) {
          console.error("Error adding order to Firestore:", error);
        }
      }
    }
  }

  return (
    <>
      {user && user.email ? (
        <Form {...form}>
          <p className="text-3xl font-bold mb-8">Данни за поръчката</p>
          <p className="text-xl font-bold mb-8">Наложен Платеж</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-row gap-3 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Име</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Георги"
                        {...field}
                        className="w-full p-2 rounded border"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Георгиев"
                        {...field}
                        className="w-full p-2 rounded border"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефонен номер</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0123456789"
                      {...field}
                      className="w-full p-2 rounded border"
                    />
                  </FormControl>
                  <FormDescription>Номерът да започва с 0</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес - Еконт или Домашен Адрес</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St, City"
                      {...field}
                      className="w-full p-2 rounded border"
                    />
                  </FormControl>
                  <FormDescription>
                    Град, Община, Улица, Блок, Етаж, Апартамент
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имейл</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"johndoe@example.com"}
                      {...field}
                      className="w-full p-2 rounded border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Поръчай
            </Button>
          </form>
        </Form>
      ) : (
        <Skeleton className="w-[1650px] h-[600px]" />
      )}
    </>
  );
};

export default OrderForm;
