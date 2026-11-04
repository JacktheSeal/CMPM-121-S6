export interface Machine {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  creditsPerSecond: number;
  owned: number;
}

// Every machine in the arcade. Adding a new machine is one entry here;
// the shop, the view, and the income loop pick it up automatically.
export const MACHINES: Machine[] = [
  {
    id: "pong",
    name: "Tabletop Pong",
    description: "Two paddles, one dot, endless waiting.",
    baseCost: 15,
    creditsPerSecond: 0.1,
    owned: 0,
  },
  {
    id: "blaster",
    name: "Space Blaster",
    description: "Every hit ship drops a fresh pile of coins.",
    baseCost: 100,
    creditsPerSecond: 1,
    owned: 0,
  },
  {
    id: "stacker",
    name: "Block Stacker",
    description: "Claw machines for people who like crying.",
    baseCost: 1100,
    creditsPerSecond: 8,
    owned: 0,
  },
  {
    id: "fighter",
    name: "Fighting Cabinet",
    description: "Two players, one loser, zero mercy.",
    baseCost: 12000,
    creditsPerSecond: 47,
    owned: 0,
  },
  {
    id: "rhythm",
    name: "Rhythm Machine",
    description: "Full-body dance cabinets. Full pockets required.",
    baseCost: 130000,
    creditsPerSecond: 325,
    owned: 0,
  },
];
