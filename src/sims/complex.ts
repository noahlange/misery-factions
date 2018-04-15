import victorExists from '../lib/victorExists';
import takeTurn from '../lib/takeTurn';
import random from '../lib/random';
import { title } from 'change-case';
import Unit from '../models/Unit';
import Faction from '../models/Faction';

export default (rand: any, squads: Unit[]) => {
  const { shuffle } = random(rand);
  const s = shuffle(squads.slice());
  let turn = 0;
  let skipped = 0;
  let log = [];

  // while we don't have a victor...
  turns: while (!victorExists(s)) {
    // pluck the current squad and...
    const curr = s[turn % s.length];
    turn++;
    if (!curr.defeated) {
      // run a turn if the squad is still kicking
      const logs = takeTurn(rand, curr, s.filter(f => f !== curr), turn - skipped);
      log.push(logs);
    } else {
      skipped++;
      continue turns;
    }
  }

  const undefeated = s.find(t => !t.defeated);
  if (!undefeated) {
    return { victor: null, log: [] };
  }

  const victor: Faction = undefeated.faction;
  log.push([
    { faction: null, message: '=== RESULTS ===' },
    { faction: { image: victor.image }, message: title(victor.name || '') + ' are victorious!' }
  ]);

  const postmatch = [];

  for (const squad of s.sort((a, b) => a.faction.uid.localeCompare(b.faction.uid))) {
    if (squad.fled) {
      postmatch.push({
        faction: { image: squad.faction.image },
        message: `- ${squad.title} fled, survived with ${squad.remainder} RP.`
      });
    } else if (squad.defeated) {
      postmatch.push({
        faction: { image: squad.faction.image },
        message: `- ${squad.title} defeated.`
      });
    } else {
      postmatch.push({
        faction: { image: squad.faction.image },
        message: `- ${squad.title} survived with ${squad.remainder} RP.`
      });
    }
    squad.reset();
  }

  log.push(postmatch);
  return { victor, log };
};
