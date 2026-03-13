// import { defineSchema, defineTable } from "convex/server";
// import { v } from "convex/values";

// export default defineSchema({
//   users: defineTable({
//     clerkId: v.string(),
//     email: v.string(),
//     name: v.string(),
//     imageUrl: v.optional(v.string()),
//     role: v.union(v.literal("admin"), v.literal("user")),
//     createdAt: v.number(),
//   }).index("by_clerk_id", ["clerkId"]),
// });

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("user")),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  rooms: defineTable({
    name: v.string(),
    hostId: v.string(),
    hostName: v.string(),
    status: v.union(
      v.literal("waiting"),
      v.literal("playing"),
      v.literal("finished"),
    ),
    maxPlayers: v.number(),
    playerIds: v.array(v.string()),
    createdAt: v.number(),
  }).index("by_status", ["status"]),

  players: defineTable({
    roomId: v.id("rooms"),
    userId: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
    isBot: v.boolean(),
    isReady: v.boolean(),
    isConnected: v.boolean(),
    hand: v.array(v.string()),
    seatIndex: v.number(),
  })
    .index("by_room", ["roomId"])
    .index("by_user_room", ["userId", "roomId"]),

  games: defineTable({
    roomId: v.id("rooms"),
    deck: v.array(v.string()),
    discardPile: v.array(v.string()),
    currentColor: v.string(),
    currentPlayerIndex: v.number(),
    playerOrder: v.array(v.string()),
    direction: v.number(),
    drawStack: v.number(),
    lastAction: v.optional(v.string()),
    winnerId: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("finished")),
    createdAt: v.number(),
  }).index("by_room", ["roomId"]),

  messages: defineTable({
    roomId: v.id("rooms"),
    userId: v.string(),
    userName: v.string(),
    text: v.string(),
    createdAt: v.number(),
  }).index("by_room", ["roomId"]),
});
