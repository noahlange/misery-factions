import random from './random';
import Unit from '../models/Unit';
import { IFaction } from '../config/factions';

interface IMessage {
  message: string;
  faction: IFaction | null;
}
const logger = (logs: IMessage[]) => (message: IMessage) => logs.push(message);


export default (rand: any, unit: Unit, others: Unit[], turn: number) => {
  const logs: IMessage[] = [];
  const log = logger(logs);
  const { shuffle, roll } = random(rand);
  const roll10 = roll('1d10');

  const enemies = others.filter(
    s => !s.defeated && s.faction.uid !== unit.faction.uid
  );

  log({
    faction: null,
    message: `=== ${unit.title.toUpperCase()} / TURN ${turn} ===`
  });

  unit.target = enemies
    .slice()
    // attack strongest units first
    .sort((a, b) => b.rank.rp - a.rank.rp)[0];

  if (!unit.target) return;

  // attack!
  let attack = roll10() + unit.faction.attr_dex + unit.faction.skill_force;
  log({
    faction: { image: unit.faction.image },
    message: `- ${unit.title} roll for attack! - ${attack}`
  });

  // defend!
  const defense =
    roll10() + unit.target.faction.attr_agi + unit.target.faction.skill_evade;
  log({
    faction: { image: unit.target.faction.image },
    message: `- ${unit.target.title} roll for defense! - ${defense}`
  });

  const hits = [];

  if (attack > defense) {
    while (attack > defense) {
      hits.push(roll(unit.rank.damage)());
      attack -= unit.rank.success;
    }
    log({
      faction: { image: unit.faction.image },
      message: `- ${unit.title} hit ${unit.target.title} x${hits.length}!`
    });
  } else {
    log({
      faction: { image: unit.faction.image },
      message: `- ${unit.title} miss ${unit.target.title}!`
    });
  }

  while (hits.length) {
    const hit = hits.pop();
    const dam = Math.max(hit - unit.target.rank.resist_force, 0);
    if (dam > 0) {
      log({
        faction: { image: unit.target.faction.image },
        message: `  - ${unit.target.title} take ${dam} damage!`
      });
      unit.target.hit.force(dam);
    } else {
      log({
        faction: { image: unit.target.faction.image },
        message: `  - ${unit.target.title} resist ${hit} damage!`
      });
    }
    if (unit.target.defeated) {
      break;
    }
  }

  if (unit.target.defeated) {
  
    log({
      faction: { image: unit.target.faction.image },
      message: `    - ${unit.target.title} have been defeated!`
    });
  
    const hit = roll(unit.target.rank.damage)();
  
    for (const enemy of enemies) {
      if (!enemy.defeated) {
        const resolute = enemy.faction.resolute;
        const resist = resolute
          ? hit
          : resolute === false 
            ? 0
            : enemy.rank.resist_morale;
    
        const dam = Math.max(hit - resist, 0);

        if (dam > 0) {
          log({
            faction: { image: enemy.faction.image },
            message: `      - ${enemy.title} take ${dam} Morale damage!`
          });
          enemy.hit.morale(dam);
          if (enemy.defeated) {
            log({
              faction: { image: enemy.faction.image },
              message: `        - ${enemy.title} have fled!`
            });
          }
        } else {
          log({
            faction: { image: enemy.faction.image },
            message: `      - ${enemy.title} resist ${hit} Morale damage!`
          });
        }
      }
    }
  }
  return logs;
};
