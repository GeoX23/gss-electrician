"use client";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image";
import {
  DisclosureButton,
  DisclosurePanel,
  Disclosure,
} from "@headlessui/react";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    "Αρχική",
    "Υπηρεσίες",
    "Έργα",
    "Αξιολογήσεις",
    "Συχνές ερωτήσεις",
    "Επικοινωνία",
  ];
  const links = [
    "/#home",
    "/#ypiresies",
    "/#erga",
    "/reviews",
    "/#faq",
    "/#contact",
  ];
  // const links = ["#home", "#ypiresies", "#faq", "#contact"];

  return (
    <div className="w-full z-50 text-center flex justify-center sticky top-0  shadow-md">
      <nav className="w-full max-w-[1536px] flex flex-wrap items-center justify-between p-8 pt-4 pb-2 mx-auto lg:justify-between bg-white dark:bg-trueGray-900">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/logo-white.svg"
                        alt="N"
                        width="80"
                        height="80"
                        className="w-[100px] lg:w-[180px]"
                      />
                    </span>
                  </span>
                </Link>

                <div className="flex gap-2 justify-center align-center">
                  <div className="py-1 px-2 lg:hidden">
                    <ThemeChanger />
                  </div>
                  <DisclosureButton
                    id="menuButton"
                    aria-label="Toggle Menu"
                    className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </DisclosureButton>
                </div>

                <DisclosurePanel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href={links[index]}
                        className="w-full px-4 py-2 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                        onClick={() =>
                          document.getElementById("menuButton")!.click()
                        }
                      >
                        {item}
                      </Link>
                    ))}
                    <Link
                      href="tel: +306945335942"
                      className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5"
                    >
                      Καλέστε μας
                    </Link>
                  </>
                </DisclosurePanel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={links[index]}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link
            href="tel: +306945335942"
            className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5"
          >
            Καλέστε μας
          </Link>

          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
};
