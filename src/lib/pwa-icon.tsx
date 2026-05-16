import { ImageResponse } from "next/og";

const BACKGROUND = "#0b0b0c";
const FOREGROUND = "#f5f5f4";
const ACCENT = "#ea580c";

function KksIconMark({ size }: { size: number }) {
  const cornerRadius = Math.round(size * (104 / 512));
  const stemWidth = Math.round(size * (74 / 512));
  const stemHeight = Math.round(size * (296 / 512));
  const stemLeft = Math.round(size * (108 / 512));
  const stemTop = Math.round(size * (108 / 512));
  const armWidth = Math.round(size * (262 / 512));
  const armHeight = Math.round(size * (60 / 512));
  const armRadius = Math.max(Math.round(size * (10 / 512)), 6);
  const upperLeft = Math.round(size * ((291 - 131) / 512));
  const upperTop = Math.round(size * ((184 - 30) / 512));
  const lowerLeft = Math.round(size * ((291 - 131) / 512));
  const lowerTop = Math.round(size * ((328 - 30) / 512));

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        borderRadius: cornerRadius,
        background: BACKGROUND,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: upperLeft,
          top: upperTop,
          width: armWidth,
          height: armHeight,
          borderRadius: armRadius,
          background: ACCENT,
          transform: "rotate(-33.4deg)",
          transformOrigin: "center",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: lowerLeft,
          top: lowerTop,
          width: armWidth,
          height: armHeight,
          borderRadius: armRadius,
          background: FOREGROUND,
          transform: "rotate(33.4deg)",
          transformOrigin: "center",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: stemLeft,
          top: stemTop,
          width: stemWidth,
          height: stemHeight,
          borderRadius: armRadius,
          background: FOREGROUND,
        }}
      />
    </div>
  );
}

export function createPwaIconResponse(size: number) {
  return new ImageResponse(<KksIconMark size={size} />, {
    width: size,
    height: size,
  });
}
