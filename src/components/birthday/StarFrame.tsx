import type { ReactNode } from "react";

export function StarFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  // Star border ring via inline SVG repeated
  const stars = Array.from({ length: 40 });
  return (
    <div className={`relative rounded-[2rem] bg-white shadow-[0_20px_60px_-15px_rgba(255,90,138,0.45)] overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border-[3px] border-pink-strong/70" />
      <div className="pointer-events-none absolute inset-2 rounded-[1.75rem] border border-dashed border-pink-strong/40" />
      <div className="pointer-events-none absolute inset-0">
        {stars.map((_, i) => {
          const angle = (i / stars.length) * Math.PI * 2;
          const rx = 49;
          const ry = 49;
          const x = 50 + Math.cos(angle) * rx;
          const y = 50 + Math.sin(angle) * ry;
          return (
            <span
              key={i}
              className="absolute text-pink-strong text-[10px]"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
            >
              ★
            </span>
          );
        })}
      </div>
      <div className="relative p-4 md:p-8">{children}</div>
    </div>
  );
}
