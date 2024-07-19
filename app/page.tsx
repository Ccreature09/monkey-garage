"use client";

import Navbar from "@/components/functional/navbar";
import Footer from "@/components/ui/footer";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import {
  MainCarousel,
  ProductsCarousel,
} from "@/components/functional/carousel";

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
  return (
    <>
      <Navbar onUserChange={(user) => setUser(user)} />
      <div className="mx-12 mb-12">
        <MainCarousel></MainCarousel>
      </div>

      <ProductsCarousel></ProductsCarousel>
      <Footer />
    </>
  );
}
