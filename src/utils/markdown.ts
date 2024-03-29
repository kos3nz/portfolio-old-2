import { bundleMDX } from 'mdx-bundler';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export const createMDXSource = async (source: string) => {
  const mdxSource = await bundleMDX({
    source,
    mdxOptions: (options) => {
      options.remarkPlugins = [remarkGfm];
      options.rehypePlugins =
        [
          rehypeCodeTitles, // Code blocksにタイトルを付与
          rehypePrism,
          rehypeSlug, // Headingsにid attributeを追加
          [
            rehypeAutolinkHeadings, // Headingsにリンクを付与
            {
              // `prepend`・`append`・`wrap`・`before`・`after` でリンクの挿入位置を指定
              behavior: 'prepend',

              // `a` 要素に付与する属性
              properties: {
                className: ['anchor'],
              },

              // hast Node として `a` 要素の子要素を定義する
              content: {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: ['anchor-icon'],
                },
                children: [
                  {
                    type: 'text',
                    value: '#',
                  },
                ],
              },
            },
          ],
        ];

      return options;
    },
  },);

  return mdxSource;
};
