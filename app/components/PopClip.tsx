import type { PopAsset } from "../pops";
import { popFile } from "../assets";

/**
 * One real Pop as captured, drawn at its Mac size (half the 2x capture) times `scale`.
 * A still Pop is only this; a PopFX Pop shows it when WebGL 2 is unavailable (LivePop).
 */
export default function PopClip({
  pop,
  scale = 1,
  eager = false,
  className = "",
}: {
  pop: PopAsset;
  scale?: number;
  eager?: boolean;
  className?: string;
}) {
  const width = Math.round((pop.width / 2) * scale);
  const height = Math.round((pop.height / 2) * scale);
  return (
    <div className={`dp-pop ${className}`} style={{ width, height }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="dp-pop-media"
        src={popFile(`${pop.slug}-poster.webp`)}
        width={width}
        height={height}
        alt=""
        decoding="async"
        loading={eager ? "eager" : "lazy"}
        draggable={false}
      />
    </div>
  );
}
