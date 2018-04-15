import { title } from 'change-case';
import { generate } from 'shortid';
import Faction from './Faction';
import { IRank, Ranks } from '../config/ranks';

interface IHit {
  type: 'morale' | 'force';
  damage: number;
}

export default class Unit {

  public uid: string = generate();
  public hits: IHit[] = [];
  public faction: Faction;
  public rank: IRank;
  public name?: string;
  public target?: Unit;

  public hit = {
    force: (damage: number) => {
      this.hits.push({ type: 'force', damage });
    },
    morale: (damage: number) => {
      this.hits.push({ type: 'morale', damage });
    }
  }

  public reset() {
    this.hits = [];
  }

  get defeated() {
    const damage = this.hits.reduce((a, b) => a + b.damage, 0);
    return damage >= this.rank.rp;
  }

  get fled() {
    const lastHit = this.hits[this.hits.length - 1];
    const lastHitToMorale = lastHit && lastHit.type === 'morale';
    const f = this.hits
      .filter(h => h.type === 'force')
      .reduce((a, b) => a + b.damage, 0);
    const m = this.hits
      .filter(h => h.type === 'morale')
      .reduce((a, b) => a + b.damage, 0);
    const fled = lastHitToMorale
      ? f + m >= this.rank.rp && f < this.rank.rp
      : false;
    return fled;
  }

  get remainder() {
    return (
      this.rank.rp -
      this.hits
        .filter(h => h.type === 'force')
        .reduce((a, b) => a + b.damage, 0)
    );
  }

  get title() {
    return this.name || title(`${this.rank.name} ${this.faction.name}`);
  }

  public constructor(faction: Faction, rank: IRank) {
    this.faction = faction;
    this.rank = rank;
  }
};
