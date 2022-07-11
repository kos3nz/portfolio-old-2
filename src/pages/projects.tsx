import type { NextPage } from "next";

import Layout from "layouts/basic-layout";
import ProjectCard from "components/cards/project-card";

const Projects: NextPage<NextPageProps> = ({}) => {
  return (
    <Layout title="Projects">
      <div className="mx-auto max-w-6xl py-12 px-6">
        <h1 className="mb-10 text-center text-4xl font-bold text-base-content">
          Projects
        </h1>

        <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3">
          {demoProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

/* Types */
type NextPageProps = Awaited<ReturnType<typeof getStaticProps>>["props"];

const demoProjects = [
  {
    title: "Remix Social App",
    path: "#",
    imgUrl:
      "https://images.unsplash.com/photo-1648326342761-8a9abfb7a2c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
  },
  {
    title: "Fakeflix Clone",
    path: "#",
    imgUrl:
      "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80",
  },
  {
    title: "Crown Clothing",
    path: "#",
    imgUrl:
      "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
  },
];
