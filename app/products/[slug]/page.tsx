"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  Timestamp,
  FieldValue,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Navbar from "@/components/functional/navbar";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { User } from "firebase/auth";
import { Separator } from "@/components/ui/separator";
import ReviewForm from "@/components/functional/reviewform";
import ReviewList from "@/components/functional/reviewlist";
import { useToast } from "@/components/ui/use-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Review, Item, Order } from "@/interfaces";
interface Product {
  name: string;
  price: string;
  description: string;
  mainImage: string;
  sideImages: string[];
  ringSizes?: string[];
  tags: string[];
  reviews: Review[];
}

const adminArray = [
  "eL6AuP9nFScThkWoPtLHqs1ARJf2",
  "clBlWmEPsnYNtS9Lc1qIDzIS21A3",
  "2t0fEEWk5yO3sA1FMAM8rEDeQWo2",
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [slug, setSlug] = useState(params.slug);
  const [showRingImage, setShowRingImage] = useState(false);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>();
  const [userReviewExists, setUserReviewExists] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [productId, setProductId] = useState<string>();
  const [selectedRingSize, setSelectedRingSize] = useState<string>();

  const { toast } = useToast();

  useEffect(() => {
    if (user && reviews) {
      adminArray.includes(user?.uid) && setIsAdmin(true);
      const reviewSubmitted = reviews.some(
        (review) => review.userUID === (user.uid || "Anonymous")
      );
      setUserReviewExists(reviewSubmitted);
    }
  }, [user, reviews]);
  useEffect(() => {
    const fetchProductData = async () => {
      if (slug) {
        const productName = decodeURIComponent(slug);
        const q = query(
          collection(db, "products"),
          where("name", "==", productName)
        );

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const productDoc = querySnapshot.docs[0];
            setProductId(productDoc.id);

            const productData = productDoc.data() as Product;
            if (
              productData.tags.includes("Пръстен") &&
              productData.ringSizes &&
              productData.ringSizes.length > 0
            ) {
              setSelectedRingSize(productData.ringSizes[0]);
            }
            const reviewsWithId = productData.reviews
              ? productData.reviews.map((review, index) => ({
                  ...review,
                  id: productDoc.id + "_review" + index,
                }))
              : [];

            setProduct({ ...productData, reviews: reviewsWithId });
            setMainImage(productData.mainImage);
            setReviews(reviewsWithId);
          } else {
            console.error("Product not found");
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    };

    fetchProductData();
  }, [slug]);
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

      return () => unsubscribe();
    }
  }, [productId]);
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
  const handleAddToCart = () => {
    if (user && product) {
      const userDraftOrdersRef = collection(db, "draftOrders");
      const q = query(userDraftOrdersRef, where("uid", "==", user.uid));

      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // Existing draft order is found
            const existingOrderDoc = querySnapshot.docs[0];
            const existingOrderData = existingOrderDoc.data() as Order;

            // Check if the product is a ring and the selectedRingSize is set
            const isRing = product.tags.includes("Пръстен") && selectedRingSize;

            // Find index based on name and size
            const itemIndex = existingOrderData.items.findIndex(
              (item) =>
                item.name === product.name &&
                (!isRing || item.size === selectedRingSize)
            );

            if (itemIndex === -1) {
              // Item with specific size not found, add new item
              existingOrderData.items.push({
                name: product.name,
                quantity: 1,
                price: parseFloat(product.price),
                ...(isRing && { size: selectedRingSize }),
              });
            } else {
              existingOrderData.items[itemIndex].quantity += 1;
            }

            // Calculate total price
            let totalPrice = existingOrderData.items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );

            // Update the draft order
            updateDoc(existingOrderDoc.ref, {
              items: existingOrderData.items,
              totalPrice: totalPrice,
            })
              .then(() => {
                console.log("Draft order updated with new item.");
              })
              .catch((error) => {
                console.error("Error updating draft order: ", error);
              });
          } else {
            const isRing = product.tags.includes("Пръстен") && selectedRingSize;

            const orderData = {
              uid: user.uid,
              items: [
                {
                  name: product.name,
                  quantity: 1,
                  price: parseFloat(product.price),
                  ...(isRing && { size: selectedRingSize }),
                },
              ],
              totalPrice: parseFloat(product.price),
            };

            // Add a new draft order
            addDoc(userDraftOrdersRef, orderData)
              .then(() => {
                console.log("New draft order created.");
              })
              .catch((error) => {
                console.error("Error creating new draft order: ", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching existing draft orders: ", error);
        });
    }
  };

  if (!product) {
    return <></>;
  }

  const handleImageClick = (image: string | undefined) => {
    setMainImage(image);
  };

  const handleAddReview = async (review: Review) => {
    if (userReviewExists) {
      toast({
        title: "Review already submitted",
        description: "You have already submitted a review for this product.",
        className: "dark:text-black dark:bg-white text-white bg-black",
      });
      return;
    }
    if (product) {
      const productName = decodeURIComponent(slug as string);
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("name", "==", productName));

      try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docs = querySnapshot.docs[0];
          const productDocRef = doc(db, "products", docs.id);

          const newReview = {
            username: review.username,
            userUID: review.userUID,
            text: review.text,
            photoURL: user?.photoURL || "",
            stars: review.stars,
            productImageURL: review.productImageURL,
            timestamp: review.timestamp,
          };

          await updateDoc(productDocRef, {
            reviews: arrayUnion(newReview),
          });
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error adding the review: ", error);
      }
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Navbar onUserChange={(user) => setUser(user)} />
      <div className="container p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {/* <div className="flex items-center justify-center mb-10 flex-col-reverse md:flex-row">
            <div className="w-1/4 flex gap-10 justify-center sm:flex-row md:flex-col">
              {product.sideImages &&
                product.sideImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={product.name}
                    className=" h-36 w-36 justify-center mt-10 md:mt-0 lg:mt-0 rounded hover:border-2 border-blue-500"
                    onClick={() => handleImageClick(image)}
                  />
                ))}
            </div>
            <div className="w-3/4">
              {mainImage && (
                <Image
                  src={mainImage}
                  alt={product.name}
                  height={0}
                  width={500}
                  className={`main-image md:p-5 lg:p-10 ${
                    mainImage ? "rounded" : ""
                  }`}
                />
              )}
            </div>
          </div>  */}
          <div className="p-10">
            {product.sideImages.length < 0 ? (
              <Skeleton className="w-[650px] h-[800px]"></Skeleton>
            ) : (
              <Slider {...settings}>
                {product.sideImages.map((image, index) => (
                  <div key={index}>
                    <Image
                      priority
                      src={image}
                      width={650}
                      height={0}
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>

          <div className="relative mx-5">
            <h1 className="md:text-8xl text-7xl break-words font-bold">
              {product.name}
            </h1>
            <Separator className="h-0.5 my-3"></Separator>
            <div className="mt-2  flex">
              <ul className="inline-flex flex-wrap max-w-full">
                {" "}
                {/* Modified className */}
                {product.tags &&
                  product.tags.map((tag, index) => (
                    <li key={index}>
                      <Badge className="mx-1 my-1 h-8">{tag}</Badge>
                    </li>
                  ))}
              </ul>
            </div>

            <p
              dangerouslySetInnerHTML={{
                __html: product.description.replace(/\\n/g, "<br />"),
              }}
              className="text-2xl font-semibold md:text-3xl  mt-24"
            />

            {product.tags.includes("Пръстен") && (
              <>
                <Button
                  onClick={() => setShowRingImage(!showRingImage)}
                  className="w-full mt-4"
                >
                  {showRingImage
                    ? "Скрий размери на пръстени"
                    : "Покажи размери на пръстени"}
                </Button>
                {showRingImage && (
                  <div>
                    <Image
                      src="https://i.ibb.co/cYnCCDN/ringsizes.png"
                      alt="Пръстен"
                      className="w-3/4 mx-auto rounded-lg"
                      width={1000}
                      height={1000}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <p className="text-5xl p-2 my-4 font-semibold text-center border-2">
          {product.price} лв.
        </p>
        {product?.tags.includes("Пръстен") && (
          <div className="flex flex-col items-center my-4">
            <label htmlFor="ringSize" className="text-xl font-semibold my-2">
              Изберете размер
            </label>
            <Select
              value={selectedRingSize}
              onValueChange={(value) => setSelectedRingSize(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Размери" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Размери</SelectLabel>
                  {product?.ringSizes?.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        <Button
          disabled={!user}
          onClick={() => {
            toast({
              title: `Продукт добавен`,
              description: `${product.name} е добавен към количката`,
              className: "dark:text-black dark:bg-white text-white bg-black",
            });
            handleAddToCart();
          }}
          className="w-full h-full text-2xl"
        >
          {user
            ? "Добави към количката"
            : "Регистрирайте се за да добавите към количката!"}
        </Button>
      </div>
      {/* {user && !userReviewExists ? (
        <ReviewForm
          onAddReview={handleAddReview}
          userName={user?.displayName || "Anonymous"}
          userUID={user?.uid}
        />
      ) : (
        <p className="text-2xl w-full h-full font-bold mt-3 text-center">
          {userReviewExists
            ? "Вече сте написали ревю за този продукт!"
            : "Регистрирайте се за да добавите ревю!"}
        </p>
      )}
      {productId && (
        <ReviewList
          currentUser={{ uid: user?.uid, isAdmin: isAdmin }}
          productId={productId}
        />
      )} */}
      <Footer />
    </>
  );
}
