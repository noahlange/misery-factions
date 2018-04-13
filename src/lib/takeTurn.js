import roll from './roll';
import random from './random';

const logger = logs => message => logs.push(message);

export default (rand, squad, others, turn, verbose) => {

  const logs = [];
  const log = logger(logs);
  const { shuffle } = random(rand);
  const roll10 = roll(rand, '1d10');

  const enemies = others
    .filter(s => !s.defeated && s.id !== squad.id);

  log(`== ${squad.title.toUpperCase()} / TURN ${turn} ===`);

  squad.target = enemies
    .slice()
    // attack healthiest units first
    .sort((a, b) => b.rp - a.rp)
    // first
    .find(i => true);

  if (!squad.target) return;

  // attack!
  let attack = roll10() + squad.attr_dex + squad.skill_force;
  log(`- ${squad.title} rolls for attack! - ${attack}`);

  // defend!
  const defense = roll10() + squad.target.attr_agi + squad.target.skill_evade;
  log(`- ${squad.target.title} rolls for defense! - ${defense}`);

  const hits = [];

  if (attack > defense) {
    while (attack > defense) {
      hits.push(roll(rand, squad.damage)());
      attack -= squad.spread;
    }
    log(`- ${squad.title} hits ${squad.target.title} x${hits.length}!`);
  } else {
    log(`- ${ squad.title } missed ${ squad.target.title}!`);
  }

  while (hits.length) {
    const hit = hits.pop();
    const dam = Math.max(hit - squad.target.resist_force, 0);
    if (dam > 0) {
      log(` - ${ squad.target.title } takes ${ dam } damage!`);
      squad.target.hit.force(dam);
    } else {
      log(` - ${squad.target.title } resists ${ hit } damage!`);
    }
    if (squad.target.defeated) {
      break;
    }
  }

  if (squad.target.defeated) {
    log(`  - ${squad.target.title} has been defeated!`);
    for (const enemy of enemies) {
      const hit = roll(rand, enemy.damage)();
      if (!enemy.defeated) {
        const dam = Math.max(hit - enemy.resist_morale, 0);
        log(`   - ${ enemy.title } takes ${ dam } Morale damage!`);
        enemy.hit.morale(dam);
        if (enemy.defeated) {
          log(`    - ${enemy.title} has fled!`);
        }
      }
    }
  }

  return logs;
};
