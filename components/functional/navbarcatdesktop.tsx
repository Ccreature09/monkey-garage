import React, { useState } from "react";
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
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
export default function NavbarCatDesktop() {
  const [category, setCategory] = useState("");

  return (
    <div className="flex">
      <NavigationMenu className="flex  mx-auto">
        <NavigationMenuList>
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col md:flex-row lg:flex-row w-full">
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
                            Beautifully designed components that you can copy
                            and paste into your apps. Accessible. Customizable.
                            Open Source.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
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
                <NavigationMenuContent>
                  <div className="flex">
                    <div>
                      <p
                        className={`p-4 hover:bg-orange-900 ${
                          category == "Скоростни системи"
                            ? "bg-orange-900 text-white"
                            : "bg-white text-black"
                        } hover:text-white duration-200 flex relative pr-32 transition-all`}
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
                        } hover:text-white duration-200 flex relative pr-32 transition-all`}
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
                        } hover:text-white duration-200 flex relative pr-32 transition-all`}
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
                        } hover:text-white duration-200 flex relative pr-32 transition-all`}
                        onMouseEnter={() =>
                          setCategory("Кормила, лапи, грипове")
                        }
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
                        } hover:text-white duration-200 flex relative pr-32 transition-all`}
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
                        } hover:text-white duration-200 flex relative pr-32 transition-all`}
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
                          <Link
                            href={`/categories/${category}/Задни Дерайльори`}
                          >
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Задни Дерайльори
                            </p>
                          </Link>
                          <Separator />
                          <Link
                            href={`/categories/${category}/Предни Декланшори`}
                          >
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Предни Декланшори
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Задни Венци`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Задни Венци
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Вериги`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Вериги
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Команди`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Команди
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Groupsets`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Groupsets / групи компоненти
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Single Speed`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Single Speed / Единична скорост
                            </p>
                          </Link>
                        </>
                      ) : category === "Седалки и колчета" ? (
                        <>
                          <Link href={`/categories/${category}/Седалки`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Седалки
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Колчета`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Колчета
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Скоби`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Скоби
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Дропър колчета`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Дропър колчета
                            </p>
                          </Link>
                        </>
                      ) : category === "Курбели и педали" ? (
                        <>
                          <Link href={`/categories/${category}/Педали`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Педали
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Курбели`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Курбели
                            </p>
                          </Link>
                          <Separator />
                          <Link
                            href={`/categories/${category}/Средни движения`}
                          >
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Средни движения
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Водачи`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Водачи
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Плочи`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Плочи
                            </p>
                          </Link>
                        </>
                      ) : category === "Кормила, лапи, грипове" ? (
                        <>
                          <Link href={`/categories/${category}/Кормила`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Кормила
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Лапи`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Лапи
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Грипове`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Грипове
                            </p>
                          </Link>
                        </>
                      ) : category === "Спирачни системи" ? (
                        <>
                          <Link
                            href={`/categories/${category}/Хидравлични спирачки`}
                          >
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Хидравлични спирачки
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Ротори`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Ротори
                            </p>
                          </Link>
                          <Separator />
                          <Link
                            href={`/categories/${category}/Накладки за дискови спирачки`}
                          >
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Накладки за дискови спирачки
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/Преходници`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Преходници
                            </p>
                          </Link>
                          <Separator />
                          <Link
                            href={`/categories/${category}/Механични дискови спирачки`}
                          >
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Механични дискови спирачки
                            </p>
                          </Link>
                          <Separator />
                          <Link
                            href={`/categories/${category}/Лостчета за спирачки - хидравлични и Механични`}
                          >
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              Лостчета за спирачки - хидравлични и Механични
                            </p>
                          </Link>
                        </>
                      ) : (
                        category === "Рамки, окачване" && (
                          <>
                            <Link href={`/categories/${category}/Рамки`}>
                              <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                                Рамки
                              </p>
                            </Link>
                            <Separator />
                            <Link href={`/categories/${category}/Вилки`}>
                              <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                                Вилки
                              </p>
                            </Link>
                            <Separator />
                            <Link href={`/categories/${category}/Шокове`}>
                              <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                                Шокове
                              </p>
                            </Link>
                            <Separator />
                            <Link href={`/categories/${category}/Уши`}>
                              <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                                Уши
                              </p>
                            </Link>
                            <Separator />
                            <Link
                              href={`/categories/${category}/Резервни части`}
                            >
                              <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                                Резервни части
                              </p>
                            </Link>
                          </>
                        )
                      )}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Капли / Гуми</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex">
                    <div>
                      <p
                        className={`p-4 hover:bg-orange-900 ${
                          category == "Капли"
                            ? "bg-orange-900 text-white"
                            : "bg-white text-black"
                        } hover:text-white duration-200 flex relative pr-32 transition-all`}
                        onMouseEnter={() => setCategory("Капли")}
                      >
                        Капли
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
                          category == "Гуми"
                            ? "bg-orange-900 text-white"
                            : "bg-white text-black"
                        } hover:text-white duration-200 flex relative pr-32 transition-all`}
                        onMouseEnter={() => setCategory("Гуми")}
                      >
                        Гуми
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
                      {category === "Капли" ? (
                        <>
                          <Link href={`/categories/${category}/26`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              &quot;26&quot;
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/27.5`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              &quot;27.5&quot;
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/28`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              &quot;28&quot;
                            </p>
                          </Link>
                          <Separator />
                          <Link href={`/categories/${category}/29`}>
                            <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                              &quot;29&quot;
                            </p>
                          </Link>
                        </>
                      ) : (
                        category === "Гуми" && (
                          <>
                            <Link href={`/categories/${category}/26`}>
                              <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                                &quot;26&quot;
                              </p>
                            </Link>
                            <Separator />
                            <Link href={`/categories/${category}/27.5`}>
                              <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                                &quot;27.5&quot;
                              </p>
                            </Link>
                            <Separator />
                            <Link href={`/categories/${category}/28`}>
                              <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                                &quot;28&quot;
                              </p>
                            </Link>
                            <Separator />
                            <Link href={`/categories/${category}/29`}>
                              <p className="my-2 hover:bg-red-500 hover:text-white p-3">
                                &quot;29&quot;
                              </p>
                            </Link>
                          </>
                        )
                      )}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row w-full">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Облекло</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Протектори</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Аксесоари</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/service" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Сервиз
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
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
