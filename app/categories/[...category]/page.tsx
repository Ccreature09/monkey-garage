"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/functional/navbar";
import { User } from "firebase/auth";
import Footer from "@/components/ui/footer";
import { ProductGrid } from "@/components/functional/productgrid";

export default function Page({ params }: { params: { category: string[] } }) {
  const [slug, setSlug] = useState(
    params.category.map((item) => decodeURIComponent(item))
  );
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <Navbar onUserChange={(user) => setUser(user)} />
      <div className="mx-12 mb-12"></div>
      <Footer></Footer>
    </>
  );
}
