import dynamic from "next/dynamic";
import type { ComponentTemplate } from "types/component";

const allTemplates: {
  [category: string]: {
    [slug: string]: ComponentTemplate[];
  };
} = {
  events: {
    mouse: [
      {
        fileName: "mouse-move.tsx",
        title: "Mouse move",
        Component: dynamic(() => import("./events/mouse/mouse-move")),
        notCentered: true,
        containerClassName: "h-[200px]",
      },
    ],
  },
  navigation: {
    breadcrumbs: [
      {
        fileName: "with-chevrons.tsx",
        title: "With chevrons",
        Component: dynamic(
          () => import("./navigation/breadcrumbs/with-chevrons")
        ),
      },
    ],
    headers: [
      {
        fileName: "simple.tsx",
        title: "Simple",
        Component: dynamic(() => import("./navigation/headers/simple")),
        notCentered: true,
      },
    ],
    sidebars: [
      {
        fileName: "simple.tsx",
        title: "Simple",
        Component: dynamic(() => import("./navigation/sidebars/simple")),
        notCentered: true,
        containerClassName: "h-[500px]",
      },
    ],
  },
  ui: {
    animation: [
      {
        fileName: "bounce.tsx",
        title: "Bounce with Framer motion",
        Component: dynamic(() => import("./ui/animation/bounce")),
      },
      {
        fileName: "scale.tsx",
        title: "Scale with TailwindCSS",
        Component: dynamic(() => import("./ui/animation/scale")),
      },
      {
        fileName: "playing.tsx",
        title: "Playing with Web Animations API",
        Component: dynamic(() => import("./ui/animation/playing")),
      },
    ],
    images: [
      {
        fileName: "smooth-render.tsx",
        title: "Smooth rendering",
        Component: dynamic(() => import("./ui/images/smooth-render")),
      },
    ],
  },
};
export default allTemplates;
