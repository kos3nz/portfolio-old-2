import { useState } from "react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import CopyToClipboard from "components/button/copy-to-clipboard";
import { useCopyToClipboard } from "hooks/useCopyToClipboard";

import type { ComponentTemplate } from "types/component";
import { MDXRemote } from "next-mdx-remote";

const tabs = ["preview", "code"];

const Preview: React.FunctionComponent<{
  component: ComponentTemplate;
  source: string;
  code: string;
}> = ({ component, source, code }) => {
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("dark");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { copied, onCopy } = useCopyToClipboard(code);

  const Component = component.Component;

  return (
    <div className="divide-y divide-base-content/30">
      {/* Title */}
      <h2 className="pb-2 text-lg text-base-content">Title</h2>

      <div className="pt-4">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          {/* Controls */}
          <div className="mb-3 flex items-center justify-between">
            {/* Preview, Code */}
            <Tab.List className="flex rounded-lg bg-base-content/10">
              {tabs.map((item, i) => (
                <Tab
                  key={item}
                  className={clsx(
                    "rounded-lg py-2 px-2 duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary",
                    selectedIndex === i
                      ? "bg-primary/80 text-white shadow"
                      : "text-base-content/60 hover:bg-base-content/20 hover:text-base-content"
                  )}
                  title={item === "preview" ? "View component" : "View code"}
                  aria-label={
                    item === "preview" ? "View component" : "View code"
                  }
                >
                  {item === "preview" ? (
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
                      <circle cx="12" cy="12" r="2"></circle>
                      <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"></path>
                    </svg>
                  ) : (
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
                      <polyline points="7 8 3 12 7 16"></polyline>
                      <polyline points="17 8 21 12 17 16"></polyline>
                      <line x1="14" y1="4" x2="10" y2="20"></line>
                    </svg>
                  )}
                </Tab>
              ))}
            </Tab.List>

            {/* Theme, Clipboard */}
            <div className="flex gap-x-2">
              <button
                className="button-icon"
                onClick={() => {
                  if (previewTheme === "dark") setPreviewTheme("light");
                  else setPreviewTheme("dark");
                }}
                aria-label="Change theme"
                title="Change theme"
              >
                {previewTheme === "light" ? (
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
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
                  </svg>
                ) : (
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
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                  </svg>
                )}
              </button>
              <CopyToClipboard copied={copied} onCopy={onCopy} />
            </div>
          </div>

          {/* Contents */}
          <Tab.Panels className={previewTheme}>
            {tabs.map((item, i) => (
              <Tab.Panel
                key={i}
                className={"rounded-lg focus:outline-none"}
                as="div"
              >
                {item === "preview" ? (
                  <div
                    className={clsx(
                      "relative min-h-[200px] overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800",
                      undefined ?? "flex items-center justify-center"
                    )}
                  >
                    <Component />
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-md bg-slate-800">
                    <MDXRemote compiledSource={source} />
                  </div>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Preview;

const categories = [
  {
    title: "UI",
    links: [
      {
        name: "animation",
        path: "/components/ui/animation",
      },
      { name: "avatar", path: "/components/ui/avatar" },
      { name: "button", path: "/components/ui/button" },

      {
        name: "animation",
        path: "/components/ui/animation",
      },
      { name: "avatar", path: "/components/ui/avatar" },
      { name: "button", path: "/components/ui/button" },
    ],
  },
  {
    title: "navigation",
    links: [
      {
        name: "breadcrumbs",
        path: "/components/ui/breadcrumbs",
      },
      { name: "header", path: "/components/ui/header" },
    ],
  },
];
