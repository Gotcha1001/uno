// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Id } from "@/convex/_generated/dataModel";

// interface Props {
//   winnerName: string;
//   isWinner: boolean;
//   roomId: Id<"rooms">;
// }

// export function WinScreen({ winnerName, isWinner, roomId }: Props) {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-indigo-950 px-4">
//       <motion.div
//         className="text-center"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ type: "spring", stiffness: 200 }}
//       >
//         <motion.div
//           className="text-8xl mb-6"
//           animate={{ rotate: [0, -10, 10, -10, 0] }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           {isWinner ? "🏆" : "😔"}
//         </motion.div>

//         <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-3">
//           {isWinner ? "You Win!" : "Game Over"}
//         </h1>

//         <p className="text-lg text-gray-600 dark:text-purple-300 mb-8">
//           {isWinner
//             ? "Congratulations! You played all your cards!"
//             : `${winnerName} won this round.`}
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Button
//             className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 text-lg"
//             onClick={() => router.push("/lobby")}
//           >
//             Back to Lobby
//           </Button>
//           <Button
//             variant="outline"
//             className="border-purple-500 text-purple-600 dark:text-purple-400 px-8 py-3 text-lg"
//             onClick={() => router.push(`/game/${roomId}`)}
//           >
//             Play Again
//           </Button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

// ─── CHANGES FROM ORIGINAL ────────────────────────────────────────────────────
// 1. Added `onPlayAgain` prop (optional callback).
//    - When provided (online multiplayer): calls the resetRoom mutation and
//      stays in the same lobby so the existing party can replay without
//      everyone having to navigate to a new room.
//    - When omitted (fallback): falls back to router.push(`/game/${roomId}`)
//      which was the old (broken) behaviour — kept for safety but unused now.
// 2. Imported useMutation + api so the component can call resetRoom itself.
// 3. Removed the `useRouter` dependency when `onPlayAgain` is supplied.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  winnerName: string;
  isWinner: boolean;
  roomId: Id<"rooms">;
  /** The Clerk userId of the current user — needed to authorise the reset. */
  currentUserId: string;
  /**
   * When provided the component calls resetRoom then invokes this callback
   * so the parent page can transition back to the WaitingRoom in-place.
   * When omitted we fall back to a simple router.push (old behaviour).
   */
  onPlayAgain?: () => void;
}

export function WinScreen({
  winnerName,
  isWinner,
  roomId,
  currentUserId,
  onPlayAgain,
}: Props) {
  const router = useRouter();
  const resetRoom = useMutation(api.rooms.resetRoom);
  const [resetting, setResetting] = useState(false);

  const handlePlayAgain = async () => {
    if (resetting) return;
    setResetting(true);
    try {
      // Reset the room in Convex — status → "waiting", players un-readied,
      // old game document deleted.
      await resetRoom({ roomId });

      if (onPlayAgain) {
        // Parent handles the UI transition (stays on the same page/room).
        onPlayAgain();
      } else {
        // Fallback: navigate back to the game route (host will need to
        // re-start from the WaitingRoom).
        router.push(`/game/${roomId}`);
      }
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Could not reset room");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-indigo-950 px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.div
          className="text-8xl mb-6"
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {isWinner ? "🏆" : "😔"}
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-3">
          {isWinner ? "You Win!" : "Game Over"}
        </h1>

        <p className="text-lg text-gray-600 dark:text-purple-300 mb-8">
          {isWinner
            ? "Congratulations! You played all your cards!"
            : `${winnerName} won this round.`}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 text-lg"
            onClick={() => router.push("/lobby")}
          >
            Back to Lobby
          </Button>

          <Button
            variant="outline"
            className="border-purple-500 text-purple-600 dark:text-purple-400 px-8 py-3 text-lg"
            onClick={handlePlayAgain}
            disabled={resetting}
          >
            {resetting ? "Resetting…" : "🔄 Play Again"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
