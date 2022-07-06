import GithubSlugger from 'github-slugger';
import matter from 'gray-matter';
import removeMarkdown from 'remove-markdown';

export const parseContent = (
  rawContent: string,
  options?: { requiredMeta?: string[]; fileName?: string },
) => {
  const slugger = new GithubSlugger();
  const { content, data } = matter(rawContent);

  if (options?.requiredMeta) {
    options.requiredMeta.forEach((meta) => {
      if (!Reflect.ownKeys(data).includes(meta)) {
        throw new Error(
          `Missing required meta in ${options.fileName || data.title}: ` + meta,
        );
      }

      return;
    },);
  }

  const plainText = stripMarkdown(content);
  const slug = slugger.slug(data.title);

  const regExpForHeadings = /(#{1,}) ([ -\w\(\)\.]*)/g;
  const iterable = content.matchAll(regExpForHeadings);
  const tableOfContents = [...iterable].map((heading) => {
    const [_, level, text] = heading;
    const hash = '#' + slugger.slug(text);

    return {
      level: level.length,
      text,
      hash,
    };
  },);
  const hashes = tableOfContents.map((heading) => heading.hash);

  data.date = validateDateString(data.date);
  data.summary = data.summary || (plainText.substring(0, 120) + '...');
  data.tags = data.tags || [];

  return {
    slug,
    source: content,
    frontMatter: data,
    tableOfContents,
    hashes,
  };
};

export const validateDateString = (dateString: string) => {
  return dateString
    .split('-')
    .map((d) => d.length === 1 ? d.padStart(2, '0') : d)
    .join('-');
};

const stripMarkdown = (content: string) => {
  // Remove code blocks
  const strippedContent = content.replace(/```[\w\W]*\n[\s\S]*?\n```/g, '');

  return removeMarkdown(strippedContent).replace(/\n/g, ' ').trim();
};
