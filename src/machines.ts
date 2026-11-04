export interface Machine {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  creditsPerSecond: number;
  /** Accent color for this machine's fleet icons. */
  accent: string;
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
    creditsPerSecond: 0.2,
    accent: "#4fd1c5",
    owned: 0,
  },
  {
    id: "blaster",
    name: "Space Blaster",
    description: "Every hit ship drops a fresh pile of coins.",
    baseCost: 100,
    creditsPerSecond: 1.2,
    accent: "#e94f6a",
    owned: 0,
  },
  {
    id: "stacker",
    name: "Block Stacker",
    description: "Claw machines for people who like crying.",
    baseCost: 1100,
    creditsPerSecond: 11,
    accent: "#f2c14e",
    owned: 0,
  },
  {
    id: "fighter",
    name: "Fighting Cabinet",
    description: "Two players, one loser, zero mercy.",
    baseCost: 12000,
    creditsPerSecond: 120,
    accent: "#a78bfa",
    owned: 0,
  },
  {
    id: "rhythm",
    name: "Rhythm Machine",
    description: "Full-body dance cabinets. Full pockets required.",
    baseCost: 130000,
    creditsPerSecond: 1200,
    accent: "#ff8c42",
    owned: 0,
  },
];
