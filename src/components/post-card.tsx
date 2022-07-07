import Link from "next/link";
import { format, parseISO } from "date-fns";

import Tag from "./tag";

import { BrandColor } from "consts/brand-colors";

const PostCard: React.FunctionComponent<Props> = ({
  slug,
  title,
  date,
  summary,
  tags,
}) => {
  return (
    <div className="group mx-auto max-w-3xl rounded-sm p-4 duration-300 hover:bg-base-content/5">
      <div className="flex items-center justify-between border-b border-base-content/30 pb-1">
        <div className="flex items-center gap-x-2 text-sm text-base-content/70">
          <dl className="flex gap-x-1">
            <dt className="">Posted on</dt>
            <time dateTime={date} className="block whitespace-nowrap">
              {format(parseISO(date), "yyyy/ L/ d")}
            </time>
          </dl>
        </div>
        <ol className="flex gap-x-3">
          {tags?.map((item) => (
            <li key={item}>
              <Tag text={item} brand={item as BrandColor} />
            </li>
          ))}
        </ol>
      </div>

      <Link href={`/posts/${slug}`}>
        <a className="block">
          <h3 className="mt-3 text-xl font-semibold text-base-content sm:text-2xl">
            {title}
          </h3>
          <p
            className="mt-3 text-sm text-base-content/70 sm:text-base"
            style={{ fontFeatureSettings: '"palt"' }}
          >
            {summary}
          </p>
          <div className="mt-3 flex items-center justify-between pb-1">
            <div className="flex items-end gap-x-1 duration-300 lg:group-hover:translate-x-1">
              <span className="font-semibold text-accent transition-colors duration-300 lg:text-base-content lg:group-hover:text-accent">
                Read more
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <polyline
                  id="chevronLeft1"
                  points="7 7 12 12 7 17"
                  className="-translate-x-[6px] text-accent opacity-0 transition-all duration-500 lg:text-base-content lg:group-hover:translate-x-0 lg:group-hover:text-accent lg:group-hover:opacity-100"
                ></polyline>
                <polyline
                  id="chevronLeft2"
                  points="7 7 12 12 7 17"
                  className="text-accent transition-all duration-500 lg:text-base-content lg:group-hover:translate-x-[6px] lg:group-hover:text-accent"
                ></polyline>
                <polyline
                  id="chevronRight1"
                  points="13 7 18 12 13 17"
                  className="text-accent transition-all duration-500 lg:text-base-content lg:group-hover:translate-x-4 lg:group-hover:opacity-0"
                ></polyline>
              </svg>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default PostCard;

/* Types */

export type Props = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
};
