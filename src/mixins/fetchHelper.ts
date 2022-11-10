import Vue from 'vue'
import Component from 'vue-class-component';
import store from '@/store';

@Component
export class fetchHelper extends Vue {
  beforeCreate(){
    store.commit('fetchTags')
    store.commit('fetchRecords')
  }
}

export default fetchHelper;