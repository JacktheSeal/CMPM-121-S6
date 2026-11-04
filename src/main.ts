// INSERT COIN — an arcade tycoon.
// Insert coins to earn credits, then install machines that earn for you.

// Vite turns this import into a production-safe URL. The `?no-inline`
// query keeps the small asset as its own hashed file so it can be
// inspected as a separate network request.
// @deno-types="./asset-url.d.ts"
import cabinetUrl from "./assets/cabinet.svg?no-inline";

import "./style.css";

const app = document.querySelector<HTMLElement>("#app")!;

// Spare change from walk-in customers: the arcade earns a little even
// before any machines are installed.
const WALK_IN_RATE = 0.25; // credits per second

// The whole game world: how many credits are sitting in the till.
const state = {
  credits: 0,
  lastTick: performance.now(),
};

/* ---- header ---- */

const header = document.createElement("header");
header.className = "site-header";

const cabinet = document.createElement("img");
cabinet.src = cabinetUrl;
cabinet.alt = "An arcade cabinet with a glowing screen and a coin slot";
cabinet.className = "cabinet";

const title = document.createElement("h1");
title.textContent = "INSERT COIN";

const subtitle = document.createElement("p");
subtitle.className = "subtitle";
subtitle.textContent =
  "Feed the machines. Build an empire, one quarter at a time.";

header.append(cabinet, title, subtitle);

/* ---- money display ---- */

const counter = document.createElement("p");
counter.className = "quarters";

const rate = document.createElement("p");
rate.className = "rate";

function formatCredits(amount: number): string {
  // One decimal keeps slow growth visible; large totals go compact.
  if (amount < 1000) {
    return amount.toFixed(1);
  }
  const units = ["K", "M", "B", "T"] as const;
  let value = amount;
  let unitIndex = -1;
  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex += 1;
  }
  return `${value.toFixed(2)}${units[unitIndex]}`;
}

function render() {
  counter.textContent = `${formatCredits(state.credits)} credits in the till`;
  rate.textContent = `+${formatCredits(WALK_IN_RATE)} credits/s from walk-ins`;
}

/* ---- coin button ---- */

const coinSlot = document.createElement("div");
coinSlot.className = "coin-slot";

const coinButton = document.createElement("button");
coinButton.type = "button";
coinButton.className = "coin-button";
coinButton.textContent = "INSERT COIN";
coinButton.setAttribute("aria-label", "Insert a coin to earn one credit");

coinButton.addEventListener("click", () => {
  state.credits += 1;

  // A little "+1" floats off the button to make each click register.
  const floater = document.createElement("span");
  floater.className = "floater";
  floater.textContent = "+1";
  floater.addEventListener("animationend", () => floater.remove());
  coinSlot.append(floater);

  render();
});

coinSlot.append(coinButton);

app.append(header, counter, coinSlot, rate);
render();

// Growth runs on requestAnimationFrame but is driven by elapsed *seconds*,
// so income accumulates at the same pace on any display.
function frame(now: number) {
  const elapsedSeconds = (now - state.lastTick) / 1000;
  state.lastTick = now;
  state.credits += WALK_IN_RATE * elapsedSeconds;
  render();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
