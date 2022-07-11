import Link from "next/link";

const SnippetCard: React.FunctionComponent<{
  snippet: {
    title: string;
    summary: string;
    path: string;
    imgUrl: string;
  };
}> = ({ snippet: { title, summary, path, imgUrl } }) => {
  return (
    <Link href={path}>
      <a className="w-full self-stretch rounded-md p-4 ring-1 ring-base-content/40 duration-200 hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary">
        <div className="flex items-center gap-2 border-b border-base-content/40 pb-1">
          <img src={imgUrl} alt="Logo" className="h-5 w-5 object-contain" />
          <h3 className="font-bold ">{title}</h3>
        </div>
        <div className="pt-2">
          <p className="text-sm leading-6 text-base-content/90">{summary}</p>
        </div>
      </a>
    </Link>
  );
};

export default SnippetCard;
