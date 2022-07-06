import { outputFileSync } from 'fs-extra';
import { resolve } from 'path';
import mapKeys from 'lodash.mapkeys';
import { getFileNames, getSourceFromFile } from 'utils/server';
import { parseContent } from 'utils/parse-content';

export const createPostDocsManifest = () => {
  const fileNames = getFileNames(['src/data/posts']);

  const parsedContents = fileNames.map((fileName) => {
    const rawContent = getSourceFromFile([`src/data/posts/${fileName}`]);

    return parseContent(
      rawContent,
      {
        fileName,
        requiredMeta: ['title', 'date'],
      },
    );
  },);

  const manifest = mapKeys(
    parsedContents,
    (content) => {
      return content.slug;
    },
  );

  // Almost the same as writeFileSync, except that if the parent directory does not exist, it's created.
  outputFileSync(
    resolve(__dirname, 'manifest/posts.json'),
    JSON.stringify(manifest, null, 2),
  );
};

createPostDocsManifest();

console.log('created posts-manifest.json');
