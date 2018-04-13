import { title } from 'change-case';

export default class Squad {
  reset() {
    this.hits = [];
  }

  get defeated() {
    const damage = this.hits.reduce((a, b) => a + b.damage, 0);
    return damage >= this.rp;
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
    return lastHitToMorale && f + m >= this.rp && f < this.rp;
  }

  get remainder() {
    return (
      this.rp -
      this.hits
        .filter(h => h.type === 'force')
        .reduce((a, b) => a + b.damage, 0)
    );
  }

  get title() {
    return this.name || title(`${this.faction} ${this.rank}`);
  }

  constructor(config) {
    this.hits = [];
    this.hit = {
      force: damage => {
        this.hits.push({ type: 'force', damage });
      },
      morale: damage => {
        // one hit for normies
        if (!this.resolute) {
          this.hits.push({
            type: 'morale',
            damage: this.resolute === false ? damage * 2 : damage
          });
        }
      }
    };
    Object.assign(this, config);
  }
};
