"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

interface Props {
  winnerName: string;
  isWinner: boolean;
  roomId: Id<"rooms">;
}

export function WinScreen({ winnerName, isWinner, roomId }: Props) {
  const router = useRouter();

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
            onClick={() => router.push(`/game/${roomId}`)}
          >
            Play Again
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
