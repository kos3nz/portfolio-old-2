import clsx from "clsx";

const CopyToClipboard: React.FunctionComponent<{
  copied: boolean;
  onCopy: () => void;
  className?: string;
}> = ({ copied, onCopy, className = "button-icon" }) => {
  return (
    <button
      className={className}
      aria-label="Copy to clipboard"
      title="Copy to clipboard"
      onClick={onCopy}
    >
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
        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
        <rect x="9" y="3" width="6" height="4" rx="2"></rect>
        <path d="M9 12h6"></path>
        <path d="M9 16h6"></path>
      </svg>

      <span
        className={clsx(
          "absolute -right-3 -top-9 rounded-lg border border-base-content/50 bg-base-200 px-2 py-1 text-xs font-semibold text-base-content duration-200",
          copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        )}
      >
        Copied!
      </span>
    </button>
  );
};

export default CopyToClipboard;
