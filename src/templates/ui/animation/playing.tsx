import { useEffect, useRef } from "react";

const Playing: React.FunctionComponent<{}> = ({}) => {
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const [bar1, bar2, bar3, bar4, bar5] = barsRef.current;

    if (bar1 && bar2 && bar3 && bar4 && bar5) {
      bar1.animate(
        [
          { transform: "scaleY(0.2) translateY(0rem)" },
          { transform: "scaleY(0.5) translateY(-0.032rem)", offset: 0.3 },
          { transform: "scaleY(0.5) translateY(-0.032rem)", offset: 0.4 },
          { transform: "scaleY(0.9) translateY(-0.082rem)", offset: 0.6 },
          { transform: "scaleY(0.9) translateY(-0.082rem)", offset: 0.8 },
          { transform: "scaleY(0.3) translateY(0rem)" },
        ],
        { duration: 1300, iterations: Infinity, easing: "ease-in-out" }
      );

      bar2.animate(
        [
          { transform: "scaleY(0.1) translateY(0rem)" },
          { transform: "scaleY(0.4) translateY(-0.022rem)", offset: 0.4 },
          { transform: "scaleY(0.4) translateY(-0.022rem)", offset: 0.5 },
          { transform: "scaleY(0.7) translateY(-0.062rem)", offset: 0.8 },
          { transform: "scaleY(0.7) translateY(-0.062rem)", offset: 0.9 },
          { transform: "scaleY(0.2) translateY(0rem)" },
        ],
        {
          duration: 1000,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: 200,
        }
      );

      bar3.animate(
        [
          { transform: "scaleY(0.1) translateY(0rem)" },
          { transform: "scaleY(0.6) translateY(-0.022rem)", offset: 0.3 },
          { transform: "scaleY(0.6) translateY(-0.022rem)", offset: 0.4 },
          { transform: "scaleY(0.9) translateY(-0.072rem)", offset: 0.6 },
          { transform: "scaleY(0.9) translateY(-0.072rem)", offset: 0.7 },
          { transform: "scaleY(0.7) translateY(-0.062rem)", offset: 0.9 },
          { transform: "scaleY(0.2) translateY(0rem)" },
        ],
        {
          duration: 1300,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: 400,
        }
      );

      bar4.animate(
        [
          { transform: "scaleY(0.2) translateY(0rem)" },
          { transform: "scaleY(0.5) translateY(-0.022rem)", offset: 0.3 },
          { transform: "scaleY(0.5) translateY(-0.022rem)", offset: 0.4 },
          { transform: "scaleY(0.8) translateY(-0.072rem)", offset: 0.8 },
          { transform: "scaleY(0.3) translateY(-0rem)" },
        ],
        {
          duration: 1000,
          iterations: Infinity,
          easing: "ease-in-out",
          delay: 200,
        }
      );

      bar5.animate(
        [
          { transform: "scaleY(0.2) translateY(0rem)" },
          { transform: "scaleY(0.7) translateY(-0.022rem)", offset: 0.4 },
          { transform: "scaleY(0.7) translateY(-0.022rem)", offset: 0.6 },
          { transform: "scaleY(1.0) translateY(-0.072rem)", offset: 0.8 },
          { transform: "scaleY(1.0) translateY(-0.072rem)", offset: 0.9 },
          { transform: "scaleY(0.2) translateY(0rem)" },
        ],
        {
          duration: 1300,
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
