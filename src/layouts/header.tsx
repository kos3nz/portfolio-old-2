import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { useScrollTop } from "hooks/useScrollTop";
import { useMounted } from "hooks/useMounted";

// Navigation
const navigation = [
  { name: "Home", href: "/" },
  { name: "Posts", href: "/posts" },
  { name: "Projects", href: "/projects" },
  { name: "Components", href: "/components/ui/animation" },
  { name: "Snippets", href: "/snippets" },
] as const;

export const Header: React.FunctionComponent<{}> = ({}) => {
  const { asPath } = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  const mounted = useMounted();

  const [activePath, setActivePath] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [angle, setAngle] = useState(resolvedTheme === "dark" ? 180 : 0);

  const isPositionTop = useScrollTop(10, !asPath.includes("#"));

  useEffect(() => {
    console.log(activePath);

    if (asPath.includes("/posts")) setActivePath("/posts");
    else if (asPath.includes("/projects")) setActivePath("/projects");
    else if (asPath.includes("/components")) setActivePath("/components");
    else if (asPath.includes("/snippets")) setActivePath("/snippets");
    else setActivePath(asPath);
  }, [asPath]);

  return (
    <header
      className={clsx(
        `
        fixed top-0 left-0 z-10 flex w-full justify-center border-b bg-base-100 px-6 transition-all duration-300
        [@supports(backdrop-filter:blur(0))]:bg-base-100/70
        [@supports(backdrop-filter:blur(0))]:backdrop-blur
        `,
        mounted && !isPositionTop && activePath !== "/components"
          ? "h-[72px] border-transparent shadow-gradient"
          : "h-[88px] border-base-content/20"
      )}
    >
      <div className="relative flex w-full max-w-7xl items-center gap-x-12">
        <div className="absolute left-[50%] z-10 w-auto -translate-x-[50%] lg:relative lg:left-0 lg:translate-x-0">
          {/* Logo */}
          <Link href="/">
            <a>
              <svg
                className="h-12 w-12 text-base-content"
                width="1rem"
                height="1rem"
                viewBox="0 0 91 69"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.02233 54V15.5H16.0623V31.065L30.3073 15.5H38.9973L24.8073 30.79L39.3823 54H30.7473L19.7473 36.18L16.0623 40.195V54H9.02233ZM40.903 54V15.5H49.263L61.528 39.92L73.628 15.5H81.988V54H74.948V27.435L64.223 48.5H58.668L47.943 27.435V54H40.903Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="relative flex flex-1 items-center">
          <ol className="hidden items-center gap-x-6 lg:flex">
            {navigation.map((item) => (
              <li key={item.name} className="text-sm font-bold uppercase">
                <Link href={item.href}>
                  <a
                    className={clsx(
                      "duration-200",
                      item.href === activePath
                        ? "text-primary"
                        : "text-base-content hover:opacity-50"
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
          </ol>

          {/* Drawer */}
          <button
            className="-translate-x-2 space-y-[4px] p-2 lg:hidden"
            onClick={() => {
              setDrawerOpen((state) => !state);
            }}
          >
            <span
              className={clsx(
                "block h-[2px] w-5 rounded-md bg-base-content duration-300",
                drawerOpen ? "translate-y-1.5 -rotate-[135deg]" : ""
              )}
            />
            <span
              className={clsx(
                "block h-[2px] w-3.5 rounded-md bg-base-content",
                drawerOpen ? "opacity-0 duration-100" : "duration-700"
              )}
            />
            <span
              className={clsx(
                "block h-[2px] rounded-md bg-base-content duration-300",
                drawerOpen ? "w-5 -translate-y-1.5 rotate-[135deg]" : "w-2"
              )}
            />
          </button>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            className="relative flex h-8 w-8 items-center justify-center overflow-hidden text-base-content duration-200 hover:opacity-50"
            onClick={() => {
              setTheme(resolvedTheme === "light" ? "dark" : "light");
              setAngle((angle) => angle - 180);
            }}
          >
            {mounted && (
              <div
                className="absolute top-1 space-y-5 duration-500"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 rotate-180"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                </svg>
              </div>
            )}
          </button>
          <a
            href="#"
            className="h-6 w-6 text-base-content duration-200 hover:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

// Types
export type NavPaths = typeof navigation[number]["href"];
