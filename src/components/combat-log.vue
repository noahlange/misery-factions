<template>
  <b-card no-body v-if="!empty">
    <b-card-header>
      <h4 class="mb-0">
        Combat log
        <b-button
          :variant="'dark'"
          @click="clear"
          class="float-right"
        >
          Clear
        </b-button>
      </h4>
    </b-card-header>
    <b-card-body style="max-height: 20rem; overflow-y: scroll;">
      <ul class="combat-log mb-4 list-unstyled">
        <li class="mb-4" v-for="(turn, index) in log" :key="index">
          <div class="d-flex mb-1" v-for="(msg, index) in turn" :key="index">
            <img
              v-if="msg.faction"
              class="faction-patch mr-2"
              :src="'images/' + msg.faction.image"
            />
            <div v-html="msg.message"></div>
          </div>
        </li> 
      </ul>
    </b-card-body>
  </b-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CombatLog extends Vue {
  @Prop()
  public log?: any[];
  @Prop()
  public clear?: Function;

  public get empty() {
    return (this.log || []).length === 0;
  }
}
</script>