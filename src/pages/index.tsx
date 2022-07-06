import Layout from "layouts/basic-layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <div>
        <div className="flex h-[1000px] flex-col items-center justify-center space-y-6">
          <h1 className="text-center text-4xl">
            NextJS with
            <span className="px-1 text-cyan-400"> TailwindCSS </span> and
            <span className="px-1 text-blue-400"> Typescript </span>
            !!
          </h1>
        </div>

        <div className="flex h-[1000px] flex-col items-center justify-center space-y-6">
          <h1 className="text-center text-4xl">
            NextJS with
            <span className="px-1 text-cyan-400"> TailwindCSS </span> and
            <span className="px-1 text-blue-400"> Typescript </span>
            !!
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
