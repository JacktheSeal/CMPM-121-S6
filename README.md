# INSERT COIN

An arcade tycoon: an incremental game where you insert coins to earn
credits, then install arcade cabinets that earn for you while you wait.
Built for CMPM 121 D1 following the recommended Cookie Clicker-style
build sequence.

## Play

Open the deployed site, or run it locally:

```
deno task dev
```

Click INSERT COIN to drop a coin in the till. Every click earns one
credit; walk-in customers provide a small baseline income; machines you
install earn credits every second. Each machine gets 15% pricier per
installed copy, so income comes from a growing fleet, not from spamming
one purchase.

## How it fits together

- `src/machines.ts` — machine data. Adding a machine is one entry here;
  the shop, the view, and the income loop pick it up automatically.
- `src/engine.ts` — game state and pure simulation: machine costs,
  purchases, production. No DOM or rendering knowledge.
- `src/render.ts` — builds the whole view once from the data and hands
  back the nodes the wiring needs to update.
- `src/format.ts` — number formatting for the UI.
- `src/main.ts` — wiring only: event handlers and the
  requestAnimationFrame loop, driven by elapsed seconds.

## Checks

```
deno task ci
```

Runs formatting, lint, type checks, and a production build. Commits run
the same checks through a pre-commit hook.

## Credits

Tooling adapted from the [CMPM 121 Fall 2026 S01 starter](https://github.com/ucsc-cmpm-121-f26/s01-starter/tree/8974888efb6537be82e8eb069db139ea885039da), which has no explicit repository license. No new license is assigned to that material. The D1 scaffold and original SVG were authored with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.
