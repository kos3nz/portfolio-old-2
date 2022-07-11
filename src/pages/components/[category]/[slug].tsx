import { type GetStaticPaths, type NextPage } from "next";

import Layout from "layouts/basic-layout";
import SideNav from "layouts/side-nav";
import Preview from "components/preview";
import {
  getAllComponentPaths,
  getAllComponentRoutes,
  getComponentSources,
} from "utils/components";
import allTemplates from "templates";

const Component: NextPage<NextPageProps> = ({
  category,
  slug,
  routes,
  sources,
}) => {
  const templates = allTemplates[category][slug];

  if (!templates) throw Error("Could not find the components");

  return (
    <Layout noFooter>
      <div className="relative">
        <SideNav.ComponentsNav categories={routes} />
        <div className="py-10 px-6 lg:ml-64 lg:px-10">
          <h1 className="mb-8 text-3xl font-bold capitalize">{slug}</h1>
          <div className="space-y-12">
            {templates.map((template) => {
              const source = sources[template.fileName];

              return (
                <Preview
                  key={template.fileName}
                  component={template}
                  code={source.mdx}
                  source={source.raw}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Component;

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = getAllComponentPaths();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { category, slug },
}: ComponentParams) => {
  const routes = getAllComponentRoutes();

  const p1 = performance.now();

  const sources = await getComponentSources(category, slug);

  const p2 = performance.now();

  console.log("takes: " + (p2 - p1) + "ms");

  return {
    props: {
      category,
      slug,
      routes,
      sources,
    },
  };
};

/* Types */
type NextPageProps = Awaited<ReturnType<typeof getStaticProps>>["props"];

type ComponentParams = {
  params: {
    category: string;
    slug: string;
  };
};
