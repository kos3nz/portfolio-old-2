/* tailwind.config.js
  extend: {
    animation: {
      scaleY: 'scaleY 1.2s ease-in-out infinite var(--delay)',
    },
    keyframes: {
      scaleY: {
        '0%, 60%, 100%': { transform: 'scaleY(0.1)' },
        '30%': { transform: 'scaleY(1)' },
      },
    },
  }
*/

const Scale: React.FunctionComponent<{}> = ({}) => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10"
  >
    <mask
      id="mask_scale"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="44"
      height="44"
    >
      {Array(6)
        .fill(1)
        .map((_, i) => (
          <rect
            key={`bar-${i + 1}`}
            id={`bar-${i + 1}`}
            x={i * 8}
            width="4"
            height="44"
            rx="0"
            ry="0"
            fill="#D9D9D9"
            className="origin-center scale-y-[0.1] animate-scaleY"
            style={
              {
                "--delay": i * 0.1 + "s",
              } as React.CSSProperties
            }
          />
        ))}
    </mask>
    <g mask="url(#mask_scale)">
      <rect width="44" height="44" fill="url(#gradient)" />
    </g>
    <defs>
      <linearGradient
        id="gradient"
        x1="0"
        y1="24"
        x2="44"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3582F5" />
        <stop offset="0.5" stopColor="#22C6EA" />
        <stop offset="1" stopColor="#65F1BF" />
      </linearGradient>
    </defs>
  </svg>
);

export default Scale;
