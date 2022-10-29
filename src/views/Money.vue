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

const version:string = window.localStorage.getItem('recordVersion') || '0';
if(version === '0.0.1'){
    const state = window.localStorage.getItem('recordList')
    if(state){
     const newState = JSON.parse(state)
     newState.forEach((record:Record)=>{record.createdAt = new Date()});
     window.localStorage.setItem('recordList',JSON.stringify(newState))
    }
    window.localStorage.setItem('recordVersion','0.0.2')
}
const recordList:Record[] =JSON.parse(window.localStorage.getItem('recordList') || "[]")

type Record = {
  type:string,
  amount:number,
  tags?:string[],
  notes?:string,
  createdAt?:Date
}

@Component({
 components: {Tags, Types, Notes, NumberPad}
})
export default class Money extends Vue {
  tags= ['衣','食','住','行'];
  record:Record = {type:'-',amount:0,tags:[],notes:''};
  recordList:Record[] = recordList;

  saveRecord(){
    this.record.createdAt = new Date();
    const newRecord =JSON.parse(JSON.stringify(this.record));
    recordList.push(newRecord)
    window.localStorage.setItem('recordList',JSON.stringify(recordList))
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
