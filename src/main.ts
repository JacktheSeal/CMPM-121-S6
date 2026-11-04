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

// Every machine gets 15% pricier each time one is installed.
const COST_GROWTH = 1.15;

// Machines, one declaration at a time. Each has a base price, the income
// it generates, and how many are installed.
const PONG = {
  cost: 15,
  creditsPerSecond: 0.1,
  owned: 0,
};

const BLASTER = {
  cost: 100,
  creditsPerSecond: 1,
  owned: 0,
};

const STACKER = {
  cost: 1100,
  creditsPerSecond: 8,
  owned: 0,
};

const FIGHTER = {
  cost: 12000,
  creditsPerSecond: 47,
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
  return WALK_IN_RATE +
    PONG.owned * PONG.creditsPerSecond +
    BLASTER.owned * BLASTER.creditsPerSecond +
    STACKER.owned * STACKER.creditsPerSecond +
    FIGHTER.owned * FIGHTER.creditsPerSecond;
}

function render() {
  counter.textContent = `${formatCredits(state.credits)} credits in the till`;
  rate.textContent = `+${formatCredits(productionPerSecond())} credits/s`;

  // One bespoke block per machine: current price (base price times the
  // growth factor for every installed copy), install count, and
  // affordability.
  const pongPrice = PONG.cost * Math.pow(COST_GROWTH, PONG.owned);
  pongBuy.textContent = `${formatCredits(pongPrice)} credits`;
  pongBuy.disabled = state.credits < pongPrice;
  pongMeta.textContent = `x${PONG.owned} installed · +${
    formatCredits(PONG.creditsPerSecond)
  } credits/s each`;

  const blasterPrice = BLASTER.cost * Math.pow(COST_GROWTH, BLASTER.owned);
  blasterBuy.textContent = `${formatCredits(blasterPrice)} credits`;
  blasterBuy.disabled = state.credits < blasterPrice;
  blasterMeta.textContent = `x${BLASTER.owned} installed · +${
    formatCredits(BLASTER.creditsPerSecond)
  } credits/s each`;

  const stackerPrice = STACKER.cost * Math.pow(COST_GROWTH, STACKER.owned);
  stackerBuy.textContent = `${formatCredits(stackerPrice)} credits`;
  stackerBuy.disabled = state.credits < stackerPrice;
  stackerMeta.textContent = `x${STACKER.owned} installed · +${
    formatCredits(STACKER.creditsPerSecond)
  } credits/s each`;

  const fighterPrice = FIGHTER.cost * Math.pow(COST_GROWTH, FIGHTER.owned);
  fighterBuy.textContent = `${formatCredits(fighterPrice)} credits`;
  fighterBuy.disabled = state.credits < fighterPrice;
  fighterMeta.textContent = `x${FIGHTER.owned} installed · +${
    formatCredits(FIGHTER.creditsPerSecond)
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

// Tabletop Pong row.
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

// Space Blaster row.
const blasterRow = document.createElement("div");
blasterRow.className = "machine";
const blasterInfo = document.createElement("div");
blasterInfo.className = "machine-info";
const blasterName = document.createElement("span");
blasterName.className = "machine-name";
blasterName.textContent = "Space Blaster";
const blasterMeta = document.createElement("span");
blasterMeta.className = "machine-meta";
const blasterBuy = document.createElement("button");
blasterBuy.type = "button";
blasterBuy.className = "buy-button";
blasterInfo.append(blasterName, blasterMeta);
blasterRow.append(blasterInfo, blasterBuy);
machinesSection.append(blasterRow);

// Block Stacker row.
const stackerRow = document.createElement("div");
stackerRow.className = "machine";
const stackerInfo = document.createElement("div");
stackerInfo.className = "machine-info";
const stackerName = document.createElement("span");
stackerName.className = "machine-name";
stackerName.textContent = "Block Stacker";
const stackerMeta = document.createElement("span");
stackerMeta.className = "machine-meta";
const stackerBuy = document.createElement("button");
stackerBuy.type = "button";
stackerBuy.className = "buy-button";
stackerInfo.append(stackerName, stackerMeta);
stackerRow.append(stackerInfo, stackerBuy);
machinesSection.append(stackerRow);

// Fighting Cabinet row.
const fighterRow = document.createElement("div");
fighterRow.className = "machine";
const fighterInfo = document.createElement("div");
fighterInfo.className = "machine-info";
const fighterName = document.createElement("span");
fighterName.className = "machine-name";
fighterName.textContent = "Fighting Cabinet";
const fighterMeta = document.createElement("span");
fighterMeta.className = "machine-meta";
const fighterBuy = document.createElement("button");
fighterBuy.type = "button";
fighterBuy.className = "buy-button";
fighterInfo.append(fighterName, fighterMeta);
fighterRow.append(fighterInfo, fighterBuy);
machinesSection.append(fighterRow);

pongBuy.addEventListener("click", () => {
  const price = PONG.cost * Math.pow(COST_GROWTH, PONG.owned);
  if (state.credits < price) return; // never buy on credit
  state.credits -= price;
  PONG.owned += 1;
  render();
});

blasterBuy.addEventListener("click", () => {
  const price = BLASTER.cost * Math.pow(COST_GROWTH, BLASTER.owned);
  if (state.credits < price) return; // never buy on credit
  state.credits -= price;
  BLASTER.owned += 1;
  render();
});

stackerBuy.addEventListener("click", () => {
  const price = STACKER.cost * Math.pow(COST_GROWTH, STACKER.owned);
  if (state.credits < price) return; // never buy on credit
  state.credits -= price;
  STACKER.owned += 1;
  render();
});

fighterBuy.addEventListener("click", () => {
  const price = FIGHTER.cost * Math.pow(COST_GROWTH, FIGHTER.owned);
  if (state.credits < price) return; // never buy on credit
  state.credits -= price;
  FIGHTER.owned += 1;
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
