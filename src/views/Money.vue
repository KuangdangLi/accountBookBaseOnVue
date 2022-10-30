<template>
  <Layout class-prefix="layout">
    {{recordList}}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Types :value.sync="record.type"></Types>
    <Notes :value.sync="record.notes"></Notes>
    <Tags :data-source.sync="tags" :value.sync="record.tags" ></Tags>
    {{record}}
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import recordListModel from '@/model/recordListModel';

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
const recordList:RecordItem[] = recordListModel.fetch()



@Component({
  components: {Tags, Types, Notes, NumberPad}
})
export default class Money extends Vue {
  tags= ['衣','食','住','行'];
  record:RecordItem = {type:'-',amount:0,tags:[],notes:''};
  recordList:RecordItem[] = recordList;
  reset(){
    this.record = {type:'-',amount:0,tags:[],notes:''};
  }
  saveRecord(){
    this.record.createdAt = new Date();
    const newRecord = recordListModel.clone(this.record);
    this.recordList.push(newRecord)
    recordListModel.save(this.recordList)
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
