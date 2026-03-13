// "use client";

// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// interface UnoCardProps {
//   cardId: string;
//   size?: "sm" | "md" | "lg";
//   isPlayable?: boolean;
//   isSelected?: boolean;
//   isFaceDown?: boolean;
//   onClick?: () => void;
//   className?: string;
//   style?: React.CSSProperties;
//   index?: number;
// }

// export function parseCard(cardId: string): { color: string; value: string } {
//   if (cardId === "wild" || cardId === "wild_draw4") {
//     return { color: "wild", value: cardId };
//   }
//   const idx = cardId.indexOf("_");
//   if (idx === -1) return { color: "wild", value: cardId };
//   return { color: cardId.slice(0, idx), value: cardId.slice(idx + 1) };
// }

// const VALUE_DISPLAY: Record<string, string> = {
//   skip: "⊘",
//   reverse: "⇄",
//   draw2: "+2",
//   wild: "★",
//   wild_draw4: "+4",
// };

// const SIZE_CLASSES = {
//   sm: {
//     outer: "w-10 h-[3.5rem]",
//     inner: "w-[60%] h-[65%]",
//     corner: "text-[0.5rem]",
//     center: "0.55rem",
//   },
//   md: {
//     outer: "w-[4.2rem] h-[6rem]",
//     inner: "w-[58%] h-[65%]",
//     corner: "text-[0.65rem]",
//     center: "1.05rem",
//   },
//   lg: {
//     outer: "w-[5.2rem] h-[7.4rem]",
//     inner: "w-[60%] h-[65%]",
//     corner: "text-[0.75rem]",
//     center: "1.35rem",
//   },
// };

// // Rich gradient backgrounds per color
// const COLOR_STYLES: Record<
//   string,
//   { bg: string; glow: string; inner: string; shine: string }
// > = {
//   red: {
//     bg: "linear-gradient(145deg, #ff2d2d 0%, #c0000a 55%, #8b0000 100%)",
//     glow: "rgba(255,45,45,0.7)",
//     inner: "rgba(255,255,255,0.18)",
//     shine: "rgba(255,180,180,0.25)",
//   },
//   blue: {
//     bg: "linear-gradient(145deg, #2d8bff 0%, #0040c0 55%, #001e8b 100%)",
//     glow: "rgba(45,139,255,0.7)",
//     inner: "rgba(255,255,255,0.18)",
//     shine: "rgba(140,200,255,0.25)",
//   },
//   green: {
//     bg: "linear-gradient(145deg, #1fc95b 0%, #0a8c38 55%, #005220 100%)",
//     glow: "rgba(31,201,91,0.7)",
//     inner: "rgba(255,255,255,0.18)",
//     shine: "rgba(150,255,180,0.25)",
//   },
//   yellow: {
//     bg: "linear-gradient(145deg, #ffe835 0%, #e0a800 55%, #9b6f00 100%)",
//     glow: "rgba(255,220,30,0.7)",
//     inner: "rgba(255,255,255,0.22)",
//     shine: "rgba(255,245,160,0.35)",
//   },
//   wild: {
//     bg: "conic-gradient(from 180deg at 50% 50%, #ff2d2d 0deg, #ffe835 90deg, #1fc95b 180deg, #2d8bff 270deg, #ff2d2d 360deg)",
//     glow: "rgba(200,100,255,0.6)",
//     inner: "rgba(255,255,255,0.2)",
//     shine: "rgba(255,255,255,0.3)",
//   },
// };

// export function UnoCard({
//   cardId,
//   size = "md",
//   isPlayable = false,
//   isSelected = false,
//   isFaceDown = false,
//   onClick,
//   className,
//   style,
//   index = 0,
// }: UnoCardProps) {
//   const { color, value } = parseCard(cardId);
//   const displayValue = VALUE_DISPLAY[value] ?? value.toUpperCase();
//   const s = SIZE_CLASSES[size];
//   const cs = COLOR_STYLES[color] ?? COLOR_STYLES.wild;

