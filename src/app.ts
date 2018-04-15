import Vue from 'vue';

import 'bootstrap-vue/dist/bootstrap-vue.css';
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

import App from './components/faction-app.vue';

Vue.use(Button);
Vue.use(Card);
Vue.use(ListGroup);
Vue.use(Badge);
Vue.use(FormInput);
Vue.use(FormSelect);
Vue.use(InputGroup);
Vue.use(Popover);
Vue.component('faction-app', App);

const app = new Vue({ el: '#app' });
