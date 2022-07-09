import { useState, useRef } from "react";
import Link from "next/link";
import Image, { type ImageProps as NextImageProps } from "next/image";
import clsx from "clsx";
import CopyToClipboard from "./button/copy-to-clipboard";
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
        <div className="absolute inset-0 flex items-center justify-center bg-slate-700">
          <svg
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
          >
            <mask
              id="mask_scale"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="44"
              height="44"
            >
              {Array(6)
                .fill(1)
                .map((_, i) => (
                  <rect
                    key={`bar-${i}`}
                    id="bar"
                    x={i * 8}
                    width="4"
                    height="44"
                    rx="0"
                    ry="0"
                    fill="#D9D9D9"
                    className="origin-center scale-y-[0.1] animate-scaleY"
                    style={
                      {
                        "--delay": i * 0.1 + "s",
                      } as React.CSSProperties
                    }
                  />
                ))}
            </mask>
            <g mask="url(#mask_scale)">
              <rect width="44" height="44" fill="url(#gradient)" />
            </g>
            <defs>
              <linearGradient
                id="gradient"
                x1="0"
                y1="24"
                x2="44"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3582F5" />
                <stop offset="0.5" stopColor="#22C6EA" />
                <stop offset="1" stopColor="#65F1BF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
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
  Image: (props: NextImageProps & { hasLoader?: boolean }) => (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg">
      <RenderSmoothImage {...props} />
    </div>
  ),
};

export default MDXComponents;