//   return (
//     <motion.div
//       className={cn(
//         "relative rounded-2xl select-none flex-shrink-0",
//         s.outer,
//         onClick && isPlayable ? "cursor-pointer" : "cursor-default",
//         className,
//       )}
//       style={{
//         ...style,
//         boxShadow: isSelected
//           ? `0 0 0 3px white, 0 0 0 5px ${cs.glow}, 0 16px 40px ${cs.glow}`
//           : isPlayable
//             ? `0 0 0 2.5px ${cs.glow}, 0 8px 24px ${cs.glow}, 0 4px 12px rgba(0,0,0,0.4)`
//             : "0 4px 12px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.2)",
//       }}
//       initial={{ opacity: 0, y: -20, rotateY: -15 }}
//       animate={{ opacity: 1, y: 0, rotateY: 0 }}
//       transition={{
//         delay: index * 0.04,
//         type: "spring",
//         stiffness: 280,
//         damping: 22,
//       }}
//       whileHover={isPlayable ? { y: -14, scale: 1.1, rotateZ: -2 } : undefined}
//       whileTap={isPlayable ? { scale: 0.93, rotateZ: 1 } : undefined}
//       onClick={isPlayable ? onClick : undefined}
//     >
//       {/* Card body */}
//       <div
//         className="absolute inset-0 rounded-2xl overflow-hidden"
//         style={{
//           background: isFaceDown
//             ? "linear-gradient(145deg, #1a0a3a 0%, #2d0a5a 50%, #1a0a3a 100%)"
//             : cs.bg,
//         }}
//       >
//         {/* Top-left shine */}
//         <div
//           className="absolute top-0 left-0 w-full h-1/2 rounded-t-2xl"
//           style={{
//             background: `linear-gradient(160deg, ${isFaceDown ? "rgba(255,255,255,0.08)" : cs.shine} 0%, transparent 70%)`,
//           }}
//         />

//         {/* Outer border inset */}
//         <div className="absolute inset-[3px] rounded-[14px] border border-white/20 pointer-events-none" />

//         {!isFaceDown ? (
//           <>
//             {/* Corner labels */}
//             <span
//               className={cn(
//                 "absolute top-1.5 left-2 font-black text-white leading-none drop-shadow-sm",
//                 s.corner,
//               )}
//               style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
//             >
//               {displayValue}
//             </span>
//             <span
//               className={cn(
//                 "absolute bottom-1.5 right-2 font-black text-white leading-none drop-shadow-sm rotate-180",
//                 s.corner,
//               )}
//               style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
//             >
//               {displayValue}
//             </span>

//             {/* Center oval */}
//             <div
//               className={cn(
//                 "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center",
//                 s.inner,
//               )}
//               style={{
//                 background: cs.inner,
//                 border: "1.5px solid rgba(255,255,255,0.35)",
//                 backdropFilter: "blur(2px)",
//                 boxShadow:
//                   "inset 0 1px 6px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.3)",
//                 transform: "translate(-50%, -50%) rotate(-25deg)",
//                 width: size === "sm" ? "62%" : "60%",
//                 height: size === "sm" ? "66%" : "68%",
//               }}
//             >
//               <span
//                 className="font-black text-white drop-shadow rotate-[25deg]"
//                 style={{
//                   fontSize: s.center,
//                   textShadow:
//                     "0 2px 6px rgba(0,0,0,0.6), 0 0 12px rgba(255,255,255,0.3)",
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 {displayValue}
//               </span>
//             </div>

//             {/* Playable shimmer pulse */}
//             {isPlayable && (
//               <motion.div
//                 className="absolute inset-0 rounded-2xl pointer-events-none"
//                 animate={{ opacity: [0, 0.5, 0] }}
//                 transition={{
//                   duration: 1.6,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//                 style={{
//                   background: `radial-gradient(ellipse at 50% 50%, ${cs.glow} 0%, transparent 70%)`,
//                 }}
//               />
//             )}
//           </>
//         ) : (
//           /* Face-down pattern */
//           <>
//             <div
//               className="absolute inset-[6px] rounded-[10px] border border-purple-400/30"
//               style={{
//                 background:
//                   "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(139,92,246,0.08) 4px, rgba(139,92,246,0.08) 8px)",
//               }}
//             />
//             <span
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-white/30"
//               style={{
//                 fontSize:
//                   size === "lg"
//                     ? "0.9rem"
//                     : size === "md"
//                       ? "0.7rem"
//                       : "0.5rem",
//                 letterSpacing: "0.15em",
//               }}
//             >
//               UNO
//             </span>
//           </>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// export function CardBack({
//   size = "md",
//   className,
// }: {
//   size?: "sm" | "md" | "lg";
//   className?: string;
// }) {
//   return <UnoCard cardId="wild" size={size} isFaceDown className={className} />;
// }

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface UnoCardProps {
  cardId: string;
  size?: "sm" | "md" | "lg";
  isPlayable?: boolean;
  isSelected?: boolean;
  isFaceDown?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
}

