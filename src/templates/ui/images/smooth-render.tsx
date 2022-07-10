/* tailwind.config.js
  extend: {
    animation: {
      scaleY: 'scaleY 1.2s ease-in-out infinite var(--delay)',
    },
    keyframes: {
      scaleY: {
        '0%, 60%, 100%': { transform: 'scaleY(0.1)' },
        '30%': { transform: 'scaleY(1)' },
      },
    },
  }
*/

import { useEffect, useRef, useState } from "react";

const RenderSmoothImage: React.FunctionComponent<
  React.ComponentPropsWithoutRef<"img"> & {
    Loader?: React.FunctionComponent<any>;
  }
> = ({
  // src, alt, Loader,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const loadComplete = () => {
    // setTimeout() here is only used for demo purpose, please remove it
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  };

  useEffect(() => {
    if (ref.current?.complete) {
      loadComplete();
    }
  }, [ref.current?.complete]);

  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-lg">
      <div className="absolute inset-0 flex items-center justify-center bg-slate-300 dark:bg-slate-700">
        {!loaded && <Loader />}
      </div>
      <img
        ref={ref}
        src={src}
        alt={alt}
        className="relative aspect-square object-cover duration-500"
        style={{
          opacity: loaded ? 1 : 0,
        }}
        onLoad={loadComplete}
        {...props}
      />
    </div>
  );
};

export default RenderSmoothImage;

/* Props */
const src =
  "https://images.unsplash.com/photo-1648071218468-48852c43e004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80";
const alt = "image";
const Loader = () => (
  <div className="flex items-center gap-1">
    {[
      "bg-teal-400",
      "bg-cyan-400",
      "bg-sky-400",
      "bg-blue-400",
      "bg-indigo-400",
    ].map((item, i) => (
      <span
        key={`bar-${i}`}
        id="bar"
        className={`h-10 w-1 origin-center scale-y-[0.1] animate-scaleY ${item}`}
        style={
          {
            "--delay": i * 0.1 + "s",
          } as React.CSSProperties
        }
      />
    ))}
  </div>
);

/* Note
  - If you are using nextjs, replace with the following code:
  import { useState } from "react";
  import NextImage, { type ImageProps as NextImageProps } from "next/image";

  const Image: React.FunctionComponent<
    NextImageProps & {
      Loader?: React.FunctionComponent<any>;
    }
  > = ({
      src,
      alt,
      layout = 'responsive',
      height = 1,
      width = 1,
      Loader,
      ...props
  }) => {
    const [loaded, setLoaded] = useState(false);

    const loadComplete = () => {
      setLoaded(true);
    };

    return (
      <div className="relative max-w-xs overflow-hidden rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center bg-slate-300 dark:bg-slate-700">
          {Loader && <Loader />}
        </div>
        <NextImage
          src={src}
          alt={alt}
          className="relative object-cover duration-500"
          style={{
            opacity: loaded ? 1 : 0,
          }}
          onLoadingComplete={loadComplete}
          layout={layout}
          height={width}
          width={height}
          {...props}
        />
      </div>
    );
  };

  export default Image;
*/
