import 'bootstrap-vue/dist/bootstrap-vue.css';

import Vue from 'vue/dist/vue.min.js';
import {
  Badge,
  Button,
  Card,
  FormInput,
  FormSelect,
  InputGroup,
  ListGroup,
  Popover
} from 'bootstrap-vue/es/components';

import random from 'random-seed';
import Squad from './lib/Squad';
import { FACTIONS, RANKS } from './config';
import { complex, simple } from './sims';

Vue.use(Button)
  .use(Card)
  .use(ListGroup)
  .use(Badge)
  .use(FormInput)
  .use(FormSelect)
  .use(InputGroup)
  .use(Popover);

const rand = random.create('misery');

const app = new Vue({
  el: '#app',
  methods: {
    clear() {
      this.results.log = [];
      this.results.empty = true;
    },
    toggle(faction) {
      faction.edit = !faction.edit;
    },
    addSquad(faction) {
      faction.squads.push(
        new Squad({
          ...faction.data,
          ...RANKS.ROOKIE,
          id: faction.id
        })
      );
    },
    removeSquad(faction, squad) {
      faction.squads.splice(faction.squads.indexOf(squad), 1);
    },
    updateFaction(faction, name) {
      const data = Object.values(FACTIONS).find(f => f.faction === name);
      faction.data = data;
      faction.squads = faction.squads.map(s => Object.assign(s, data));
    },
    updateRank(squad, rank) {
      const data = Object.values(RANKS).find(r => r.rank === rank);
      Object.assign(squad, data);
    },
    resolve(results, factions, fast = false) {
      const squads = factions
        .map(f => f.squads)
        .reduce((a, b) => a.concat(b), []);
      const res = (fast ? simple : complex)(rand, squads);
      Object.assign(results, res, { empty: false });
    }
  },
  data: {
    results: {
      empty: true,
      log: []
    },
    all_factions: Object.values(FACTIONS).map(f => f.faction),
    ranks: Object.values(RANKS).map(r => r.rank),
    factions: [
      {
        id: 0,
        name: 'Duty',
        edit: false,
        data: FACTIONS.DUTY,
        squads: [new Squad({ id: 0, ...FACTIONS.DUTY, ...RANKS.ROOKIE })]
      },
      {
        id: 1,
        name: 'Freedom',
        edit: false,
        data: FACTIONS.FREEDOM,
        squads: [new Squad({ id: 1, ...FACTIONS.FREEDOM, ...RANKS.ROOKIE })]
      }
    ]
  }
});
