import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ShoppingCart from "./shoppingCart";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import UserForm from "./signIn";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app, db } from "@/firebase/firebase";
import { Skeleton } from "../ui/skeleton";
import { Product } from "@/interfaces";
import NavbarCatMobile from "./navbarcatmobile";
import NavbarCatDesktop from "./navbarcatdesktop";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const adminArray = ["Ve5FklK9WqOgn1ZXn3ZRaWIfJ3m2"];

export default function Navbar({
  onUserChange,
}: {
  onUserChange: (user: User | null) => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [logo, setLogo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { theme, setTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        onUserChange(user);

        setProfileImageUrl(user.photoURL);
      } else {
        setUser(null);
        setProfileImageUrl(null);
      }
    });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onUserChange(null);
      setUser(null);

      setProfileImageUrl(null);
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  const handleSearch = async () => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("queryName", ">=", lowercaseQuery));

    let productsData: Product[] = [];

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const product = doc.data() as Product;

        if (product.queryName.includes(lowercaseQuery)) {
          productsData.push(product);
        }
      });

      setSearchResults(productsData.slice(0, 3));
    } catch (error) {
      console.error("Error searching for products: ", error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      if (systemTheme === "light") {
        setLogo("https://i.ibb.co/CbVSvTp/image.png");
      } else {
        setLogo("https://i.ibb.co/CbVSvTp/image.png");
      }
    } else if (theme === "light") {
      setLogo("https://i.ibb.co/CbVSvTp/image.png");
    } else if (theme === "dark") {
      setLogo("https://i.ibb.co/CbVSvTp/image.png");
    }
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="p-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center sm:w-full md:w-52 justify-center mb-4 md:mb-0">
          {logo ? (
            <Link className="md:ml-8" href={"/"}>
              <Image
                src={logo}
                alt="Logo"
                width={1000}
                height={1000}
                className="mt-4 w-full md:w-auto"
              />
            </Link>
          ) : (
            <Skeleton className="h-[80px] w-[150px]"></Skeleton>
          )}
        </div>

        <div className="flex w-full text-center mx-10">
          {/* <Input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full my-auto mx-5 "
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          /> */}
          {searchResults.length > 0 && searchQuery.length > 2 && (
            <div className="absolute z-10 mt-16 w-4/5 mx-10 md:w-2/3 max-h-40 overflow-y-auto bg-secondary  rounded-lg shadow-lg">
              {searchResults.map((product) => (
                <Link
                  href={`/products/${encodeURIComponent(product.name)}`}
                  key={product.id}
                >
                  <div
                    key={product.name}
                    className="p-2 hover-bg-gray-100 flex items-center"
                  >
                    <Image
                      src={product.mainImage}
                      alt={""}
                      width={80}
                      height={80}
                      className="p-2 mr-2"
                    ></Image>
                    <span className="text-center lg:text-4xl">
                      {product.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {isMobile ? (
        <div className="flex justify-between mx-5">
          <div className="flex">
            <NavbarCatMobile />
          </div>
          <div className="flex">
            <Dialog>
              <DialogTrigger>
                <svg
                  data-testid="geist-icon"
                  height="16"
                  stroke-linejoin="round"
                  viewBox="0 0 16 16"
                  width="16"
                  className="flex my-auto mx-5"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </DialogTrigger>
              <DialogContent className="w-[95%]">
                <DialogHeader>
                  <DialogTitle>Search</DialogTitle>
                  <DialogDescription>
                    <Input
                      type="text"
                      placeholder="Search..."
                      className="w-3/4 rounded-full my-auto mx-auto mt-4 "
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                      }}
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Popover>
              <PopoverTrigger className="">
                {!user ? (
                  <svg
                    data-testid="geist-icon"
                    height="16"
                    stroke-linejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.75 0C5.95507 0 4.5 1.45507 4.5 3.25V3.75C4.5 5.54493 5.95507 7 7.75 7H8.25C10.0449 7 11.5 5.54493 11.5 3.75V3.25C11.5 1.45507 10.0449 0 8.25 0H7.75ZM6 3.25C6 2.2835 6.7835 1.5 7.75 1.5H8.25C9.2165 1.5 10 2.2835 10 3.25V3.75C10 4.7165 9.2165 5.5 8.25 5.5H7.75C6.7835 5.5 6 4.7165 6 3.75V3.25ZM2.5 14.5V13.1709C3.31958 11.5377 4.99308 10.5 6.82945 10.5H9.17055C11.0069 10.5 12.6804 11.5377 13.5 13.1709V14.5H2.5ZM6.82945 9C4.35483 9 2.10604 10.4388 1.06903 12.6857L1 12.8353V13V15.25V16H1.75H14.25H15V15.25V13V12.8353L14.931 12.6857C13.894 10.4388 11.6452 9 9.17055 9H6.82945Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                ) : user && profileImageUrl ? (
                  profileImageUrl && (
                    <div className=" flex flex-col justify-center">
                      <Image
                        src={profileImageUrl}
                        alt="User Profile"
                        width={40}
                        height={40}
                        className=" rounded-full mx-auto"
                      />
                      {adminArray.includes(user.uid) && <Badge>Admin</Badge>}
                    </div>
                  )
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </PopoverTrigger>
              <PopoverContent>
                {user && adminArray.includes(user.uid) && (
                  <Link href={"/admin"}>
                    <Button className="w-full">Admin Dashboard</Button>
                  </Link>
                )}
                {!user ? (
                  <>
                    <h1 className=" text-center mb-8 font-bold text-2xl">
                      Вход / Регистрация
                    </h1>
                    <Button
                      className="w-full mb-5"
                      onClick={handleGoogleSignIn}
                    >
                      Вход с Google
                    </Button>
                    <UserForm login />
                    <Separator className="mb-5" />
                    <UserForm login={false} />
                  </>
                ) : (
                  <Button className="w-full mt-4" onClick={handleSignOut}>
                    Изход
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger className="mt-5 " asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setTheme("light");
                        setLogo("https://i.ibb.co/b1xshG3/image.png");
                      }}
                    >
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setTheme("dark");
                        setLogo(
                          "https://i.ibb.co/HT0ys4c/image-removebg-preview-2.png"
                        );
                      }}
                    >
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </PopoverContent>
            </Popover>

            <div className="flex gap-5 mr-3">
              {user && <ShoppingCart uid={user?.uid} />}
            </div>
          </div>
        </div>
      ) : (
        <NavbarCatDesktop />
      )}
    </>
  );
}
