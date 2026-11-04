// Vite turns this import into a production-safe URL. The `?no-inline`
// query keeps the small asset as its own hashed file so it can be
// inspected as a separate network request.
// @deno-types="./asset-url.d.ts"
import cabinetUrl from "./assets/cabinet.svg?no-inline";

import { MACHINES } from "./machines.ts";
import type { Machine } from "./machines.ts";

export interface MachineRow {
  row: HTMLElement;
  meta: HTMLSpanElement;
  buy: HTMLButtonElement;
}

export interface View {
  counter: HTMLParagraphElement;
  rate: HTMLParagraphElement;
  coinSlot: HTMLDivElement;
  coinButton: HTMLButtonElement;
  machineRows: Map<string, MachineRow>;
}

export function spawnFloater(slot: HTMLElement): void {
  // A little "+1" floats off the button to make each click register.
  const floater = document.createElement("span");
  floater.className = "floater";
  floater.textContent = "+1";
  floater.addEventListener("animationend", () => floater.remove());
  slot.append(floater);
}

function createMachineRow(machine: Machine): MachineRow {
  const row = document.createElement("div");
  row.className = "machine";

  const info = document.createElement("div");
  info.className = "machine-info";

  const name = document.createElement("span");
  name.className = "machine-name";
  name.textContent = machine.name;

  const desc = document.createElement("span");
  desc.className = "machine-desc";
  desc.textContent = machine.description;

  const meta = document.createElement("span");
  meta.className = "machine-meta";

  const buy = document.createElement("button");
  buy.type = "button";
  buy.className = "buy-button";

  info.append(name, desc, meta);
  row.append(info, buy);

  return { row, meta, buy };
}

export function initView(root: HTMLElement): View {
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

  const counter = document.createElement("p");
  counter.className = "quarters";

  const rate = document.createElement("p");
  rate.className = "rate";

  const coinSlot = document.createElement("div");
  coinSlot.className = "coin-slot";

  const coinButton = document.createElement("button");
  coinButton.type = "button";
  coinButton.className = "coin-button";
  coinButton.textContent = "INSERT COIN";
  coinButton.setAttribute("aria-label", "Insert a coin to earn one credit");

  coinSlot.append(coinButton);

  const machinesSection = document.createElement("section");
  machinesSection.className = "machines";

  const machinesHeading = document.createElement("h2");
  machinesHeading.textContent = "Machines";
  machinesSection.append(machinesHeading);

  const machineRows = new Map<string, MachineRow>();
  for (const machine of MACHINES) {
    const machineRow = createMachineRow(machine);
    machineRows.set(machine.id, machineRow);
    machinesSection.append(machineRow.row);
  }

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.textContent =
    "Every machine takes quarters. Every quarter comes back with interest.";

  root.append(header, counter, coinSlot, rate, machinesSection, footer);

  return { counter, rate, coinSlot, coinButton, machineRows };
}
