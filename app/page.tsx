


// "use client";

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-white dark:bg-indigo-950">
//       {/* Dark Mode Animated Purple Background */}
//       <div className="hidden dark:block absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-gradient-radial from-purple-900 via-purple-800 to-purple-950 opacity-60 mix-blend-multiply"
//           animate={{
//             scale: [1, 1.3, 1],
//             x: [0, 120, 0],
//             y: [0, -80, 0],
//           }}
//           transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
//         />
//         <motion.div
//           className="absolute bottom-[-300px] right-[-300px] w-[800px] h-[800px] rounded-full bg-gradient-radial from-purple-950 via-purple-900 to-purple-800 opacity-50 mix-blend-multiply"
//           animate={{
//             scale: [1, 1.25, 1],
//             x: [0, -100, 0],
//             y: [0, 100, 0],
//           }}
//           transition={{ duration: 30, repeat: Infinity, repeatType: "mirror" }}
//         />
//       </div>

//       {/* Hero Section */}
//       <motion.h1
//         className="text-5xl md:text-6xl font-bold tracking-tight max-w-4xl text-black dark:text-white drop-shadow-lg"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         Play UNO Online
//         <span className="block text-purple-500 dark:text-purple-400 mt-2 drop-shadow-md">
//           With Friends in Real Time
//         </span>
//       </motion.h1>

//       <motion.p
//         className="mt-6 text-gray-700 dark:text-purple-200 text-lg max-w-2xl drop-shadow-sm"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.8 }}
//       >
//         Join live multiplayer UNO matches instantly. Create a room, invite
//         friends, and compete in fast-paced card battles directly in your
//         browser.
//       </motion.p>

//       <motion.div
//         className="mt-10 flex gap-4"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4, duration: 0.8 }}
//       >
//         <Link href="/lobby">
//           <Button
//             size="lg"
//             className="text-lg px-8 bg-gradient-to-r from-purple-700 to-purple-800 dark:from-purple-700 dark:to-purple-800 text-white shadow-lg hover:from-purple-600 hover:to-purple-700"
//           >
//             Enter Lobby
//           </Button>
//         </Link>

//         <Link href="/sign-up">
//           <Button
//             variant="outline"
//             size="lg"
//             className="border-purple-500 text-purple-500 dark:text-purple-400 hover:bg-purple-900/30 hover:text-white"
//           >
//             Create Account
//           </Button>
//         </Link>
//       </motion.div>

//       {/* Features Section */}
//       <motion.div
//         className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={{
//           hidden: {},
//           visible: { transition: { staggerChildren: 0.3 } },
//         }}
//       >
//         {[
//           {
//             title: "Real-Time Multiplayer",
//             description:
//               "Play live UNO matches with friends or players around the world with instant updates.",
//           },
//           {
//             title: "Private Game Rooms",
//             description:
//               "Create a room and invite your friends to join your match instantly.",
//           },
//           {
//             title: "Smooth Animations",
//             description:
//               "Enjoy polished card animations and a clean modern interface while you play.",
//           },
//         ].map((feature, index) => (
//           <motion.div
//             key={index}
//             className="p-6 rounded-2xl border border-purple-800 bg-white/30 dark:bg-purple-950/50 shadow-lg backdrop-blur-md text-black dark:text-white"
//             variants={{
//               hidden: { opacity: 0, y: 40 },
//               visible: { opacity: 1, y: 0 },
//             }}
//             transition={{ duration: 0.8 }}
//           >
//             <h3 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300">
//               {feature.title}
//             </h3>
//             <p className="text-gray-700 dark:text-purple-200">{feature.description}</p>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Footer CTA */}
//       <motion.div
//         className="mt-24 mb-16"
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <h2 className="text-3xl font-bold mb-4 text-black dark:text-white drop-shadow-md">
//           Ready to Play?
//         </h2>
//         <Link href="/lobby">
//           <Button
//             size="lg"
//             className="bg-gradient-to-r from-purple-700 to-purple-800 dark:from-purple-700 dark:to-purple-800 text-white px-10 py-4 shadow-xl hover:from-purple-600 hover:to-purple-700"
//           >
//             Start a Game →
//           </Button>
//         </Link>
//       </motion.div>
//     </main>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FEATURES = [
  {
    title: "Real-Time Multiplayer",
    description: "Play live UNO matches with friends or players around the world with instant updates powered by Convex.",
    icon: "🌍",
  },
  {
    title: "Private Game Rooms",
    description: "Create a room, invite friends, or join any open lobby. Add AI bots while waiting for players.",
    icon: "🏠",
  },
  {
    title: "Smooth Animations",
    description: "Polished card animations with Framer Motion, dark/light theme, and a responsive mobile-friendly layout.",
    icon: "✨",
  },
];

