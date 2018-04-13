import { create } from 'random-seed';
import Squad from './Squad';
import { RANKS, FACTIONS } from '../config';
import random from './random';

export default (rand, config) => {
  const { pick, shuffle } = random(rand);
  const factions = Object.keys(config);
  const squads = [];
  for (const faction of factions) {
    let points = config[faction];
    while (points > 0) {
      const ranks = Object.values(RANKS).slice().filter(f => f.rp <= points);
      const rank = pick(ranks);
      const squad = new Squad({ ...FACTIONS[faction], ...rank });
      points -= squad.rp;
      squads.push(squad);
    }
  }
  return squads.sort((a, b) => b.rp - a.rp);
}