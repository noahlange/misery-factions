export enum Factions {
  LONERS = 'Loners',
  CLEAR_SKY = 'Clear Sky',
  BANDITS = 'Bandits',
  RENEGADES = 'Renegades',
  DUTY = 'Duty',
  ECOLOGISTS = 'Ecologists',
  FREEDOM = 'Freedom',
  MERCENARIES = 'Mercenaries',
  MILITARY = 'Military',
  MONOLITH = 'Monolith',
  SPETSNAZ = 'Spetsnaz'
}

export interface IFaction {
  level?: number;
  image?: string;
  description?: string;
  attr_dex?: number;
  attr_agi?: number;
  skill_force?: number;
  skill_evade?: number;
  resolute?: boolean
}

const factions: {
  [key in Factions]: IFaction
} = {
  [Factions.LONERS]: {
    level: 1,
    image: 'loners.png',
    description: `Stalkers unaligned with one of the Zone's major factions.`,
    attr_dex: 0,
    attr_agi: 2,
    skill_force: 2,
    skill_evade: 2
  },
  [Factions.CLEAR_SKY]: {
    image: 'clear-sky.png',
    description: `A scientific faction dedicated to learning about the Zone. Uninterested in playing politics, but much more willing than the Ecologists to get their hands dirty.`,
    level: 1,
    attr_dex: 1,
    attr_agi: 2,
    skill_force: 2,
    skill_evade: 2
  },
  [Factions.BANDITS]: {
    image: 'bandits.png',
    description: `Little more than petty thieves and thugs, Bandits are poorly-trained and will flee at the first signs of actual danger. On poor terms with virtually every faction in the Zone except Freedom, who regard them with disdain, but not outright hostility.`,
    level: 1,
    attr_dex: -1,
    attr_agi: 3,
    skill_force: 1,
    skill_evade: 2,
    resolute: false
  },
  [Factions.RENEGADES]: {
    image: 'renegades.png',
    description: `Outcasts and rejects from more organized bandit factions. Mostly active in the Great Swamp and notoriously incompetent.`,
    level: 1,
    attr_dex: -2,
    attr_agi: 2,
    skill_force: 1,
    skill_evade: 1,
    resolute: false,
  },
  [Factions.DUTY]: {
    image: 'duty.png',
    description: `Founded by survivors of the initial military incursions into the Zone, Duty are committed to the Zone's containment at all costs. Will fight Freedom for borscht.`,
    level: 2,
    attr_dex: 2,
    attr_agi: -1,
    skill_force: 6,
    skill_evade: 2
  },
  [Factions.ECOLOGISTS]: {
    image: 'ecologists.png',
    description: `Stalkers from government-sponsored research organizations; neutral to the other factions' squabbling, but armed and armored in case of anomalies and/or mutants.`,
    level: 2,
    attr_dex: 0,
    attr_agi: 0,
    skill_force: 2,
    skill_evade: 4
  },
  [Factions.FREEDOM]: {
    image: 'freedom.png',
    description: `With the intent of securing free access to the Zone and the sharing of its secrets, Freedom frequently finds itself at odds with the likes of Duty and the Ukrainian military.`,
    level: 2,
    attr_dex: 0,
    attr_agi: 3,
    skill_force: 3,
    skill_evade: 6
  },
  [Factions.MERCENARIES]: {
    image: 'mercenaries.png',
    description: `Private paramilitary contractors operating within the Zone. Well-equipped and ruthlessly efficient.`,
    level: 3,
    attr_dex: 3,
    attr_agi: 1,
    skill_force: 6,
    skill_evade: 1
  },
  [Factions.MILITARY]: {
    image: 'military.png',
    description: `Soldiers of the Ukrainian military, present in the Zone to keep up pretenses of governmental authority.`,
    level: 2,
    attr_dex: 2,
    attr_agi: 0,
    skill_force: 7,
    skill_evade: 2
  },
  [Factions.MONOLITH]: {
    image: 'monolith.png',
    description: `A fanatical, pseudo-religious sect hostile to everything and everyone in the Zone. Surrender is not an option for the Monolith; they will fight to the death.`,
    level: 4,
    attr_dex: 3,
    attr_agi: -1,
    skill_force: 8,
    skill_evade: 3,
    resolute: true
  },
  [Factions.SPETSNAZ]: {
    image: 'spetsnaz.png',
    description: `Special forces of the Russian government operating within the Zone. Suspected to be the vanguard for an eventual incursion by Russian armed forces.`,
    level: 4,
    attr_dex: 3,
    attr_agi: 0,
    skill_force: 7,
    skill_evade: 4,
    resolute: true
  }
};

export default factions;