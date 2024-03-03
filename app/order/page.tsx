"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import Navbar from "@/components/functional/navbar";
import Footer from "@/components/ui/footer";
import OrderForm from "@/components/functional/orderform";
import ShoppingListItems from "@/components/functional/shoppinglistitems";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>();
  const [flag, setFlag] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isCartEmpty != undefined) {
      if (!isCartEmpty) {
        setFlag(true);
      } else {
        if (!flag) {
          router.push("/");
        }
      }
    }
  }, [isCartEmpty, orderCompleted, router]);

  useEffect(() => {});

  const handleCartStatusChange = (cartNotEmpty: boolean) => {
    setIsCartEmpty(!cartNotEmpty);
  };

  const handleOrderSubmit = () => {
    setOrderCompleted(true);
  };

  return (
    <>
      <Navbar onUserChange={(user) => setUser(user)} />
      <div className="mx-20 my-10">
        <div className="shadow-xl p-0 lg:p-10 rounded-lg border-blue-400">
          {orderCompleted ? (
            <div>
              <h1 className="text-3xl lg:text-7xl font-bold text-center mb-12">
                Поръчката е изпълнена!
              </h1>
              <p className="text-center text-xl lg:text-3xl font-semibold">
                Благодарим за поръчката!
              </p>
              <Link href={"/"}>
                <Button className="mx-auto flex mt-10">Начална Страница</Button>
              </Link>
            </div>
          ) : (
            <>
              <div>
                <ShoppingListItems
                  uid={user?.uid}
                  onCartStatusChange={handleCartStatusChange}
                />
              </div>
              <OrderForm onOrderSubmit={handleOrderSubmit} />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
