import React, { useState, useEffect } from "react";
import { db } from "@/firebase/firebase";
import { getDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { Button } from "../ui/button";
import Image from "next/image";
export const CarouselAdmin = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [carouselImages, setCarouselImages] = useState<
    { id: string; url: string }[]
  >([]);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleAddImageUrl = async () => {
    if (imageUrl.trim() !== "") {
      const carouselRef = doc(db, "carousel/mainCarousel");

      const documentSnapshot = await getDoc(carouselRef);
      const data = documentSnapshot.data();

      if (data && data.urls) {
        const updatedUrls = [
          ...data.urls,
          { id: Date.now().toString(), url: imageUrl },
        ];

        await updateDoc(doc(db, "carousel/mainCarousel"), {
          urls: updatedUrls,
        });

        fetchCarouselImages();
      } else {
        await setDoc(doc(db, "carousel/mainCarousel"), {
          urls: [{ id: Date.now().toString(), url: imageUrl }],
        });
        fetchCarouselImages();
      }

      setImageUrl("");
    }
  };

  const fetchCarouselImages = async () => {
    const carouselDoc = doc(db, "carousel/mainCarousel");

    const documentSnapshot = await getDoc(carouselDoc);
    const data = documentSnapshot.data();

    if (data && data.urls) {
      setCarouselImages(data.urls);
    }
  };

  const handleRemoveImage = async (imageId: string) => {
    const carouselRef = doc(db, "carousel/mainCarousel");

    const documentSnapshot = await getDoc(carouselRef);
    const data = documentSnapshot.data();

    if (data && data.urls) {
      const updatedUrls = data.urls.filter(
        (image: { id: string }) => image.id !== imageId
      );

      await updateDoc(doc(db, "carousel/mainCarousel"), { urls: updatedUrls });
      fetchCarouselImages();
    }
  };

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  return (
    <div className="p-4 shadow-xl rounded-xl mt-5">
      <h2 className="text-6xl font-semibold mb-8">Add Carousel Images</h2>
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={handleImageUrlChange}
        className="w-full p-2 rounded border mb-4"
      />
      <button
        onClick={handleAddImageUrl}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Image URL
      </button>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Current Images</h2>
      <ul className="flex gap-4">
        {carouselImages.map((image, index) => (
          <li key={index}>
            <Image
              src={image.url}
              alt="Carousel"
              width={1000}
              height={1000}
              className="w-36 h-36 m-2"
            />
            <Button
              onClick={() => handleRemoveImage(image.id)}
              className=" w-full  rounded"
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
