"use client";
import React from "react";
import { useState } from "react";
import { User } from "firebase/auth";
import Navbar from "@/components/functional/navbar";
import Footer from "@/components/ui/footer";
export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <>
      <Navbar onUserChange={(user) => setUser(user)} />
      <div className="container mx-auto p-4 my-44">
        <h1 className="text-4xl font-bold mb-4">Ценоразпис</h1>
        <p className="text-lg ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
          debitis rerum deserunt voluptatem. Laudantium, rem in velit
          repellendus nihil, ea dolor dolores cum quis iure ex nam, perspiciatis
          est eius.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Нещоо</h2>
        <p className="text-lg ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
          consequatur dolores dolore aperiam dolorum nesciunt? Facere vero
          accusamus consequuntur ducimus velit? Perferendis aspernatur, eligendi
          quasi numquam accusamus unde facilis sapiente.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Друго нещо</h2>
        <p className="text-lg ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
          consequatur dolores dolore aperiam dolorum nesciunt? Facere vero
          accusamus consequuntur ducimus velit? Perferendis aspernatur, eligendi
          quasi numquam accusamus unde facilis sapiente.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Нещо си</h2>
        <p className="text-lg ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
          consequatur dolores dolore aperiam dolorum nesciunt? Facere vero
          accusamus consequuntur ducimus velit? Perferendis aspernatur, eligendi
          quasi numquam accusamus unde facilis sapiente.
        </p>
      </div>

      <Footer></Footer>
    </>
  );
}
