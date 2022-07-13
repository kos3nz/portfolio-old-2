import { useEffect, useRef } from "react";

const Playing: React.FunctionComponent<{}> = ({}) => {
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const [bar1, bar2, bar3, bar4, bar5] = barsRef.current;

    if (bar1 && bar2 && bar3 && bar4 && bar5) {
      bar1.animate(
        [
          { transform: "scaleY(0.2)" },
          { transform: "scaleY(0.5)", offset: 0.3 },
          { transform: "scaleY(0.5)", offset: 0.45 },
          { transform: "scaleY(0.9)", offset: 0.7 },
          { transform: "scaleY(0.9)", offset: 0.85 },
          { transform: "scaleY(0.3)" },
        ],
        { duration: 900, iterations: Infinity, easing: "ease-in-out" }
      );

      bar2.animate(
        [
          { transform: "scaleY(0.1)" },
          { transform: "scaleY(0.4)", offset: 0.4 },
          { transform: "scaleY(0.4)", offset: 0.55 },
          { transform: "scaleY(0.7)", offset: 0.7 },
          { transform: "scaleY(0.7)", offset: 0.85 },
          { transform: "scaleY(0.2)" },
        ],
        {
          duration: 850,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: 200,
        }
      );

      bar3.animate(
        [
          { transform: "scaleY(0.1)" },
          { transform: "scaleY(0.6)", offset: 0.3 },
          { transform: "scaleY(0.6)", offset: 0.5 },
          { transform: "scaleY(0.9)", offset: 0.6 },
          { transform: "scaleY(0.9)", offset: 0.75 },
          { transform: "scaleY(0.6)", offset: 0.9 },
          { transform: "scaleY(0.2)" },
        ],
        {
          duration: 950,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: 400,
        }
      );

      bar4.animate(
        [
          { transform: "scaleY(0.2)" },
          { transform: "scaleY(0.5)", offset: 0.3 },
          { transform: "scaleY(0.5)", offset: 0.45 },
          { transform: "scaleY(0.8)", offset: 0.65 },
          { transform: "scaleY(0.8)", offset: 0.8 },
          { transform: "scaleY(0.3))" },
        ],
        {
          duration: 800,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: 200,
        }
      );

      bar5.animate(
        [
          { transform: "scaleY(0.2)" },
          { transform: "scaleY(0.7)", offset: 0.4 },
          { transform: "scaleY(0.7)", offset: 0.55 },
          { transform: "scaleY(1.0)", offset: 0.7 },
          { transform: "scaleY(1.0)", offset: 0.85 },
          { transform: "scaleY(0.2)" },
        ],
        {
          duration: 1000,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: 100,
        }
      );
    }
  }, []);

  return (
    <div className="flex w-auto items-end gap-x-[1px] overflow-hidden">
      {Array(5)
        .fill(1)
        .map((_, i) => (
          <span
            key={`bar-${i + 1}`}
            ref={(el) => (barsRef.current[i] = el)}
            className="h-4 w-[2.5px] origin-bottom bg-green-600/75 dark:bg-green-400/75"
          />
        ))}
    </div>
  );
};

export default Playing;
