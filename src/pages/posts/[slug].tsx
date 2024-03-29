import { useMemo } from "react";
import type { GetStaticPaths, NextPage } from "next";
import { getMDXComponent } from "mdx-bundler/client";
import { format, parseISO } from "date-fns";
import mapKeys from "lodash.mapkeys";

import Layout from "layouts/basic-layout";
import SideNav from "layouts/side-nav";
import Tag from "components/tag";
import MDXComponents from "components/mdx-components";
import { useHeadingRouteUpdates } from "hooks/useHeadingRoute";
import { createMDXSource } from "utils/markdown";
import { BrandColor } from "consts/brand-colors";

import posts from "manifest/posts.json";

const Post: NextPage<NextPageProps> = ({
  code,
  frontMatter,
  tableOfContents,
  hashes,
}) => {
  const { title, created, updated, tags } = frontMatter;
  const MDXComponent = useMemo(() => getMDXComponent(code), [code]);

  useHeadingRouteUpdates(hashes);

  return (
    <Layout title={title}>
      <div className="px-4 py-12 xs:px-6 lg:flex lg:justify-center lg:gap-x-8">
        <article>
          <div className="prose mx-auto max-w-2xl text-base-content/90 prose-headings:text-base-content prose-a:text-accent prose-blockquote:text-base-content/70">
            {/* Title */}
            <div className="not-prose mb-8 space-y-3">
              <div className="space-y-2 text-sm text-base-content/70">
                <ol className="flex gap-x-3 lg:hidden">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <Tag text={tag} brand={tag as BrandColor} />
                    </li>
                  ))}
                </ol>

                <p>
                  Posted on
                  <time dateTime={created} className="ml-1">
                    {format(parseISO(created), "yyyy/ L/ d")}
                  </time>
                </p>
              </div>

              <h1 className="text-[1.685rem] font-bold leading-10 text-base-content md:text-3xl">
                {title}
              </h1>
            </div>

            {/* Content */}
            <MDXComponent components={MDXComponents} />
          </div>
        </article>

        <SideNav.PostNav tableOfContents={tableOfContents} tags={tags} />
      </div>
    </Layout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts.map(({ slug }) => ({
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
  const postMap = mapKeys(posts, (post) => {
    return post.slug;
  });

  const { source, frontMatter, tableOfContents, hashes } = postMap[slug];

  const { code } = await createMDXSource(source);

  return {
    props: {
      code,
      frontMatter,
      tableOfContents,
      hashes,
    },
  };
};

/* Types */
type NextPageProps = Awaited<ReturnType<typeof getStaticProps>>["props"];

type GetStaticPropsParams = {
  params: {
    slug: string;
  };
};
