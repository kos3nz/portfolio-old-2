import { type NextPage } from "next";
import { compareDesc } from "date-fns";

import PostCard from "components/post-card";
import Layout from "layouts/basic-layout";

import posts from "manifest/posts.json";

const Posts: NextPage<NextPageProps> = ({ posts }) => {
  return (
    <Layout title="Posts">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="mb-12 pl-4 text-4xl font-semibold text-base-content">
          All Posts
        </h1>

        <div className="space-y-12">
          {posts.map(({ slug, title, date, summary, tags }) => (
            <PostCard
              key={slug}
              slug={slug}
              title={title}
              date={date}
              summary={summary}
              tags={tags}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Posts;

export const getStaticProps = async () => {
  return {
    props: {
      posts: Object.values(posts)
        .map(({ slug, frontMatter }) => ({
          ...frontMatter,
          slug: slug,
        }))
        .sort((a, b) => {
          return compareDesc(new Date(a.date), new Date(b.date));
        }),
    },
  };
};

/* Types */
type NextPageProps = Awaited<ReturnType<typeof getStaticProps>>["props"];
