export function formatCredits(amount: number): string {
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
