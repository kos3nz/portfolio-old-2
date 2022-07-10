import dynamic from "next/dynamic";
import type { ComponentTemplate } from "types/component";

const allTemplates: {
  [category: string]: {
    [slug: string]: ComponentTemplate[];
  };
} = {
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
        wrapperClassName: "h-[500px]",
      },
    ],
  },
  ui: {
    animation: [
      {
        fileName: "bounce.tsx",
        title: "Bounce",
        Component: dynamic(() => import("./ui/animation/bounce")),
      },
      {
        fileName: "scale.tsx",
        title: "Scale",
        Component: dynamic(() => import("./ui/animation/scale")),
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
