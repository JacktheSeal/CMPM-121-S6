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

// The first machine: a tabletop Pong cabinet.
const PONG = {
  cost: 15,
  creditsPerSecond: 0.1,
  owned: 0,
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

function productionPerSecond(): number {
  return WALK_IN_RATE + PONG.owned * PONG.creditsPerSecond;
}

function render() {
  counter.textContent = `${formatCredits(state.credits)} credits in the till`;
  rate.textContent = `+${formatCredits(productionPerSecond())} credits/s`;

  // Machine row: current price, install count, and affordability.
  pongBuy.textContent = `${formatCredits(PONG.cost)} credits`;
  pongBuy.disabled = state.credits < PONG.cost;
  pongMeta.textContent = `x${PONG.owned} installed · +${
    formatCredits(PONG.creditsPerSecond)
  } credits/s each`;
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

/* ---- machines ---- */

const machinesSection = document.createElement("section");
machinesSection.className = "machines";

const machinesHeading = document.createElement("h2");
machinesHeading.textContent = "Machines";

const pongRow = document.createElement("div");
pongRow.className = "machine";
const pongInfo = document.createElement("div");
pongInfo.className = "machine-info";
const pongName = document.createElement("span");
pongName.className = "machine-name";
pongName.textContent = "Tabletop Pong";
const pongMeta = document.createElement("span");
pongMeta.className = "machine-meta";
const pongBuy = document.createElement("button");
pongBuy.type = "button";
pongBuy.className = "buy-button";

pongInfo.append(pongName, pongMeta);
pongRow.append(pongInfo, pongBuy);
machinesSection.append(machinesHeading, pongRow);

pongBuy.addEventListener("click", () => {
  if (state.credits < PONG.cost) return; // never buy on credit
  state.credits -= PONG.cost;
  PONG.owned += 1;
  render();
});

app.append(header, counter, coinSlot, rate, machinesSection);
render();

// Growth runs on requestAnimationFrame but is driven by elapsed *seconds*,
// so income accumulates at the same pace on any display.
function frame(now: number) {
  const elapsedSeconds = (now - state.lastTick) / 1000;
  state.lastTick = now;
  state.credits += productionPerSecond() * elapsedSeconds;
  render();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
