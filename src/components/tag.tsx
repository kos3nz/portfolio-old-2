import { BrandColor, brandColors } from "consts/brand-colors";

const Tag: React.FunctionComponent<{
  text: string;
  color?: string;
  brand?: BrandColor;
}> = ({ text, color, brand }) => {
  return (
    <div
      className="rounded-full text-sm font-bold capitalize text-base-content/70"
      style={{
        color: brand ? brandColors[brand.toLowerCase() as BrandColor] : color,
      }}
    >
      <span>#</span>
      <span>{text}</span>
    </div>
  );
};

export default Tag;
