export default (sim, times) => {
  const wins = {};
  for (let i = 0; i < times; i++) {
    const winner = sim();
    wins[winner] = (wins[winner] || 0) + 1;
  }
  return wins;
}