export function parseCard(cardId: string): { color: string; value: string } {
  if (cardId === "wild" || cardId === "wild_draw4") {
    return { color: "wild", value: cardId };
  }
  const idx = cardId.indexOf("_");
  if (idx === -1) return { color: "wild", value: cardId };
  return { color: cardId.slice(0, idx), value: cardId.slice(idx + 1) };
}

const VALUE_DISPLAY: Record<string, string> = {
  skip: "⊘",
  reverse: "⇄",
  draw2: "+2",
  wild: "★",
  wild_draw4: "+4",
};

const SIZE_CLASSES = {
  sm: {
    outer: "w-10 h-[3.5rem]",
    corner: "text-[0.5rem]",
    center: "0.55rem",
    radius: "rounded-xl",
  },
  md: {
    outer: "w-[4.2rem] h-[6rem]",
    corner: "text-[0.65rem]",
    center: "1.05rem",
    radius: "rounded-2xl",
  },
  lg: {
    outer: "w-[5.2rem] h-[7.4rem]",
    corner: "text-[0.8rem]",
    center: "1.4rem",
    radius: "rounded-2xl",
  },
};

// Each color: bright saturated center → deep rich edge (radial flow)
const COLOR_STYLES: Record<
  string,
  {
    bg: string;
    glow: string;
    glowColor: string;
    outerRing: string;
    innerBorder: string;
  }
> = {
  red: {
    bg: "radial-gradient(ellipse at 38% 32%, #fca5a5 0%, #ef4444 28%, #dc2626 55%, #991b1b 80%, #450a0a 100%)",
    glow: "rgba(239,68,68,0.75)",
    glowColor: "#ef4444",
    outerRing: "rgba(252,165,165,0.4)",
    innerBorder: "rgba(254,202,202,0.35)",
  },
  blue: {
    bg: "radial-gradient(ellipse at 38% 32%, #bfdbfe 0%, #3b82f6 28%, #2563eb 55%, #1e40af 80%, #172554 100%)",
    glow: "rgba(59,130,246,0.75)",
    glowColor: "#3b82f6",
    outerRing: "rgba(147,197,253,0.4)",
    innerBorder: "rgba(191,219,254,0.35)",
  },
  green: {
    bg: "radial-gradient(ellipse at 38% 32%, #bbf7d0 0%, #22c55e 28%, #16a34a 55%, #166534 80%, #052e16 100%)",
    glow: "rgba(34,197,94,0.75)",
    glowColor: "#22c55e",
    outerRing: "rgba(134,239,172,0.4)",
    innerBorder: "rgba(187,247,208,0.35)",
  },
  yellow: {
    bg: "radial-gradient(ellipse at 38% 32%, #fef9c3 0%, #facc15 28%, #eab308 55%, #a16207 80%, #422006 100%)",
    glow: "rgba(234,179,8,0.75)",
    glowColor: "#eab308",
    outerRing: "rgba(253,224,71,0.4)",
    innerBorder: "rgba(254,249,195,0.4)",
  },
  wild: {
    bg: "radial-gradient(ellipse at 38% 32%, #f0abfc 0%, #a855f7 28%, #7c3aed 55%, #4338ca 78%, #1e1b4b 100%)",
    glow: "rgba(168,85,247,0.8)",
    glowColor: "#a855f7",
    outerRing: "rgba(240,171,252,0.4)",
    innerBorder: "rgba(245,208,254,0.35)",
  },
};

