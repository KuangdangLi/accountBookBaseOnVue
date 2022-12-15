import Vue from 'vue'
import Component from 'vue-class-component';
import store from '@/store';

// const errorMap:{[key:string]:string} = {
//   'duplicate Tag name' : '标签名重复',
//   'the tag name is too long': '标签名过长',
// }

@Component
export class stateHelper extends Vue {
  beforeCreate(){
    store.commit('fetchTags')
    store.commit('fetchRecords')
  }
}

export default stateHelper;