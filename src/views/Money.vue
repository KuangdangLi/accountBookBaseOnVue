<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Tabs :data-source="recordTypeList" class-prefix="type" :value.sync="record.type"></Tabs>
    <FormItem :value.sync="record.notes" title="备注" edit-place-holder="在这里输入备注"></FormItem>
    <FormItem :type="'date'" :value.sync="record.createdAt" title="日期" ></FormItem>
    <Tags  :value.sync="record.tags" :type="record.type"></Tags>
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
import stateHelper from '@/mixins/stateHelper';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

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
  components: {Tabs, FormItem, Tags, Types, NumberPad}
})
export default class Money extends mixins(stateHelper) {
  tags= store.state.tagList;
  record:RecordItem = {type:'-',amount:0,tags:[],notes:''};
  recordList = store.state.recordList;
  recordTypeList = recordTypeList
  reset(){
    this.record = {type:'-',amount:0,tags:[],notes:''};
  }
  saveRecord(){
    if(this.record.tags?.length===0){
      window.alert('请选择标签')
      this.reset()
      return
    }
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
