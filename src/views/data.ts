import { reactive } from 'vue';
import { sipSizes } from './GongView.vue';

export const data = reactive({
  time: { value: '14:30', name: 'time', type: 'time', icon: '⏰', hidden: false },
  players: { value: 4, name: 'players', type: 'number', icon: '👯', hidden: false },
  type: { value: BoozeType.Beer, name: 'players', type: 'number', icon: '👯', hidden: false },
  beer: { value: 24, name: 'beer', type: 'number', icon: '🍺', hidden: true },
  sip: { value: sipSizes[1], name: 'sip', type: 'select', icon: '🤏', hidden: true }
});
