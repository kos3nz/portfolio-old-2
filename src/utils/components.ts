import rehypePrism from 'rehype-prism-plus';
import mapKeys from 'lodash.mapkeys';

import { getDirNames, getFileNames, getSourceFromFile } from 'utils/server';

const rootDir = 'src/templates';

export const getComponentCategories = () => {
  return getDirNames([rootDir]);
};

export const getComponentSlugs = (category: string) => {
  return getDirNames([rootDir, category]);
};

export const getComponentFiles = (category: string, slug: string) => {
  return getFileNames([rootDir, category, slug], '.tsx');
};

export const getAllComponentPaths = () => {
  const categories = getComponentCategories();

  const paths = categories.reduce<
    { params: { category: string; slug: string } }[]
  >(
    (paths, category) => {
      const slugs = getComponentSlugs(category);

      const componentPaths = slugs.map(
        (slug) => ({
          params: {
            category,
            slug,
          },
        }),
      );

      return paths.concat(componentPaths);
    },
    [],
  );

  return paths;
};

export const getAllComponentRoutes = () => {
  const categories = getComponentCategories();

  const routes = categories.map((category) => {
    const slugs = getComponentSlugs(category);

    const componentRoutes = slugs.map(
      (slug) => ({
        name: slug,
        path: `/components/${category}/${slug}`,
      }),
    );

    return {
      name: category,
      routes: componentRoutes,
    };
  },);

  return routes;
};

import { bundleMDX } from 'mdx-bundler';

export const getComponentSources = async (category: string, slug: string) => {
  const files = getComponentFiles(category, slug);

  const sources = await Promise.all(
    files.map(async (file) => {
      const source = getSourceFromFile([rootDir, category, slug, file]);

      const mdxSource = '```tsx\n' + source + '\n```';

      const { code } = await bundleMDX({
        source: mdxSource,
        mdxOptions: (options) => {
          options.rehypePlugins =
            [...(options?.rehypePlugins ?? []), rehypePrism];
          return options;
        },
      },);
      return {
        fileName: file,
        mdx: code,
        raw: source,
      };
    },),
  );

  return mapKeys(sources, (source) => source.fileName);
};
