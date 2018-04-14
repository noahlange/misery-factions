import victorExists from '../lib/victorExists';
import takeTurn from '../lib/takeTurn';
import random from '../lib/random';
import { title } from 'change-case';

export default (rand, squads, n) => {
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
      log.push(takeTurn(
        rand,
        curr,
        s.filter(f => f !== curr),
        turn - skipped,
        false
      ));
    } else {
      skipped++;
      continue turns;
    }
  }
  
  const victor = s.find(t => !t.defeated).faction;
  log.push([ '== RESULTS ==', title(victor) + ' are victorious!' ]);

  const postmatch = [];

  for (const squad of s.sort((a, b) => a.id - b.id)) {
    if (squad.fled) {
      postmatch.push(`- ${ squad.title } fled, survived with ${ squad.remainder } RP.`);
    } else if (squad.defeated) {
      postmatch.push(`- ${ squad.title } defeated.`);
    } else {
      postmatch.push(`- ${ squad.title } survived with ${ squad.remainder } RP.`)
    }
    squad.reset();
  }

  log.push(postmatch);
  return { victor, log };
}