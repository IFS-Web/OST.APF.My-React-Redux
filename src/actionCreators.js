export function resetCount(to) {
  return { type: "RESET", to };
}

export function incrementCount() {
  return { type: "INCREMENT" };
}
