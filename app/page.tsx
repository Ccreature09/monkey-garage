"use client";

import Navbar from "@/components/functional/navbar";
import Footer from "@/components/ui/footer";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import {
  MainCarousel,
  ProductsCarousel,
} from "@/components/functional/carousel";
import Image from "next/image";

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
      <div className="mx-4 mb-12 space-y-2">
        <img
          src={
            "https://www.bike-discount.de/media/image/69/3d/60/bikesale2024_1500x500_02_en.jpg"
          }
          alt=""
        ></img>
        <img
          src={
            "https://www.bike-discount.de/media/image/69/3d/60/bikesale2024_1500x500_02_en.jpg"
          }
          alt=""
        ></img>
        <img
          src={
            "https://www.bike-discount.de/media/image/69/3d/60/bikesale2024_1500x500_02_en.jpg"
          }
          alt=""
        ></img>
        <img
          src={
            "https://www.bike-discount.de/media/image/69/3d/60/bikesale2024_1500x500_02_en.jpg"
          }
          alt=""
        ></img>
      </div>

      <ProductsCarousel></ProductsCarousel>
      <Footer />
    </>
  );
}
