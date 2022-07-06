import type { GetStaticPaths, NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import { format, parseISO } from "date-fns";

import Layout from "layouts/basic-layout";
import SideNav from "layouts/side-nav";
import Tag from "components/tag";
import { useHeadingRouteUpdates } from "hooks/useHeadingRoute";
import { createMDXSource } from "utils/markdown";
import { BrandColor } from "consts/brand-colors";

import posts from "manifest/posts.json";

const Post: NextPage<NextPageProps> = ({
  source,
  frontMatter,
  tableOfContents,
  hashes,
}) => {
  const { title, date, tags } = frontMatter;

  useHeadingRouteUpdates(hashes);

  return (
    <Layout title={title}>
      <div className="px-4 xs:px-6 lg:flex lg:justify-center lg:gap-x-8">
        <article>
          <div className="prose mx-auto max-w-2xl text-base-content/90 prose-headings:text-base-content prose-a:text-accent prose-blockquote:text-base-content/70">
            {/* Title */}
            <div className="not-prose mb-8 space-y-3">
              <div className="space-y-2 text-sm text-base-content/70">
                <p>
                  Posted on
                  <time dateTime={date} className="ml-1">
                    {format(parseISO(date), "yyyy /L /d")}
                  </time>
                </p>

                <ol className="flex gap-x-3 lg:hidden">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <Tag text={tag} brand={tag as BrandColor} />
                    </li>
                  ))}
                </ol>
              </div>

              <h1 className="text-2xl font-bold text-base-content sm:text-3xl">
                {title}
              </h1>
            </div>

            {/* Content */}
            <MDXRemote {...source} />
          </div>
        </article>

        <SideNav.SecondaryNav tableOfContents={tableOfContents} tags={tags} />
      </div>
    </Layout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.values(posts).map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { slug },
}: GetStaticPropsParams) => {
  const content = posts[slug];

  const mdxSource = await createMDXSource(content.source, content.frontMatter);

  return {
    props: {
      ...content,
      source: mdxSource,
    },
  };
};

/* Types */
type NextPageProps = Awaited<ReturnType<typeof getStaticProps>>["props"];

type GetStaticPropsParams = {
  params: {
    slug: keyof typeof posts;
  };
};
