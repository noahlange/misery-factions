export default {
  LONERS: {
    level: 1,
    faction: 'Loners',
    faction_image: 'loners.png',
    faction_description: `Stalkers unaligned with one of the Zone's major factions.`,
    attr_dex: 0,
    attr_agi: 2,
    skill_force: 2,
    skill_evade: 2
  },
  CLEAR_SKY: {
    faction: 'Clear Sky',
    faction_image: 'clear-sky.png',
    faction_description: `A scientific faction dedicated to learning about the Zone. Uninterested in playing politics, but much more willing than the Ecologists to get their hands dirty.`,
    level: 1,
    attr_dex: 1,
    attr_agi: 2,
    skill_force: 2,
    skill_evade: 2
  },
  BANDITS: {
    faction: 'Bandits',
    faction_image: 'bandits.png',
    faction_description: `Little more than petty thieves and thugs, Bandits are poorly-trained and will flee at the first signs of actual danger. On poor terms with virtually every faction in the Zone except Freedom, who regard them with disdain, but not outright hostility.`,
    level: 1,
    attr_dex: -1,
    attr_agi: 3,
    skill_force: 1,
    skill_evade: 2,
    resolute: false
  },
  RENEGADES: {
    faction: 'Renegades',
    faction_image: 'renegades.png',
    faction_description: `Outcasts and rejects from more organized bandit factions. Mostly active in the Great Swamp and notoriously incompetent.`,
    level: 1,
    attr_dex: -2,
    attr_agi: 2,
    skill_force: 1,
    skill_evade: 1,
    resolute: false,
  },
  DUTY: {
    faction: 'Duty',
    faction_image: 'duty.png',
    faction_description: `Founded by survivors of the initial military incursions into the Zone, Duty are committed to the Zone's containment at all costs. Will fight Freedom for borscht.`,
    level: 2,
    attr_dex: 2,
    attr_agi: -1,
    skill_force: 6,
    skill_evade: 2
  },
  ECOLOGISTS: {
    faction: 'Ecologists',
    faction_image: 'ecologists.png',
    faction_description: `Stalkers from government-sponsored research organizations; neutral to the other factions' squabbling, but armed and armored in case of anomalies and/or mutants.`,
    level: 2,
    attr_dex: 0,
    attr_agi: 0,
    skill_force: 2,
    skill_evade: 4
  },
  FREEDOM: {
    level: 2,
    faction: 'Freedom',
    faction_image: 'freedom.png',
    faction_description: `With the intent of securing free access to the Zone and the sharing of its secrets, Freedom frequently finds itself at odds with the likes of Duty and the Ukrainian military.`,
    attr_dex: 0,
    attr_agi: 3,
    skill_force: 3,
    skill_evade: 6
  },
  MERCENARIES: {
    faction: 'Mercenaries',
    faction_image: 'mercenaries.png',
    faction_description: `Private paramilitary contractors operating within the Zone. Well-equipped and ruthlessly efficient.`,
    level: 3,
    attr_dex: 3,
    attr_agi: 1,
    skill_force: 6,
    skill_evade: 1
  },
  MILITARY: {
    faction: 'Military',
    faction_image: 'military.png',
    faction_description: `Soldiers of the Ukrainian military, present in the Zone to keep up pretenses of governmental authority.`,
    level: 2,
    attr_dex: 2,
    attr_agi: 0,
    skill_force: 7,
    skill_evade: 2
  },
  MONOLITH: {
    faction: 'Monolith',
    faction_description: `A fanatical, pseudo-religious sect hostile to everything and everyone in the Zone. Surrender is not an option for the Monolith; they will fight to the death.`,
    level: 4,
    attr_dex: 3,
    attr_agi: -1,
    skill_force: 8,
    skill_evade: 3,
    resolute: true
  },
  SPETSNAZ: {
    faction: 'Spetsnaz',
    faction_image: 'spetsnaz.png',
    faction_description: `Special forces of the Russian government operating within the Zone. Suspected to be the vanguard for an eventual incursion by Russian forces.`,
    level: 4,
    attr_dex: 3,
    attr_agi: 0,
    skill_force: 7,
    skill_evade: 4,
    resolute: true
  }
};