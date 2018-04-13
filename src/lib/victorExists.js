export default squads => {
  const teams = {};
  let index = squads.length - 1;
  while (index >= 0) {
    const squad = squads[index];
    if (!squad.defeated) {
      teams[squad.id] = (teams[squad.id] || 0) + 1;
    } else {
      teams[squad.id] = (teams[squad.id] || 0);
    }
    index--;
  }
  if (Object.keys(teams).length <= 1) {
    throw new Error('One or no teams populated with units.');
  }
  return Object.values(teams).some(item => item === 0);
};