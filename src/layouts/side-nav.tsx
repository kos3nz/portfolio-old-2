import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

import Tag from "components/tag";
import { useActiveHash } from "hooks/useHeadingRoute";
import { useMounted } from "hooks/useMounted";
import { BrandColor } from "consts/brand-colors";
import { ComponentRoutes } from "types/component";

export const ComponentsNav: React.FunctionComponent<{
  categories: ComponentRoutes;
}> = ({ categories }) => {
  const { asPath } = useRouter();

  return (
    <div className="fixed hidden h-full w-64 overflow-y-auto border-r border-base-content/10 bg-base-200/20 px-6 py-10 lg:block">
      <nav>
        {categories.map((category) => (
          <div
            key={category.name}
            className="mb-4 divide-y divide-base-content/40 last-of-type:mb-0"
          >
            <h5 className="pb-2 font-bold capitalize text-base-content">
              {category.name}
            </h5>
            <ul className="pt-2">
              {category.routes.map((slug) => {
                return (
                  <li key={slug.name} className="py-2 pl-3 first-of-type:mt-0">
                    <Link href={slug.path}>
                      <a
                        className={clsx(
                          "flex items-center gap-x-2 text-sm capitalize duration-200",
                          slug.path === asPath
                            ? "text-primary"
                            : "text-base-content/50 hover:text-base-content"
                        )}
                      >
                        <span className="font-semibold">{slug.name}</span>
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

const PostNav: React.FunctionComponent<{
  tableOfContents: { hash: string; level: number; text: string }[];
  tags?: string[];
}> = ({ tableOfContents, tags }) => {
  const activeHash = useActiveHash();
  const mounted = useMounted();

  return (
    <aside className="mt-9 hidden w-60 lg:block">
      <div className="sticky top-28 space-y-6">
        <div className="rounded-sm border border-base-content/20 p-4 text-sm">
          <span className="block font-bold text-base-content">
            Table of Contents
          </span>
          <ol className="mt-4 border-l-2 border-base-content/20 font-semibold">
            {tableOfContents.map((heading) => {
              const { hash, text, level } = heading;

              return (
                <li key={hash} className="relative mt-3 h-5 first-of-type:mt-0">
                  <a
                    href={hash}
                    className={clsx(
                      "block leading-5 duration-300",
                      (level === 1 || level === 2) && "pl-3",
                      level === 3 && "pl-6",
                      level === 4 && "pl-9",
                      mounted && activeHash === hash
                        ? "text-base-content"
                        : "text-base-content/30 hover:text-base-content"
                    )}
                  >
                    {text}
                  </a>
                  <span
                    className="absolute top-0 -left-[2px] h-full w-[2px] origin-center bg-primary duration-300"
                    style={{
                      transform:
                        mounted && activeHash === hash
                          ? "scaleY(1)"
                          : "scaleY(0)",
                    }}
                  />
                </li>
              );
            })}
          </ol>
        </div>
        {tags && (
          <div className="rounded-sm border border-base-content/20 p-4 text-sm">
            <span className="block font-bold text-base-content">Tags</span>
            <ol className="mt-2 flex gap-x-3">
              {tags.map((tag) => (
                <li key={tag}>
                  <Tag text={tag} brand={tag as BrandColor} />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </aside>
  );
};

const SideNav = {
  ComponentsNav,
  PostNav,
};

export default SideNav;
