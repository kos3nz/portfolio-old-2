import Head from "components/head";
import { Header } from "./header";

const Layout: React.FunctionComponent<{
  title?: string;
  description?: string;
  children: React.ReactNode;
  noFooter?: boolean;
}> = ({
  title,
  description = "Personal Dev Note",
  children,
  noFooter = false,
}) => {
  title = title ? title + " | KM" : "Portfolio | KM";

  return (
    <>
      <Head title={title} description={description}></Head>

      <Header />

      <main className="relative mx-auto w-full max-w-7xl pt-[88px] pb-16">
        {children}
      </main>

      {!noFooter && (
        <footer className="mt-6 max-w-7xl border-t border-base-content/20 py-4 text-base-content">
          <div className="mx-auto max-w-5xl text-center">Footer</div>
        </footer>
      )}
    </>
  );
};

export default Layout;
