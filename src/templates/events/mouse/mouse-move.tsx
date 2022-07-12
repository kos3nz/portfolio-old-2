import throttle from "lodash.throttle";
import { useEffect, useRef } from "react";

const MouseMove = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;

    const handleMouseMove = throttle((e: MouseEvent) => {
      if (container && target) {
        const mouseInViewportX = e.clientX;
        const mouseInViewportY = e.clientY;
        const containerTop = container?.getBoundingClientRect().top;
        const containerLeft = container?.getBoundingClientRect().left;
        const mouseInContainerX = mouseInViewportX - containerLeft;
        const mouseInContainerY = mouseInViewportY - containerTop;

        target.style.top = `${mouseInContainerY}px`;
        target.style.left = `${mouseInContainerX}px`;
      }
    }, 50);

    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <div
        ref={targetRef}
        className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 duration-100"
      />
    </div>
  );
};

export default MouseMove;

/** For future reference
 * mouseInViewportX = e.clientX;
 * mouseInViewportY = e.clientY;
 * viewportWidth = window.innerWidth;
 * viewportHeight = window.innerHeight;
 * containerWidth = container?.clientWidth;
 * containerHeight = container?.clientHeight;
 * targetWidth = target?.offsetWidth;
 * targetHeight = target?.offsetHeight;
 * containerTop = container?.getBoundingClientRect().top;
 * containerLeft = container?.getBoundingClientRect().left;
 * mouseInContainerX = mouseInViewportX - containerLeft;
 * mouseInContainerY = mouseInViewportY - containerTop;
 */
