/** Dependencies
 * "clsx": "^1.1.1",
 */

import clsx from "clsx";

const Breadcrumbs: React.FunctionComponent<{ path: string }> = (
  {
    // path
  }
) => {
  const slugs = path.split("/").filter(Boolean);

  const paths = slugs.map((slug, i) => ({
    name: slug,
    url: `/${slugs.slice(0, i + 1).join("/")}`,
  }));

  return (
    <div className="flex items-center overflow-y-auto whitespace-nowrap font-semibold">
      <a
        href="#"
        className="text-slate-700 hover:underline dark:text-slate-200"
      >
        Home
      </a>

      {paths.map((path, i) => (
        <span key={path.name} className="flex items-center">
          <span className="mx-5 text-slate-500 dark:text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          <a
            href="#"
            className={clsx(
              "capitalize",
              i === paths.length - 1
                ? "text-indigo-700 dark:text-indigo-400"
                : "text-slate-700 hover:underline dark:text-slate-200"
            )}
          >
            {path.name}
          </a>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;

/* Props */
const path = "/components/navigation/breadcrumbs";
