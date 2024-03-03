import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Rating } from "react-simple-star-rating";
import {
  arrayRemove,
  doc,
  updateDoc,
  getDoc,
  Timestamp,
  FieldValue,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Button } from "../ui/button";
import { Review } from "@/interfaces";

interface ReviewListProps {
  currentUser: { uid?: string; isAdmin?: boolean };
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ currentUser, productId }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>();
  useEffect(() => {
    if (productId) {
      const unsubscribe = onSnapshot(
        doc(db, "products", productId),
        (doc) => {
          const productData = doc.data();
          if (productData && productData.reviews) {
            setReviews(productData.reviews);
          }
        },
        (error) => {
          console.error("Failed to subscribe to reviews:", error);
        }
      );

      // Unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    }
  }, [productId]);
  const deleteReview = async (review: Review, productId: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const productDocRef = doc(db, "products", productId);

      const productDocSnap = await getDoc(productDocRef);
      if (!productDocSnap.exists()) {
        console.error("Product document does not exist!");
        return;
      }

      const productData = productDocSnap.data();
      const currentReviews = productData.reviews || [];

      const reviewToRemove = currentReviews.find((r: Review) => {
        return (
          isTimestamp(r.timestamp) &&
          isTimestamp(review.timestamp) &&
          r.timestamp.seconds === review.timestamp.seconds &&
          r.timestamp.nanoseconds === review.timestamp.nanoseconds
        );
      });

      if (!reviewToRemove) {
        console.error("Review not found!");
        return;
      }

      await updateDoc(productDocRef, {
        reviews: arrayRemove(reviewToRemove),
      });

      console.log("Review deleted successfully");

      if (review.productImageURL) {
        const imageRef = ref(getStorage(), review.productImageURL);
        await deleteObject(imageRef);
        console.log("Review image deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete review: ", error);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setActiveImage(imageUrl);
  };
  function isTimestamp(value: FieldValue | Timestamp): value is Timestamp {
    return (value as Timestamp).toDate !== undefined;
  }
  const closeOverlay = () => {
    setActiveImage(null);
  };
  return (
    <div className="p-4 rounded shadow-xl max-w-full overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 p-5 shadow-xl">
        Ревюта от клиенти
      </h2>

      {reviews?.map((review, index) => (
        <div key={index} className="mb-4 flex flex-row sm:flex-row">
          <div className="w-12 h-12">
            <Image
              src={review.photoURL}
              alt={`${review.username}'s Photo`}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex-grow ml-4">
            <p className="text-lg font-semibold">{review.username}</p>
            <p className="text-lg font-semibold">
              {review.timestamp && isTimestamp(review.timestamp) ? (
                <span>{review.timestamp.toDate().toLocaleDateString()}</span>
              ) : (
                <span>Loading date...</span>
              )}
            </p>
            <div>
              <Rating
                readonly
                size={30}
                initialValue={review.stars}
                transition
                allowFraction
                SVGstyle={{ display: "inline" }}
                fillColor="yellow"
                emptyColor="gray"
                className=" flex my-5"
              />

              {currentUser.isAdmin != undefined && currentUser.isAdmin ? (
                <Button
                  className="mx-10"
                  onClick={() => deleteReview(review, productId)}
                >
                  Delete Review
                </Button>
              ) : (
                currentUser.uid == review.userUID && (
                  <Button
                    className="mx-10"
                    onClick={() => deleteReview(review, productId)}
                  >
                    Delete Review
                  </Button>
                )
              )}
            </div>
            <p className="font-light">{review.text}</p>

            {review.productImageURL && (
              <div
                className="w-1/4 cursor-pointer"
                onClick={() => handleImageClick(review.productImageURL)}
              >
                <Image
                  src={review.productImageURL}
                  alt="Product Image"
                  width={100}
                  height={100}
                  layout="responsive"
                  className="rounded mt-2 mx-2"
                />
              </div>
            )}
          </div>
        </div>
      ))}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80"
          onClick={closeOverlay}
        >
          <div className="relative w-5/6 h-5/6 max-w-3xl max-h-3xl p-4">
            <Image
              src={activeImage}
              alt="Enlarged product image"
              layout="fill"
              objectFit="contain"
              className="rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
