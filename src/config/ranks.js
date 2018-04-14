export default {
  ROOKIE: {
    rank: 'Rookie',
    rank_description: `Poorly trained and poorly outfitted, Rookies are among the newest arrivals in the Zone. They're also the first to flee when things get rough. One unit consists of four stalkers.`,
    rp: 2,
    success: 4,
    damage: '1d4',
    resist_force: 1,
    resist_resource: 4,
    resist_morale: 1
  },
  EXPERIENCED: {
    rank: 'Experienced',
    rank_description: `Strong enought to hold their own, and smart enough to know when they're outmatched. Experienced stalkers have spent more time in the Zone than most rookies, but don't yet have the skills or funding to be exceptional. One unit consists of four stalkers.`,
    rp: 4,
    success: 4,
    damage: '1d6',
    resist_force: 2,
    resist_resource: 3,
    resist_morale: 2
  },
  VETERAN: {
    rank: 'Veteran',
    rank_description: `Veterans have been around the block — while they might not have the intimate knowledge of the Zone's secrets like other, more senior, stalkers, they're able to handle themselves in a fight. One unit consists of three stalkers.`,
    rp: 6,
    success: 3,
    damage: '2d4',
    resist_force: 3,
    resist_resource: 2,
    resist_morale: 3
  },
  EXPERT: {
    rank: 'Expert',
    rank_description: `Expert-level stalkers have skills and the gear to make those skills shine. One unit consists of three stalkers.`,
    rp: 8,
    success: 3,
    damage: '2d6',
    resist_force: 4,
    resist_resource: 1,
    resist_morale: 4
  },
  MASTER: {
    rank: 'Master',
    rank_description: `Master stalkers have been in the Zone more days than most rookies can count, and they have the gear and skills to show for it. One unit consists of two stalkers.`,
    rp: 10,
    success: 2,
    damage: '3d4',
    resist_force: 5,
    resist_resource: 0,
    resist_morale: 5
  },
  LEGEND: {
    rank: 'Legendary',
    rank_description: `There's great, and then there's the greatest. Legends of the Zone are fearsome opponents, fighting with state-of-the-art weapons and the best exoskeletons the Zone has to offer. One unit consists of two stalkers.`,
    rp: 12,
    success: 2,
    damage: '3d6',
    resist_force: 6,
    resist_resource: -1,
    resist_morale: 6
  }
};
