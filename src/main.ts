// INSERT COIN — an arcade tycoon.
// Insert coins to earn credits, then install machines that earn for you.

// Vite turns this import into a production-safe URL. The `?no-inline`
// query keeps the small asset as its own hashed file so it can be
// inspected as a separate network request.
// @deno-types="./asset-url.d.ts"
import cabinetUrl from "./assets/cabinet.svg?no-inline";

import "./style.css";

const app = document.querySelector<HTMLElement>("#app")!;

// The whole game world: how many credits are sitting in the till.
const state = {
  credits: 0,
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

function render() {
  counter.textContent = `${Math.floor(state.credits)} credits in the till`;
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

app.append(header, counter, coinSlot);
render();
