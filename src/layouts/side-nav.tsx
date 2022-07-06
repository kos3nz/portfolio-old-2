import clsx from "clsx";
import Tag from "components/tag";
import { BrandColor } from "consts/brand-colors";
import { useActiveHash } from "hooks/useHeadingRoute";
import { useMounted } from "hooks/useMounted";

const SecondaryNav: React.FunctionComponent<{
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
  SecondaryNav,
};

export default SideNav;
