"use client";

import { useEffect, useRef } from "react";

interface MagnetLinesProps {
  rows?: number;
  cols?: number;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function MagnetLines({
  rows = 9,
  cols = 16,
  lineColor = "rgba(56, 189, 248, 0.2)",
  lineWidth = "1px",
  lineHeight = "24px",
  baseAngle = -10,
  style,
  className = "",
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll("span");

    const onPointerMove = (e: PointerEvent) => {
      const pointer = { x: e.x, y: e.y };
      
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        
        const b = pointer.x - center.x;
        const a = pointer.y - center.y;
        const c = Math.sqrt(a * a + b * b);
        
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > center.y ? 1 : -1);
        
        item.style.rotate = `${r + baseAngle}deg`;
      });
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [baseAngle]);

  const total = rows * cols;

  return (
    <div
      ref={containerRef}
      className={`grid overflow-hidden ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center justify-center w-full h-full pointer-events-none">
          <span
            className="block rounded-full transition-transform duration-75 ease-out will-change-transform"
            style={{
              width: lineWidth,
              height: lineHeight,
              backgroundColor: lineColor,
            }}
          />
        </div>
      ))}
    </div>
  );
}
