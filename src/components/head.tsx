import NextHead from "next/head";

const Head: React.FunctionComponent<{
  title: string;
  description?: string;
  children?: React.ReactNode;
}> = ({ title, description, children }) => {
  return (
    <NextHead>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
      {description && <meta name="description" content={description} />}
      <title key="title">{title}</title>

      {children}
    </NextHead>
  );
};

export default Head;
