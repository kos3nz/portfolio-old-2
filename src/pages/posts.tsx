import { type NextPage } from "next";

import PostCard from "components/cards/post-card";
import Layout from "layouts/basic-layout";

import posts from "manifest/posts.json";

const Posts: NextPage<NextPageProps> = ({}) => {
  return (
    <Layout title="Posts">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 pl-4 text-4xl font-semibold text-base-content">
          All Posts
        </h1>

        <div className="space-y-4">
          {posts.map(
            ({
              slug,
              frontMatter: { title, created, updated, summary, tags },
            }) => (
              <PostCard
                key={slug}
                slug={slug}
                title={title}
                created={created}
                updated={updated}
                summary={summary}
                tags={tags}
              />
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Posts;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

/* Types */
type NextPageProps = Awaited<ReturnType<typeof getStaticProps>>["props"];
