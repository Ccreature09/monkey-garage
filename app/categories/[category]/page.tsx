"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/functional/navbar";
import { User } from "firebase/auth";
import Footer from "@/components/ui/footer";
import { ProductGrid } from "@/components/functional/productgrid";
export default function Page({ params }: { params: { category: string } }) {
  const [slug, setSlug] = useState(decodeURIComponent(params.category));
  const [category, setCategory] = useState<string>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (slug) {
      switch (slug) {
        case "rings":
          setCategory("Пръстен");
          break;
        case "necklaces":
          setCategory("Огърлица");
          break;
        case "bracelets":
          setCategory("Гривна");
          break;
        default:
          break;
      }
    }
  }, [slug]);
  return (
    <>
      <Navbar onUserChange={(user) => setUser(user)} />
      <div className="mx-12 mb-12">
        {category && <ProductGrid category={category}></ProductGrid>}
      </div>
      <Footer></Footer>
    </>
  );
}
