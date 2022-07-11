import type { NextPage } from "next";

import Layout from "layouts/basic-layout";
import SnippetCard from "components/cards/snippet-card";

const Snippets: NextPage<NextPageProps> = ({}) => {
  return (
    <Layout title="Snippets">
      <div className="mx-auto max-w-6xl py-12">
        <h1 className="mb-10 text-center text-4xl font-bold text-base-content">
          Snippets
        </h1>

        <div className="grid grid-cols-1 place-items-center gap-8 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {demoSnippets.map((snippet) => (
            <SnippetCard key={snippet.title} snippet={snippet} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Snippets;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

/* Types */
type NextPageProps = Awaited<ReturnType<typeof getStaticProps>>["props"];

const demoSnippets = [
  {
    title: "Firebase",
    summary: "Connect to Firestore.",
    imgUrl: "/assets/firebase.png",
    path: "#",
  },
  {
    title: "Stripe",
    summary: "Use Webhook.",
    imgUrl: "/assets/stripe.png",
    path: "#",
  },
  {
    title: "Supabase",
    summary: "Implement Authorization using RLS.",
    imgUrl: "/assets/supabase.png",
    path: "#",
  },
];
