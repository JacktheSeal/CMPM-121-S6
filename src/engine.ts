import type { Machine } from "./machines.ts";

// Spare change from walk-in customers: the arcade earns a little even
// before any machines are installed.
export const WALK_IN_RATE = 0.5; // credits per second

// Every machine gets 15% pricier each time one is installed.
export const COST_GROWTH = 1.15;

// The whole game world: how many credits are sitting in the till, and
// when the simulation last ran.
export interface GameState {
  credits: number;
  lastTick: number;
}

export function newGameState(): GameState {
  return {
    credits: 0,
    lastTick: performance.now(),
  };
}

export function machineCost(machine: Machine): number {
  return machine.baseCost * Math.pow(COST_GROWTH, machine.owned);
}

export function canAfford(state: GameState, machine: Machine): boolean {
  return state.credits >= machineCost(machine);
}

export function purchase(state: GameState, machine: Machine): void {
  const cost = machineCost(machine);
  if (state.credits < cost) return; // never buy on credit
  state.credits -= cost;
  machine.owned += 1;
}

export function productionPerSecond(machines: Machine[]): number {
  return machines.reduce(
    (sum, machine) => sum + machine.owned * machine.creditsPerSecond,
    WALK_IN_RATE,
  );
}