export function UnoCard({
  cardId,
  size = "md",
  isPlayable = false,
  isSelected = false,
  isFaceDown = false,
  onClick,
  className,
  style,
  index = 0,
}: UnoCardProps) {
  const { color, value } = parseCard(cardId);
  const displayValue = VALUE_DISPLAY[value] ?? value.toUpperCase();
  const s = SIZE_CLASSES[size];
  const cs = COLOR_STYLES[color] ?? COLOR_STYLES.wild;
  const isWild = color === "wild";

  return (
    <motion.div
      className={cn(
        "relative select-none flex-shrink-0",
        s.outer,
        s.radius,
        onClick && isPlayable ? "cursor-pointer" : "cursor-default",
        className,
      )}
      style={{
        ...style,
        boxShadow: isSelected
          ? `0 0 0 3px white, 0 0 0 5px ${cs.glowColor}, 0 0 36px ${cs.glow}, 0 14px 32px rgba(0,0,0,0.55)`
          : isPlayable
            ? `0 0 0 2px ${cs.outerRing}, 0 0 22px ${cs.glow}, 0 6px 18px rgba(0,0,0,0.5)`
            : "0 4px 14px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)",
      }}
      initial={{ opacity: 0, y: -16, rotateY: -20 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{
        delay: index * 0.04,
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      whileHover={isPlayable ? { y: -16, scale: 1.12, rotateZ: -2 } : undefined}
      whileTap={isPlayable ? { scale: 0.92, rotateZ: 1 } : undefined}
      onClick={isPlayable ? onClick : undefined}
    >
      {/* Card body */}
      <div
        className={cn("absolute inset-0 overflow-hidden", s.radius)}
        style={{
          background: isFaceDown
            ? "radial-gradient(ellipse at 38% 32%, #7c3aed 0%, #4c1d95 35%, #2e1065 65%, #0f0520 100%)"
            : cs.bg,
        }}
      >
        {/* Top-left specular highlight — simulates light source */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 22% 18%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 35%, transparent 60%)",
          }}
        />

        {/* Bottom-right subtle bounce light */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 82% 85%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />

        {/* Inset border ring */}
        <div
          className={cn(
            "absolute inset-[3px] pointer-events-none border",
            s.radius,
          )}
          style={{ borderColor: cs.innerBorder, borderWidth: "1.5px" }}
        />

        {!isFaceDown ? (
          <>
            {/* Corner labels */}
            <span
              className={cn(
                "absolute top-1.5 left-2 font-black text-white leading-none",
                s.corner,
              )}
              style={{
                textShadow:
                  "0 1px 4px rgba(0,0,0,0.65), 0 0 10px rgba(255,255,255,0.2)",
              }}
            >
              {displayValue}
            </span>
            <span
              className={cn(
                "absolute bottom-1.5 right-2 font-black text-white leading-none rotate-180",
                s.corner,
              )}
              style={{
                textShadow:
                  "0 1px 4px rgba(0,0,0,0.65), 0 0 10px rgba(255,255,255,0.2)",
              }}
            >
              {displayValue}
            </span>

            {/* Center oval — tilted like real UNO cards */}
            <div
              className="absolute top-1/2 left-1/2 flex items-center justify-center"
              style={{
                width: "62%",
                height: "68%",
                transform: "translate(-50%, -50%) rotate(-22deg)",
                borderRadius: "50%",
                // Oval itself is a darker radial to create depth against the card bg
                background:
                  "radial-gradient(ellipse at 40% 35%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)",
                border: `1.5px solid ${cs.innerBorder}`,
                boxShadow: `inset 0 2px 8px rgba(0,0,0,0.3), inset 0 -1px 4px rgba(255,255,255,0.1)`,
              }}
            >
              {/* Oval inner highlight */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse at 35% 28%, rgba(255,255,255,0.22) 0%, transparent 60%)",
                }}
              />
              <span
                className="font-black text-white relative z-10"
                style={{
                  fontSize: s.center,
                  transform: "rotate(22deg)",
                  textShadow:
                    "0 2px 8px rgba(0,0,0,0.7), 0 0 18px rgba(255,255,255,0.3)",
                  letterSpacing: "-0.02em",
                }}
              >
                {displayValue}
              </span>
            </div>

            {/* Wild only: slow-spinning conic shimmer overlay */}
            {isWild && (
              <motion.div
                className={cn("absolute inset-0 pointer-events-none", s.radius)}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(248,113,113,0.25), rgba(251,191,36,0.25), rgba(74,222,128,0.25), rgba(96,165,250,0.25), rgba(232,121,249,0.25), rgba(248,113,113,0.25))",
                  mixBlendMode: "screen",
                }}
              />
            )}

            {/* Playable state: pulsing radial glow from center */}
            {isPlayable && (
              <motion.div
                className={cn("absolute inset-0 pointer-events-none", s.radius)}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${cs.glow} 0%, transparent 72%)`,
                }}
              />
            )}
          </>
        ) : (
          /* Face-down */
          <>
            <div
              className="absolute inset-[5px] pointer-events-none"
              style={{
                borderRadius: "9px",
                border: "1px solid rgba(167,139,250,0.2)",
                background:
                  "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(139,92,246,0.07) 5px, rgba(139,92,246,0.07) 10px)",
              }}
            />
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-white/25 tracking-[0.2em]"
              style={{
                fontSize:
                  size === "lg"
                    ? "0.7rem"
                    : size === "md"
                      ? "0.55rem"
                      : "0.4rem",
              }}
            >
              UNO
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
}

export function CardBack({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return <UnoCard cardId="wild" size={size} isFaceDown className={className} />;
}
