import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-center text-4xl">
        NextJS with
        <span className="px-1 text-cyan-400"> TailwindCSS </span> and
        <span className="px-1 text-blue-400"> Typescript </span>
        !!
      </h1>
    </div>
  );
};

export default Home;
