import dynamic from "next/dynamic";
import type { ComponentTemplate } from "types/component";

const allTemplates: {
  [category: string]: {
    [slug: string]: ComponentTemplate[];
  };
} = {
  ui: {
    animation: [
      {
        fileName: "bounce.tsx",
        title: "bounce",
        Component: dynamic(() => import("./ui/animation/bounce")),
      },
    ],
  },
};
export default allTemplates;
