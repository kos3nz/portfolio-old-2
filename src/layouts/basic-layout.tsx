import Head from "components/head";
import { Header } from "./header";

const Layout: React.FunctionComponent<LayoutProps> = ({
  title,
  description = "Personal Dev Note",
  children,
}) => {
  title = title ? title + " | KM" : "Portfolio | KM";

  return (
    <>
      <Head title={title} description={description}></Head>

      <Header />

      <main className="relative mx-auto w-full max-w-7xl pt-28 pb-16 md:pt-32">
        {children}
      </main>

      <footer className="mt-6 max-w-7xl border-t border-base-content/20 py-4 text-base-content">
        <div className="mx-auto max-w-5xl text-center">Footer</div>
      </footer>
    </>
  );
};

export default Layout;

/* Types */
type LayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};
