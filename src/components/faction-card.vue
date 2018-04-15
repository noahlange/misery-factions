<template>
  <b-card no-body class="mb-2" v-if="faction">

    <b-card-header>
      <h3 class="d-flex mt-2 justify-content-between">
        <span v-if="faction.edit">
          <b-form-select
            class="form-control-lg"
            :options="factions"
            @change="faction.update($event)"
            v-model="faction.name"
            text-field="name"
          />
        </span>
        <span class="faction-name" v-if="!faction.edit">
          {{ faction.name }}
        </span>
        <b-button
          class="float-right"
          :pressed.sync="faction.edit"
          :variant="'outline-primary'"
        >
          <span v-if="faction.edit" class="fa fa-fw fa-save"></span>
          <span v-if="!faction.edit" class="fa fa-fw fa-edit"></span>
        </b-button>
      </h3>
    </b-card-header>

    <b-card-body v-if="faction.edit">
      <b-input-group
        class="mb-2"
        v-for="squad in faction.squads"
        :key="squad.uid"
      >
        <b-form-input v-model="squad.name" type="text" v-bind:placeholder="squad.title"></b-form-input>
        <b-input-group-append>
          <b-form-select
             v-on:change="faction.updateSquadRank(squad, $event)"
             v-model="squad.rank.name"
             text-field="name"
             :options="ranks"
            />
        </b-input-group-append>
        <b-input-group-append>
          <b-button
            :variant="'danger'"
            v-on:click="faction.removeSquad(squad)"
          >
            <i class="fa fa-fw fa-times"></i>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-card-body>

    <b-card-body v-if="!faction.edit">
      <b-list-group>
        <b-list-group-item
          v-for="(squad, index) in faction.squads"
          :key="index"
          class="d-flex justify-content-between align-items-center"
        >
          {{ squad.title }}
          <b-badge :id="'squad-info-' + squad.uid" variant="secondary" pill>
            <i class="fa fa-info"></i>
          </b-badge>
          <b-popover triggers="hover" :target="'squad-info-' + squad.uid">
            <template slot="title">
              <div class="pt-2">
                {{ squad.title }} ({{ squad.rank.rp }} RP)
                <img class="faction-patch" :src="'images/' + squad.faction.image">
              </div>
            </template>
            <p class="mb-1">
              <strong>{{ squad.faction.name }}</strong>: {{ squad.faction.description }}
            </p>
            <p class="mb-1">
              <strong>{{ squad.rank.name }}</strong>: {{ squad.rank.description }}
            </p>
          </b-popover>
        </b-list-group-item>
      </b-list-group>
    </b-card-body>

    <b-card-footer v-if="faction.edit">
      <b-button
        class="float-right"
        @click="faction.addSquad(faction)"
        :variant="'success'"
      >
        <i class="fa fa-fw fa-plus"></i>
      </b-button>
    </b-card-footer>
  </b-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { FACTIONS, RANKS } from '../config/index';
import Faction from '../models/Faction';

@Component
export default class FactionCard extends Vue {
  @Prop()
  public faction?: Faction;
  public factions = Object.keys(FACTIONS);
  public ranks = Object.keys(RANKS);
}
</script>