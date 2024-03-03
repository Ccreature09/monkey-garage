"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/functional/navbar";
import Footer from "@/components/ui/footer";
import ProductList from "@/components/functional/productlist";
import ProductForm from "@/components/functional/productform";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarouselAdmin } from "@/components/functional/carouselAdmin";
import OrdersList from "@/components/functional/orderslist";

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | undefined>(
    undefined
  );
  const adminArray = ["Ve5FklK9WqOgn1ZXn3ZRaWIfJ3m2"];

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && adminArray.includes(user.uid)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar onUserChange={(user) => setUser(user)} />
      {isAdmin && (
        <div className="container mx-auto p-4">
          <Tabs defaultValue="products" className="">
            <TabsList className="w-full mb-5">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="addProduct">Add / Edit Product</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              <ProductList
                onEditProduct={(productId) => setEditingProductId(productId)}
              />
            </TabsContent>
            <TabsContent value="addProduct">
              <ProductForm editingProduct={editingProductId} />
            </TabsContent>
            <TabsContent value="orders">
              <OrdersList />
            </TabsContent>
            <TabsContent value="settings">
              <CarouselAdmin />
            </TabsContent>
          </Tabs>
        </div>
      )}
      <Footer />
    </>
  );
}
