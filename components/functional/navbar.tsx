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
          <Popover>
            <PopoverTrigger className="">
              {!user ? (
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
                  <Button className="w-full mb-5" onClick={handleGoogleSignIn}>
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
          <Input
            type="text"
            placeholder="Search..."
            className="w-full rounded-full my-auto mx-5 "
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
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
          <div className="flex gap-5 mr-3">
            {user && <ShoppingCart uid={user?.uid} />}
          </div>
        </div>
      </div>

      {isMobile ? <NavbarCatMobile /> : <NavbarCatDesktop />}
    </>
  );
}
