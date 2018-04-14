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
    // attack strongest units first
    .sort((a, b) => b.rp - a.rp)[0];

  if (!squad.target) return;

  // attack!
  let attack = roll10() + squad.attr_dex + squad.skill_force;
  log(`- ${squad.title} roll for attack! - ${attack}`);

  // defend!
  const defense = roll10() + squad.target.attr_agi + squad.target.skill_evade;
  log(`- ${squad.target.title} roll for defense! - ${defense}`);

  const hits = [];

  if (attack > defense) {
    while (attack > defense) {
      hits.push(roll(rand, squad.damage)());
      attack -= squad.success;
    }
    log(`- ${squad.title} hit ${squad.target.title} x${hits.length}!`);
  } else {
    log(`- ${ squad.title } miss ${ squad.target.title}!`);
  }

  while (hits.length) {
    const hit = hits.pop();
    const dam = Math.max(hit - squad.target.resist_force, 0);
    if (dam > 0) {
      log(` - ${ squad.target.title } take ${ dam } damage!`);
      squad.target.hit.force(dam);
    } else {
      log(` - ${squad.target.title } resist ${ hit } damage!`);
    }
    if (squad.target.defeated) {
      break;
    }
  }

  if (squad.target.defeated) {
    log(` - ${squad.target.title} have been defeated!`);
    const hit = roll(rand, squad.target.damage)();
    for (const enemy of enemies) {
      if (!enemy.defeated) {
        const dam = Math.max(hit - enemy.resist_morale, 0);
        if (dam > 0) {
          log(`   - ${ enemy.title } take ${ dam } Morale damage!`);
        } else {
          log(`   - ${ enemy.title } resist ${ hit } Morale damage!`);
        }
        enemy.hit.morale(dam);
        if (enemy.defeated) {
          log(`    - ${enemy.title} have fled!`);
        }
      }
    }
  }

  return logs;
};
