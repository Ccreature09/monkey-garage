import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function NavbarCatMobile() {
  return (
    <div className="my-5">
      <Sheet>
        <SheetTrigger className="flex items-center justify-center w-full p-2 bg-gray-800 text-white rounded-lg">
          <svg
            data-testid="geist-icon"
            height="16"
            stroke-linejoin="round"
            viewBox="0 0 16 16"
            width="16"
            className="mr-2"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.75 4H1V5.5H1.75H14.25H15V4H14.25H1.75ZM1.75 10.5H1V12H1.75H14.25H15V10.5H14.25H1.75Z"
              fill="currentColor"
            ></path>
          </svg>
          <p>Menu</p>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="text-left bg-white p-4 shadow-lg overflow-y-auto max-h-full"
        >
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold mb-4">Menu</SheetTitle>
          </SheetHeader>
          <SheetDescription className="space-y-5">
            {/* Колела */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg bg-orange-800 text-white font-medium py-2 px-4 rounded transition-colors">
                Колела
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul className="text-white">
                  <li className="py-2">Introduction</li>
                  <li className="py-2">Installation</li>
                  <li className="py-2">Typography</li>
                  <li className="py-2">shadcn/ui</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Компоненти */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg bg-orange-800 text-white font-medium py-2 px-4 rounded transition-colors">
                Компоненти
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul className="text-white">
                  <li className="py-2">Скоростни системи</li>
                  <li className="py-2">Задни Дерайльори</li>
                  <li className="py-2">Предни Декланшори</li>
                  <li className="py-2">Задни Венци</li>
                  <li className="py-2">Вериги</li>
                  <li className="py-2">Команди</li>
                  <li className="py-2">Groupsets / групи компоненти</li>
                  <li className="py-2">Single Speed / Единична скорост</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Седалки и колчета */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg bg-orange-800 text-white font-medium py-2 px-4 rounded transition-colors">
                Седалки и колчета
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul className="text-white">
                  <li className="py-2">Седалки</li>
                  <li className="py-2">Колчета</li>
                  <li className="py-2">Скоби</li>
                  <li className="py-2">Дропър колчета</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Курбели и педали */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg bg-orange-800 text-white font-medium py-2 px-4 rounded transition-colors">
                Курбели и педали
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul className="text-white">
                  <li className="py-2">Педали</li>
                  <li className="py-2">Курбели</li>
                  <li className="py-2">Средни движения</li>
                  <li className="py-2">Водачи</li>
                  <li className="py-2">Плочи</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Кормила, лапи, грипове */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-md bg-orange-800 text-white font-medium  py-2 px-4 rounded transition-colors">
                Кормила, лапи, грипове
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul className="text-white">
                  <li className="py-2">Кормила</li>
                  <li className="py-2">Лапи</li>
                  <li className="py-2">Грипове</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Спирачни системи */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg bg-orange-800 text-white font-medium py-2 px-4 rounded transition-colors">
                Спирачни системи
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul className="text-white">
                  <li className="py-2">Хидравлични спирачки</li>
                  <li className="py-2">Ротори</li>
                  <li className="py-2">Накладки за дискови спирачки</li>
                  <li className="py-2">Преходници</li>
                  <li className="py-2">Механични дискови спирачки</li>
                  <li className="py-2">
                    Лостчета за спирачки - хидравлични и Механични
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Рамки, окачване */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg bg-orange-800 text-white font-medium py-2 px-4 rounded transition-colors">
                Рамки, окачване
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul className="text-white">
                  <li className="py-2">Рамки</li>
                  <li className="py-2">Вилки</li>
                  <li className="py-2">Шокове</li>
                  <li className="py-2">Уши</li>
                  <li className="py-2">Резервни части</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Капли / Гуми */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg bg-orange-800 text-white font-medium py-2 px-4 rounded transition-colors">
                Капли / Гуми
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul className="text-white">
                  <Collapsible>
                    <CollapsibleTrigger className="cursor-pointer text-left text-white">
                      Капли
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4">
                      <ul className="text-white">
                        <li className="py-2">26</li>
                        <li className="py-2">27.5</li>
                        <li className="py-2">28</li>
                        <li className="py-2">29</li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                  <Collapsible>
                    <CollapsibleTrigger className="cursor-pointer text-left text-white">
                      Гуми
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4">
                      <ul className="text-white">
                        <li className="py-2">26</li>
                        <li className="py-2">27.5</li>
                        <li className="py-2">28</li>
                        <li className="py-2">29</li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Облекло */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg bg-orange-800 text-white font-medium py-2 px-4 rounded transition-colors">
                Облекло
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul className="text-white">
                  <li className="py-2">Протектори</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Аксесоари */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg bg-orange-800 text-white font-medium py-2 px-4 rounded transition-colors">
                Аксесоари
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul className="text-white"></ul>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg bg-orange-800 text-white font-medium py-2 px-4 rounded transition-colors">
                Сервиз
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul className="text-white"></ul>
              </CollapsibleContent>
            </Collapsible>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
}
