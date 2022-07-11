import { useState } from "react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

const Image: React.FunctionComponent<
  NextImageProps & {
    Loader?: JSX.Element;
  }
> = ({
  src,
  alt,
  layout = "responsive",
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
    <div className="relative w-full">
      <div className="absolute inset-0 flex items-center justify-center bg-base-content/20">
        {!loaded && Loader}
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
        height={height}
        width={width}
        {...props}
      />
    </div>
  );
};

export default Image;
