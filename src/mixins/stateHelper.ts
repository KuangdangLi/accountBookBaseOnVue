import Vue from 'vue'
import Component from 'vue-class-component';
import store from '@/store';

const errorMap:{[key:string]:string} = {
  'duplicate Tag name' : '标签名重复',
  'the tag name is too long': '标签名过长',
}

@Component
export class stateHelper extends Vue {
  beforeCreate(){
    store.commit('fetchTags')
    store.commit('fetchRecords')
  }
  createTag(){
    const name = window.prompt('请输入标签名')
    store.commit('createTag',name)
    if(store.state.createTagError){window.alert(errorMap[store.state.createTagError.message])}
  }
}

export default stateHelper;