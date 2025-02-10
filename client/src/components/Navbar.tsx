import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import bookLogo from "../assets/img/logo.jpeg";

// These are the links/buttons that will be displayed in the navbar
const navigation = [
  { name: "Login", href: "/login", current: false },
  { name: "Saved Books", href: "/show-volunteers", current: false },
  { name: "Home", href: "/", current: false },
  { name: "About", href: "/about", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}


const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(auth.loggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  const handleProtectedNavigation = (path: string) => {
    if (!auth.loggedIn()) {
      navigate("/login");
      return;
    }
    navigate(path);
  };

  return (
    <Disclosure as="nav" className="bg-[#4b3d2d]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-[#d9cba0] hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <div className="h-full max-h-24 ...">
                <img
                  alt="Book Shelter"
                  src={bookLogo}
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))} */}
                <Link to="/">
                  <h2>Adopt a new book today!</h2>
                </Link>
                {!loginCheck ? (
                  <button className="btn" type="button">
                    <Link to="/login">Login</Link>
                  </button>
                ) : (
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      auth.logout();
                      setLoginCheck(false);
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                )}

                <button
                  className="btn cursor-pointer"
                  type="button"
                  onClick={() => handleProtectedNavigation("/show-volunteers")}
                >
                  Saved Books
                </button>

                <button
                  className="btn cursor-pointer"
                  type="button"
                  onClick={() => handleProtectedNavigation("/")}
                >
                  Main
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={bookLogo}
                    className="size-2 rounded-s-xs"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  {/* <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Saved Books
                  </a> */}
                                <button
                  className="btn cursor-pointer"
                  type="button"
                  onClick={() => handleProtectedNavigation("/show-volunteers")}
                >
                  Saved Books
                </button>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Find a book!
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Log out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>

      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
