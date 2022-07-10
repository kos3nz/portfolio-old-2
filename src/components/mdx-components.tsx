import { type ImageProps as NextImageProps } from "next/image";
import Link from "next/link";

import MDXImage from "components/image";
import Loader from "components/loader";
import CopyToClipboard from "components/buttons/copy-to-clipboard";
import { useCopyToClipboard } from "hooks/useCopyToClipboard";

const CustomLink: React.FunctionComponent<
  React.ComponentPropsWithoutRef<"a">
> = (props) => {
  const href = props.href;
  const isScrollLink = href && href.startsWith("#");
  const isInternalLink = href && href.startsWith("/");

  if (isScrollLink) {
    return <a {...props}>{props.children}</a>;
  }

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const CodeBlockWithCopyToClipboard: React.FunctionComponent<
  React.ComponentPropsWithoutRef<"pre">
> = (props) => {
  const { ref, copied, onCopy } = useCopyToClipboard();

  return (
    <div className="group relative">
      <div className="absolute top-3 right-3 flex flex-col items-center opacity-0 duration-300 focus:opacity-100 group-hover:opacity-100">
        <CopyToClipboard
          copied={copied}
          onCopy={onCopy}
          className="relative rounded-lg bg-slate-700 p-2 text-slate-400 duration-200 hover:bg-slate-700/50 hover:text-slate-200 focus:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <pre ref={ref} {...props}>
        {props.children}
      </pre>
    </div>
  );
};

const MDXComponents = {
  a: CustomLink,
  pre: CodeBlockWithCopyToClipboard,
  Image: (props: NextImageProps) => (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg">
      <MDXImage Loader={Loader} {...props} />
    </div>
  ),
};

export default MDXComponents;
