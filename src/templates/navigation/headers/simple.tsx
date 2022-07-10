/** Dependencies
 * "next": "12.1.6",
 * "clsx": "^1.1.1",
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const Header: React.FunctionComponent<{}> = ({}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePath, setActivePath] = useState<ActivePath | "">("");
  const { asPath } = useRouter();

  useEffect(() => {
    if (asPath.includes("/about")) setActivePath("#about");
    else if (asPath.includes("/shop")) setActivePath("#shop");
    else if (asPath.includes("/contact")) setActivePath("#contact");
    else setActivePath("#");
  }, [asPath]);

  return (
    <header
      className="
        sticky top-0 left-0 z-10 flex h-[72px] w-full items-center justify-center
        border-b border-slate-300/70 bg-slate-100 px-6 shadow-sm
        dark:border-slate-700/70 dark:bg-slate-900
        [@supports(backdrop-filter:blur(0))]:bg-slate-100/70
        [@supports(backdrop-filter:blur(0))]:backdrop-blur
        [@supports(backdrop-filter:blur(0))]:dark:bg-slate-900/70
      "
    >
      <div className="relative flex w-full max-w-7xl items-center gap-10">
        <div className="absolute z-10 flex h-full w-full items-center justify-center lg:relative lg:w-auto">
          {/* Logo */}
          <a href="#">
            <span className="font-bold text-slate-700 dark:text-slate-200 ">
              LOGO
            </span>
          </a>
        </div>

        <div className="relative flex-1">
          {/* Navigation */}
          <nav className="hidden lg:block">
            <ol className="flex items-center gap-6">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a
                      className={clsx(
                        "font-regular capitalize duration-200",
                        item.href === activePath
                          ? "text-cyan-600 dark:text-cyan-400"
                          : "text-slate-800 hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-400"
                      )}
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          {/* Drawer */}
          <button
            className="space-y-[4px] lg:hidden"
            onClick={() => {
              setDrawerOpen((state) => !state);
            }}
          >
            <span
              className={clsx(
                "block h-[2px] w-5 rounded-md bg-slate-700 duration-300 dark:bg-slate-200",
                drawerOpen ? "translate-y-1.5 -rotate-[135deg]" : ""
              )}
            />
            <span
              className={clsx(
                "block h-[2px] w-5 rounded-md bg-slate-700 dark:bg-slate-200",
                drawerOpen ? "opacity-0 duration-100" : "duration-500"
              )}
            />
            <span
              className={clsx(
                "block h-[2px] w-5 rounded-md bg-slate-700 duration-300 dark:bg-slate-200",
                drawerOpen ? "-translate-y-1.5 rotate-[135deg]" : ""
              )}
            />
          </button>
        </div>

        <div className="relative flex justify-end">
          {/* CTA section */}
          <div className="flex items-center gap-x-4">
            <button className="rounded-lg p-0.5 text-slate-700 duration-200 hover:ring-2 hover:ring-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-slate-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="10" cy="10" r="7"></circle>
                <line x1="21" y1="21" x2="15" y2="15"></line>
              </svg>
            </button>
            <a
              href="#"
              className="rounded-lg p-0.5 text-slate-700 duration-200 hover:ring-2 hover:ring-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-slate-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-shopping-cart"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="6" cy="19" r="2"></circle>
                <circle cx="17" cy="19" r="2"></circle>
                <path d="M17 17h-11v-14h-2"></path>
                <path d="M6 5l14 1l-1 7h-13"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

/* Types */
export type ActivePath = typeof navigation[number]["href"];

/* /Navigation */
const navigation = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Shop", href: "#shop" },
  { name: "Contact", href: "#contact" },
] as const;
