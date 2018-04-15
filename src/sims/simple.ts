import random from '../lib/random';
import Unit from '../models/Unit';
import { FACTIONS } from '../config';
import Faction from '../models/Faction';

export default (rand: any, squads: Unit[]) => {
  const { roll } = random(rand);
  const logs = [];
  const roll10 = roll('1d10');
  const teams: { [key: string]: number; } = {};
  const sizes: { [key: string]: number; } = {};
  const facts: { [key: string]: Faction; } = {};
  const rolls = {};
  let w;

  for (let index = 0; index < squads.length; index++) {
    const squad = squads[index];
    const uid = squad.faction.uid;
    teams[uid] = (teams[uid] || 0) + squad.rank.rp;
    sizes[uid] = (sizes[uid] || 0) + 1;
    facts[uid] = squad.faction;
  }

  for (const team in teams) {
    // main roll
    const roll = roll10();
    const faction = facts[team];

    const r = roll
      + teams[team]
      + sizes[team]
      + faction.level;

    const current = [team, r];
    const size = sizes[team];
    const points = teams[team];

    logs.push({
      faction,
      message: `${faction.name} (level ${
        faction.level
      }, ${size} unit(s) of ${points} RP) roll ${r}.`
    });
    w = w ? (r > w[1] ? current : w) : current;
  }

  if (w) {
    const victor = facts[w[0]] as Faction;
    return {
      victor,
      log: [
        logs,
        [
          { faction: null, message: '=== RESULTS ===' },
          {
            faction: { image: victor.image },
            message: `${victor.name} are victorious!`
          }
        ]
      ]
    };
  }

  return {
    victor: null,
    log: []
  }
};
