import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Rating } from "react-simple-star-rating";
import { Timestamp } from "firebase/firestore";
import { Input } from "../ui/input";
import { Review } from "@/interfaces";

interface ReviewFormProps {
  onAddReview: (review: Review) => Promise<void>;
  userName: string;
  userUID: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  onAddReview,
  userName,
  userUID,
}) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `review-images/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleAddReview = async () => {
    if (reviewText.trim() !== "") {
      let imageUrl = "";
      if (image) {
        try {
          imageUrl = await uploadImage(image);
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      }

      const newReview = {
        username: userName || "Anonymous",
        userUID: userUID,
        text: reviewText,
        photoURL: imageUrl,
        productImageURL: imageUrl,
        stars: rating,
        timestamp: Timestamp.now(),
      };

      await onAddReview(newReview);
      setReviewText("");
      setRating(0);
      setImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  return (
    <div className="p-4 rounded-lg shadow-lg">
      <div className="flex">
        <h1 className="text-4xl font-bold my-3 mx-6">Ревю</h1>
        <Rating
          onClick={handleRating}
          size={30}
          initialValue={rating}
          transition
          allowFraction
          SVGstyle={{ display: "inline" }}
          fillColor="yellow"
          emptyColor="gray"
          className=" flex my-5"
        />
      </div>

      <Textarea
        className="w-full h-24 p-2 mb-4 border rounded"
        placeholder="Напиши ревю..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <p className="text-2xl my-3 font-semibold">Качете снимки:</p>
      <Input
        ref={fileInputRef} // Attach the ref here
        type="file"
        onChange={handleImageUpload}
        className="mb-4 w-full"
      />

      <Button className="font-bold py-4 px-6 rounded" onClick={handleAddReview}>
        Добави Ревю
      </Button>
    </div>
  );
};

export default ReviewForm;
