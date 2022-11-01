<template>
  <Layout class-prefix="layout">
    {{recordList}}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Types :value.sync="record.type"></Types>
    <FormItem :value.sync="record.notes" title="备注" edit-place-holder="在这里输入备注"></FormItem>
    <Tags  :value.sync="record.tags" ></Tags>
    {{record}}
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/FormItem.vue';
import store from "@/store/index"
import {mixins} from 'vue-class-component';
import fetchHelper from '@/mixins/fetchHelper';

const version:string = window.localStorage.getItem('recordVersion') || '0';
// if(version === '0.0.1'){
//   const state = window.localStorage.getItem('recordList')
//   if(state){
//     const newState = JSON.parse(state)
//     newState.forEach((record:RecordItem)=>{record.createdAt = new Date()});
//     window.localStorage.setItem('recordList',JSON.stringify(newState))
//   }
//   window.localStorage.setItem('recordVersion','0.0.2')
// }


@Component({
  components: {FormItem, Tags, Types, NumberPad}
})
export default class Money extends mixins(fetchHelper) {
  tags= store.state.tagList;
  record:RecordItem = {type:'-',amount:0,tags:[],notes:''};
  recordList = store.state.recordList;
  reset(){
    this.record = {type:'-',amount:0,tags:[],notes:''};
  }
  saveRecord(){
    store.commit('createRecord',this.record)
    this.reset()
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
