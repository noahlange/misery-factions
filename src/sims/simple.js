import roller from '../lib/roll';
import { FACTIONS } from '../config';

export default (rand, squads, n) => {
  const logs = [];
  const roll10 = roller(rand, '1d10');
  const teams = {};
  const sizes = {};
  const facts = {};
  const rolls = {};
  let w;

  for (let index = 0; index < squads.length; index++) {
    const squad = squads[index];
    teams[squad.id] = (teams[squad.id] || 0) + squad.rp;
    sizes[squad.id] = (sizes[squad.id] || 0) + 1;
    facts[squad.id] = {
      faction: squad.faction,
      level: squad.level,
      dex: squad.attr_dex,
      agi: squad.attr_agi,
      attack: squad.skill_force,
      defense: squad.skill_evade
    };
  }

  for (const team in teams) {
    // main roll
    const roll = roll10();
    const r = roll + teams[team] + sizes[team] + facts[team].level;
    const current = [ team, r ];
    const { faction, level } = facts[team];
    const size = sizes[team];
    const points = teams[team];
    logs.push(
      `${ faction } (level ${ level }, ${ size } unit(s) of ${ points } RP) rolls ${ r }.`
    );
    w = w ? r > w[1] ? current : w : current;
  }

  return {
    victor: facts[w[0]],
    log: [
      logs,
      [ `${ facts[w[0]].faction } are victorious!` ]
    ]
  }
}
