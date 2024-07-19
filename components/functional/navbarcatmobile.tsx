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
          <SheetDescription>
            {/* Колела */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                Колела
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul>
                  <li className="py-2 text-gray-600">Introduction</li>
                  <li className="py-2 text-gray-600">Installation</li>
                  <li className="py-2 text-gray-600">Typography</li>
                  <li className="py-2 text-gray-600">shadcn/ui</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Компоненти */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                Компоненти
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul>
                  <li className="py-2 text-gray-600">Скоростни системи</li>
                  <li className="py-2 text-gray-600">Задни Дерайльори</li>
                  <li className="py-2 text-gray-600">Предни Декланшори</li>
                  <li className="py-2 text-gray-600">Задни Венци</li>
                  <li className="py-2 text-gray-600">Вериги</li>
                  <li className="py-2 text-gray-600">Команди</li>
                  <li className="py-2 text-gray-600">
                    Groupsets / групи компоненти
                  </li>
                  <li className="py-2 text-gray-600">
                    Single Speed / Единична скорост
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Седалки и колчета */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                Седалки и колчета
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul>
                  <li className="py-2 text-gray-600">Седалки</li>
                  <li className="py-2 text-gray-600">Колчета</li>
                  <li className="py-2 text-gray-600">Скоби</li>
                  <li className="py-2 text-gray-600">Дропър колчета</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Курбели и педали */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                Курбели и педали
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul>
                  <li className="py-2 text-gray-600">Педали</li>
                  <li className="py-2 text-gray-600">Курбели</li>
                  <li className="py-2 text-gray-600">Средни движения</li>
                  <li className="py-2 text-gray-600">Водачи</li>
                  <li className="py-2 text-gray-600">Плочи</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Кормила, лапи, грипове */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-left text-lg font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                Кормила, лапи, грипове
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul>
                  <li className="py-2 text-gray-600">Кормила</li>
                  <li className="py-2 text-gray-600">Лапи</li>
                  <li className="py-2 text-gray-600">Грипове</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Спирачни системи */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                Спирачни системи
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul>
                  <li className="py-2 text-gray-600">Хидравлични спирачки</li>
                  <li className="py-2 text-gray-600">Ротори</li>
                  <li className="py-2 text-gray-600">
                    Накладки за дискови спирачки
                  </li>
                  <li className="py-2 text-gray-600">Преходници</li>
                  <li className="py-2 text-gray-600">
                    Механични дискови спирачки
                  </li>
                  <li className="py-2 text-gray-600">
                    Лостчета за спирачки - хидравлични и Механични
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Рамки, окачване */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                Рамки, окачване
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul>
                  <li className="py-2 text-gray-600">Рамки</li>
                  <li className="py-2 text-gray-600">Вилки</li>
                  <li className="py-2 text-gray-600">Шокове</li>
                  <li className="py-2 text-gray-600">Уши</li>
                  <li className="py-2 text-gray-600">Резервни части</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Капли / Гуми */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                Капли / Гуми
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul>
                  <Collapsible>
                    <CollapsibleTrigger className="cursor-pointer text-left text-gray-800">
                      Капли
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4">
                      <ul>
                        <li className="py-2 text-gray-600">26</li>
                        <li className="py-2 text-gray-600">27.5</li>
                        <li className="py-2 text-gray-600">28</li>
                        <li className="py-2 text-gray-600">29</li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                  <Collapsible>
                    <CollapsibleTrigger className="cursor-pointer text-left text-gray-800">
                      Гуми
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-4">
                      <ul>
                        <li className="py-2 text-gray-600">26</li>
                        <li className="py-2 text-gray-600">27.5</li>
                        <li className="py-2 text-gray-600">28</li>
                        <li className="py-2 text-gray-600">29</li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Облекло */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                Облекло
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul>
                  <li className="py-2 text-gray-600">Протектори</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* Аксесоари */}
            <Collapsible>
              <CollapsibleTrigger className="cursor-pointer text-lg font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors">
                Аксесоари
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4">
                <ul>
                  <li className="py-2 text-gray-600">Сервиз</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
}
