import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ShoppingCart from "./shoppingCart";
import { useState, useEffect } from "react";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const adminArray = ["Ve5FklK9WqOgn1ZXn3ZRaWIfJ3m2"];
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Колела",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
export default function Navbar({
  onUserChange,
}: {
  onUserChange: (user: User | null) => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [logo, setLogo] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { theme, setTheme } = useTheme();

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
        setLogo("https://i.ibb.co/wJ5PVXg/image-removebg-preview-3.png");
      }
    } else if (theme === "light") {
      setLogo("https://i.ibb.co/CbVSvTp/image.png");
    } else if (theme === "dark") {
      setLogo("https://i.ibb.co/wJ5PVXg/image-removebg-preview-3.png");
    }
  }, [theme]);

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
      <div className="flex">
        <NavigationMenu className="flex  mx-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Колела</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components that you can copy and
                          paste into your apps. Accessible. Customizable. Open
                          Source.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Компоненти</NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <div className="w-[1000px] flex">
                  <div className="">
                    <p
                      className={`p-4 hover:bg-orange-900 ${
                        category == "Скоростни системи"
                          ? "bg-orange-900 text-white"
                          : "bg-white text-black"
                      } hover:text-white duration-200 flex relative pr-16 transition-all`}
                      onMouseEnter={() => setCategory("Скоростни системи")}
                    >
                      Скоростни системи
                      <svg
                        data-testid="geist-icon"
                        fill="none"
                        height="24"
                        shape-rendering="geometricPrecision"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                        className="absolute right-4 text-red-500"
                      >
                        <path d="M13 17l5-5-5-5" />
                        <path d="M6 17l5-5-5-5" />
                      </svg>
                    </p>

                    <p
                      className={`p-4 hover:bg-orange-900 ${
                        category == "Седалки и колчета"
                          ? "bg-orange-900 text-white"
                          : "bg-white text-black"
                      } hover:text-white duration-200 flex relative pr-16 transition-all`}
                      onMouseEnter={() => setCategory("Седалки и колчета")}
                    >
                      Седалки и колчета
                      <svg
                        data-testid="geist-icon"
                        fill="none"
                        height="24"
                        shape-rendering="geometricPrecision"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                        className="absolute right-4 text-red-500"
                      >
                        <path d="M13 17l5-5-5-5" />
                        <path d="M6 17l5-5-5-5" />
                      </svg>
                    </p>
                    <p
                      className={`p-4 hover:bg-orange-900 ${
                        category == "Курбели и педали"
                          ? "bg-orange-900 text-white"
                          : "bg-white text-black"
                      } hover:text-white duration-200 flex relative pr-16 transition-all`}
                      onMouseEnter={() => setCategory("Курбели и педали")}
                    >
                      Курбели и педали
                      <svg
                        data-testid="geist-icon"
                        fill="none"
                        height="24"
                        shape-rendering="geometricPrecision"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                        className="absolute right-4 text-red-500"
                      >
                        <path d="M13 17l5-5-5-5" />
                        <path d="M6 17l5-5-5-5" />
                      </svg>
                    </p>
                    <p
                      className={`p-4 hover:bg-orange-900 ${
                        category == "Кормила, лапи, грипове"
                          ? "bg-orange-900 text-white"
                          : "bg-white text-black"
                      } hover:text-white duration-200 flex relative pr-16 transition-all`}
                      onMouseEnter={() => setCategory("Кормила, лапи, грипове")}
                    >
                      Кормила, лапи, грипове
                      <svg
                        data-testid="geist-icon"
                        fill="none"
                        height="24"
                        shape-rendering="geometricPrecision"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                        className="absolute right-4 text-red-500"
                      >
                        <path d="M13 17l5-5-5-5" />
                        <path d="M6 17l5-5-5-5" />
                      </svg>
                    </p>
                    <p
                      className={`p-4 hover:bg-orange-900 ${
                        category == "Спирачни системи"
                          ? "bg-orange-900 text-white"
                          : "bg-white text-black"
                      } hover:text-white duration-200 flex relative pr-16 transition-all`}
                      onMouseEnter={() => setCategory("Спирачни системи")}
                    >
                      Спирачни системи
                      <svg
                        data-testid="geist-icon"
                        fill="none"
                        height="24"
                        shape-rendering="geometricPrecision"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                        className="absolute right-4 text-red-500"
                      >
                        <path d="M13 17l5-5-5-5" />
                        <path d="M6 17l5-5-5-5" />
                      </svg>
                    </p>
                    <p
                      className={`p-4 hover:bg-orange-900 ${
                        category == "Рамки, окачване"
                          ? "bg-orange-900 text-white"
                          : "bg-white text-black"
                      } hover:text-white duration-200 flex relative pr-16 transition-all`}
                      onMouseEnter={() => setCategory("Рамки, окачване")}
                    >
                      Рамки, окачване
                      <svg
                        data-testid="geist-icon"
                        fill="none"
                        height="24"
                        shape-rendering="geometricPrecision"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                        className="absolute right-4 text-red-500"
                      >
                        <path d="M13 17l5-5-5-5" />
                        <path d="M6 17l5-5-5-5" />
                      </svg>
                    </p>
                  </div>

                  <div className="mx-5 p-5 text-xl ">
                    {category === "Скоростни системи" ? (
                      <>
                        <p className="my-2">Задни Дерайльори</p>
                        <Separator />
                        <p className="my-2">Предни Декланшори</p>
                        <Separator />
                        <p className="my-2">Задни Венци</p>
                        <Separator />
                        <p className="my-2">Вериги</p>
                        <Separator />
                        <p className="my-2">Команди</p>
                        <Separator />
                        <p className="my-2">Groupsets / групи компоненти</p>
                        <Separator />
                        <p className="my-2">Single Speed / Единична скорост</p>
                      </>
                    ) : category === "Седалки и колчета" ? (
                      <>
                        <p className="my-2">Седалки</p>
                        <Separator />
                        <p className="my-2">Колчета</p>
                        <Separator />
                        <p className="my-2">Скоби</p>
                        <Separator />
                        <p className="my-2">Дропър колчета</p>
                      </>
                    ) : category === "Курбели и педали" ? (
                      <>
                        <p className="my-2">Педали</p>
                        <Separator />
                        <p className="my-2">Курбели</p>
                        <Separator />
                        <p className="my-2">Средни движения</p>
                        <Separator />
                        <p className="my-2">Водачи</p>
                        <Separator />
                        <p className="my-2">Плочи</p>
                      </>
                    ) : category === "Кормила, лапи, грипове" ? (
                      <>
                        <p className="my-2">Кормила</p>
                        <Separator />
                        <p className="my-2">Лапи</p>
                        <Separator />
                        <p className="my-2">Грипове</p>
                      </>
                    ) : category === "Спирачни системи" ? (
                      <>
                        <p className="my-2">Хидравлични спирачки</p>
                        <Separator />
                        <p className="my-2">Ротори</p>
                        <Separator />
                        <p className="my-2">Накладки за дискови спирачки</p>
                        <Separator />
                        <p className="my-2">Преходници</p>
                        <Separator />
                        <p className="my-2">Механични дискови спирачки</p>
                        <Separator />
                        <p className="my-2">
                          Лостчета за спирачки - хидравлични и Механични
                        </p>
                      </>
                    ) : (
                      category === "Рамки, окачване" && <></>
                    )}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
