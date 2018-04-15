<template>
<div>
  <div class="container mt-5">
    <div class="row">
      <div class="col">
        <h1>
          faction skirmish resolver
          <b-button
            class="float-right ml-2"
            @click="resolve(true)"
            variant="outline-danger"
          >
            fight quickly!
          </b-button>
          <b-button
            class="float-right"
            @click="resolve(false)"
            variant="danger"
          >
            fight accurately!
          </b-button>
        </h1>
        <hr />
        <div style="column-count: 2;">
          <p>This is a <em>very</em> work-in-progress playtesting program for an RPG I'm working on. It's a simulation of an adaptation of a skirmish ruleset written for character combat, adjusted to model faction-level conflict.</p>
          <p>I hope to fine-tune the "fast resolve" mechanic and provide that as an option alongside the "accurate resolve" sim. You obviously don't need the nitty-gritty action resolution for something happening at the other end of the gameworld, but when it's within spitting distance of the PCs, the granularity is more important.</p>
          <p>This is a good middle ground for close-but-not-too-close conflict, because each unit can be easily broken down into NPCs as needed. </p>
        </div>
      </div>
    </div>
    <hr class="py-1" />
    <div class="row">
      <div class="col">
        <div v-for="faction in factions" :key="faction.uid">
          <faction-card :faction="faction" />
        </div>
      </div>
      <div class="col">
        <combat-log :log="log" :clear="clear" />
      </div>
    </div>
  </div>
  <div class="container">
    <footer class="row">
      <div class="col py-5">
        <p>Code &copy; 2018 Noah Lange. Made with <i class="fa fa-heart-o text-danger"></i> in Madison, WI. <br />
        STALKER, &c., &copy; GSC Game World.</p>
      </div>
    </footer>
  </div>
</div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';
import random from 'random-seed';

import CombatLog from './combat-log.vue';
import FactionCard from './faction-card.vue';

import Faction from '../models/Faction';
import Unit from '../models/Unit';

import { Factions } from '../config/factions';

import simple from '../sims/simple';
import complex from '../sims/complex';

@Component({
  components: { CombatLog, FactionCard }
})
export default class FactionsApp extends Vue {

  public log: {
    faction: Faction;
    message: string;
  }[][] = [];

  public rand = random.create('misery');

  public factions = [
    Faction.from(Factions.LONERS),
    Faction.from(Factions.BANDITS)
  ];

  public clear() {
    this.log = [];
  }

  public resolve(fast = false) {
    const squads = this.factions
      .map(f => f.squads)
      .reduce((a, b) => a.concat(b), []);
    const fn = (fast ? simple : complex) as any;
    const { log, victor } = fn(this.rand, squads);
    this.log = log;
  }
}
</script>