/** Dependencies
 * "next": "12.2.2",
 * "clsx": "^1.1.1",
 * "@heroicons/react": "^1.0.6",
 */

import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import {
  CogIcon,
  LockClosedIcon,
  TicketIcon,
  UserIcon,
} from "@heroicons/react/outline";

const Sidebar: React.FunctionComponent<{
  categories: {
    title: string;
    routes: {
      name: string;
      path: string;
      icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
    }[];
  }[];
}> = (
  {
    // categories
  }
) => {
  const { asPath } = useRouter();

  return (
    <div className="sticky top-0 left-0 h-full w-64 overflow-y-auto border-r bg-slate-100 px-6 py-12 dark:border-slate-700 dark:bg-slate-800 lg:block">
      <nav>
        {categories.map((category) => (
          <div
            key={category.title}
            className="mb-4 divide-y divide-slate-300 last-of-type:mb-0 dark:divide-slate-600"
          >
            <h5 className="pb-1 font-bold capitalize text-slate-600 dark:text-slate-300">
              {category.title}
            </h5>
            <ul className="space-y-2 pt-3">
              {category.routes.map((route) => {
                const Icon = route.icon;

                return (
                  <li key={route.name} className="pl-1">
                    <Link href={route.path}>
                      <a
                        className={clsx(
                          "flex items-center gap-x-2 rounded-lg py-2 px-2 text-sm capitalize duration-200",
                          route.path === asPath
                            ? "text-blue-500"
                            : "text-slate-700 hover:bg-slate-700/10 dark:text-slate-400 dark:hover:bg-slate-300/10 dark:hover:text-slate-200"
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
        icon: UserIcon,
        active: true,
      },
      {
        name: "Privacy",
        path: "#",
        icon: LockClosedIcon,
      },
    ],
  },
  {
    title: "Dashboard",
    routes: [
      {
        name: "Tickets",
        path: "#",
        icon: TicketIcon,
      },
      {
        name: "Settings",
        path: "#",
        icon: CogIcon,
      },
    ],
  },
];
