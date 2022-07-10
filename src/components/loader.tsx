const Loader: React.FunctionComponent<{}> = ({}) => {
  return (
    <div className="flex items-center gap-1">
      {[
        "bg-teal-400",
        "bg-cyan-400",
        "bg-sky-400",
        "bg-blue-400",
        "bg-indigo-400",
      ].map((bar, i) => (
        <span
          key={`bar-${i}`}
          id="bar"
          className={`h-10 w-1 origin-center scale-y-[0.1] animate-scaleY ${bar}`}
          style={
            {
              "--delay": i * 0.1 + "s",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default Loader;
