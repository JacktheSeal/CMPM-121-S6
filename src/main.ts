// INSERT COIN — an arcade tycoon.
// Insert coins to earn credits, then install machines that earn for you.
// Wiring only: state lives in engine.ts, machine data in machines.ts,
// and everything the user sees in render.ts.

import "./style.css";

import {
  machineCost,
  newGameState,
  productionPerSecond,
  purchase,
} from "./engine.ts";
import { formatCredits } from "./format.ts";
import { MACHINES } from "./machines.ts";
import { initView, spawnFloater, updateFleet } from "./render.ts";

const app = document.querySelector<HTMLElement>("#app")!;

const state = newGameState();
const view = initView(app);

function render() {
  view.counter.textContent = `${
    formatCredits(state.credits)
  } credits in the till`;
  view.rate.textContent = `+${
    formatCredits(productionPerSecond(MACHINES))
  } credits/s`;

  for (const machine of MACHINES) {
    const row = view.machineRows.get(machine.id)!;
    const price = machineCost(machine);
    row.buy.textContent = `${formatCredits(price)} credits`;
    row.buy.disabled = state.credits < price;
    row.meta.textContent = `x${machine.owned} installed · +${
      formatCredits(machine.creditsPerSecond)
    } credits/s each`;
    updateFleet(row.fleet, machine.owned);
  }
}

view.coinButton.addEventListener("click", () => {
  state.credits += 1;
  spawnFloater(view.coinSlot);
  render();
});

for (const machine of MACHINES) {
  const row = view.machineRows.get(machine.id)!;
  row.buy.addEventListener("click", () => {
    purchase(state, machine);
    render();
  });
}

render();

// Growth runs on requestAnimationFrame but is driven by elapsed *seconds*,
// so income accumulates at the same pace on any display.
function frame(now: number) {
  const elapsedSeconds = (now - state.lastTick) / 1000;
  state.lastTick = now;
  state.credits += productionPerSecond(MACHINES) * elapsedSeconds;
  render();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
