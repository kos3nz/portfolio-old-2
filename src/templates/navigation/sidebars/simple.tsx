/** Dependencies
 * "next": "12.1.6",
 * "clsx": "^1.1.1",
 */

import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

const Sidebar: React.FunctionComponent<{
  categories: {
    title: string;
    routes: {
      name: string;
      path: string;
      icon?: (props: React.ComponentProps<"svg">) => JSX.Element | JSX.Element;
    }[];
  }[];
}> = (
  {
    // categories
  }
) => {
  const { asPath } = useRouter();

  return (
    <div className="sticky top-0 left-0 h-full w-64 overflow-y-auto border-r bg-slate-100 px-6 py-10 dark:border-slate-700 dark:bg-slate-800 lg:block">
      <nav>
        {categories.map((category) => (
          <div
            key={category.title}
            className="mb-4 divide-y divide-slate-300 last-of-type:mb-0 dark:divide-slate-600"
          >
            <h5 className="pb-1 font-bold capitalize text-slate-600 dark:text-slate-300">
              {category.title}
            </h5>
            <ul className="pt-2">
              {category.routes.map((route) => {
                const Icon = route.icon;

                return (
                  <li key={route.name} className="py-1 pl-1 first-of-type:mt-0">
                    <Link href={route.path}>
                      <a
                        className={clsx(
                          "flex items-center gap-x-2 rounded-lg py-1 px-2 text-sm capitalize duration-200",
                          route.path === asPath
                            ? "text-blue-500"
                            : "text-slate-700 hover:bg-slate-700/10 dark:text-slate-400 dark:hover:text-slate-200"
                        )}
                      >
                        {Icon && <Icon className="h-5 w-5" />}

                        <span className="font-semibold">{route.name}</span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

/* Props */
const categories = [
  {
    title: "Account",
    routes: [
      {
        name: "Profile",
        path: "#",
        icon: ({ ...props }) => (
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
            {...props}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="12" cy="12" r="9"></circle>
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
          </svg>
        ),
        active: true,
      },
      {
        name: "Privacy",
        path: "#",
        icon: ({ ...props }) => (
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
            {...props}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <rect x="5" y="11" width="14" height="10" rx="2"></rect>
            <circle cx="12" cy="16" r="1"></circle>
            <path d="M8 11v-4a4 4 0 0 1 8 0v4"></path>
          </svg>
        ),
      },
    ],
  },
  {
    title: "Dashboard",
    routes: [
      {
        name: "Tickets",
        path: "#",
        icon: ({ ...props }) => (
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
            {...props}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="15" y1="5" x2="15" y2="7"></line>
            <line x1="15" y1="11" x2="15" y2="13"></line>
            <line x1="15" y1="17" x2="15" y2="19"></line>
            <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2"></path>
          </svg>
        ),
      },
      {
        name: "Settings",
        path: "#",
        icon: ({ ...props }) => (
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
            {...props}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        ),
      },
    ],
  },
];
