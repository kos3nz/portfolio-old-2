import { useState, useRef } from "react";
import Link from "next/link";
import Image, { type ImageProps as NextImageProps } from "next/image";
import clsx from "clsx";

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

export const RenderSmoothImage: React.FunctionComponent<
  NextImageProps & { hasLoader?: boolean }
> = ({
  src,
  alt,
  layout = "responsive",
  height = 1,
  width = 1,
  hasLoader,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full">
      <Image
        src={src}
        alt={alt}
        className={clsx(
          "aspect-square duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoadingComplete={() => {
          setLoaded(true);
        }}
        layout={layout}
        height={height}
        width={width}
        {...props}
      />
      {hasLoader && !loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(1)
              .map((_, i) => (
                <span
                  key={`bar-${i}`}
                  id="bar"
                  className="h-9 w-1.5 origin-center scale-y-[0.1] animate-scaleY bg-primary"
                  style={
                    {
                      "--order": i * 0.1 + "s",
                    } as React.CSSProperties
                  }
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CodeBlockWithCopyToClipboard: React.FunctionComponent<
  React.ComponentPropsWithoutRef<"pre">
> = (props) => {
  const sourceRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    if (sourceRef.current?.textContent) {
      navigator.clipboard.writeText(sourceRef.current.textContent);
    }
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="group relative">
      <div className="absolute top-3 right-3 flex flex-col items-center opacity-0 duration-300 focus:opacity-100 group-hover:opacity-100">
        <button
          className="relative rounded-lg bg-slate-700 p-1.5 text-slate-400 duration-200 hover:bg-slate-700/50 hover:text-slate-200 focus:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Copy to clipboard"
          title="Copy to clipboard"
          onClick={onCopy}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
            <rect x="9" y="3" width="6" height="4" rx="2"></rect>
            <path d="M9 12h6"></path>
            <path d="M9 16h6"></path>
          </svg>

          <span
            className={clsx(
              "absolute -right-3 -top-9 rounded-lg border border-slate-500 bg-slate-700 px-2 py-1 text-xs font-semibold text-slate-300 duration-200",
              copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            )}
          >
            Copied!
          </span>
        </button>
      </div>
      <pre ref={sourceRef} {...props}>
        {props.children}
      </pre>
    </div>
  );
};

const MDXComponents = {
  a: CustomLink,
  pre: CodeBlockWithCopyToClipboard,
  Image: (props: NextImageProps & { hasLoader?: boolean }) => (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg">
      <RenderSmoothImage {...props} />
    </div>
  ),
};

export default MDXComponents;
