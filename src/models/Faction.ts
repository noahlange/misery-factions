import Unit from './Unit';
import { generate } from 'shortid';
import FACTIONS, { IFaction, Factions } from '../config/factions';
import RANKS, { Ranks } from '../config/ranks';

export default class Faction implements IFaction {

  public static from(name: Factions) {
    const faction = FACTIONS[name];
    const f = new Faction();
    f.update(name);
    f.squads.push(
      new Unit(f, RANKS[Ranks.ROOKIE])
    );
    return f;
  }

  public uid: string = generate();
  public name: string | null = null;
  public edit: boolean = false
  public squads: Unit[] = [];

  
  public level: number = 1;
  public resolute?: boolean = undefined;
  public image?: string = undefined;
  public description?: string = undefined;
  public attr_dex?: number = undefined;
  public attr_agi?: number = undefined;
  public skill_force?: number = undefined;
  public skill_evade?: number = undefined;

  public addSquad() {
    this.squads.push(
      new Unit(this, RANKS[Ranks.ROOKIE])
    );
  }

  public toggle() {
    this.edit = !this.edit;
  }

  public removeSquad(squad: Unit) {
    this.squads.splice(this.squads.indexOf(squad), 1);
  }

  public update(name: Factions) {
    Object.assign(this, FACTIONS[name], { name });
  }

  public updateSquadRank(squad: Unit, rank: Ranks) {
    squad.rank = RANKS[rank];
  }
}