// Mini demo card for the hero
const DEMO_CARDS = [
  { color: "bg-red-500", value: "7", rotate: -18, x: -110, y: 10 },
  { color: "bg-blue-500", value: "⊘", rotate: -6, x: -55, y: -12 },
  { color: "bg-yellow-400", value: "2", rotate: 4, x: 0, y: 4 },
  { color: "bg-green-500", value: "⇄", rotate: 14, x: 55, y: -8 },
  { color: "bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500", value: "+4", rotate: 24, x: 110, y: 10 },
];

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) router.prefetch("/lobby");
  }, [isSignedIn, router]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-white dark:bg-indigo-950">
      {/* Animated dark background blobs */}
      <div className="hidden dark:block absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-purple-900 opacity-40"
          animate={{ scale: [1, 1.3, 1], x: [0, 120, 0], y: [0, -80, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute bottom-[-300px] right-[-300px] w-[800px] h-[800px] rounded-full bg-purple-950 opacity-30"
          animate={{ scale: [1, 1.25, 1], x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>

      {/* Floating demo cards */}
      <div className="relative h-52 w-full max-w-sm mb-10">
        {DEMO_CARDS.map((card, i) => (
          <motion.div
            key={i}
            className={`absolute w-16 h-24 rounded-2xl ${card.color} shadow-xl border-2 border-white/30 flex items-center justify-center`}
            style={{
              left: "50%",
              top: "50%",
              marginLeft: card.x - 32,
              marginTop: card.y - 48,
              rotate: card.rotate,
              zIndex: i,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="bg-white/20 rounded-full w-10 h-14 flex items-center justify-center border border-white/30">
              <span className="font-bold text-white text-base drop-shadow">{card.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hero text */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl text-black dark:text-white drop-shadow-lg relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Play UNO Online
        <span className="block text-purple-600 dark:text-purple-400 mt-2">
          With Anyone, Anywhere
        </span>
      </motion.h1>

      <motion.p
        className="mt-5 text-gray-600 dark:text-purple-200 text-lg max-w-xl relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Real-time multiplayer UNO with global matchmaking, AI bots, and instant room sharing. No downloads required.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        className="mt-8 flex flex-wrap gap-4 justify-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        {isSignedIn ? (
          <Button
            size="lg"
            className="text-lg px-10 py-6 bg-purple-600 hover:bg-purple-500 dark:bg-purple-700 dark:hover:bg-purple-600 text-white shadow-lg"
            onClick={() => router.push("/lobby")}
          >
            Enter Lobby →
          </Button>
        ) : (
          <>
            <SignInButton mode="modal" forceRedirectUrl="/lobby">
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-purple-600 hover:bg-purple-500 text-white shadow-lg"
              >
                Sign In to Play
              </Button>
            </SignInButton>
            <Link href="/sign-up">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-6 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30"
              >
                Create Account
              </Button>
            </Link>
          </>
        )}
      </motion.div>

      {/* Feature cards */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {FEATURES.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-2xl border border-purple-200 dark:border-purple-800 bg-white/70 dark:bg-purple-950/50 shadow-lg backdrop-blur-sm text-left"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-purple-200">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer CTA */}
      <motion.div
        className="mt-20 mb-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
          Ready to Play?
        </h2>
        <Link href={isSignedIn ? "/lobby" : "/sign-up"}>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-500 text-white px-12 py-6 text-lg shadow-xl"
          >
            Start a Game →
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}