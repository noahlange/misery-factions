import Unit from '../models/Unit';

export default (units: Unit[]) => {
  const teams: { [key: string]: number } = {};
  for (const unit of units) {
    const uid = unit.faction.uid;
    if (teams[uid]) {
      teams[uid] += unit.defeated ? 0 : 1;
    } else {
      teams[uid] = unit.defeated ? 0 : 1;
    }
  }

  if (Object.keys(teams).length <= 1) {
    throw new Error('One or no teams populated with units.');
  }
  return Object.values(teams).some(item => item === 0);
};
