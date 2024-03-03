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
        <h1 className="text-4xl font-bold mb-4">За нас</h1>
        <p className="text-lg ">
          В Teardrop сме страстни за предлагането на висококачествени продукти и
          изключителни услуги на нашите клиенти. Нашето пътуване започна през
          2023, и оттогава ние сме посветени на да подобряваме визията на всички
          хора в България.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Нашият Екип</h2>
        <p className="text-lg ">
          Нашият екип се състои от двама амбициозни младежи, и заедно работим
          хармонично, за да предоставим най-добрите решения на нашите клиенти.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Нашата ангажираност</h2>
        <p className="text-lg ">
          Нашата ангажираност към нашите клиенти е неизменна. Вашето
          удовлетворение е наш приоритет, и винаги сме тук, за да ви помогнем.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Свържете се с нас</h2>
        <p className="text-lg ">
          Ако имате въпроси или искате да научите повече за нашите продукти и
          услуги, не се колебайте да се свържете с нас. Можете да ни намерите на
          teardropjewellery@gmail.com или на телефон 0896588063.
        </p>
      </div>

      <Footer></Footer>
    </>
  );
}
