<template>
  <Layout class-prefix="layout">
    {{recordList}}
  <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
  <Types :value.sync="record.type"></Types>
  <Notes @update:value="onUpdateNotes"></Notes>
  <Tags :data-source.sync="tags" @update:value="onUpdateTags" ></Tags>
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

window.localStorage.setItem('recordVersion','0.0.1')
const recordList:Record[] =JSON.parse(window.localStorage.getItem('recordList') || "[]")

type Record = {
  type:string,
  amount:number,
  tags?:string[],
  notes?:string
}

@Component({
 components: {Tags, Types, Notes, NumberPad}
})
export default class Money extends Vue {
  tags= ['衣','食','住','行'];
  record:Record = {type:'-',amount:0,tags:[],notes:''};
  recordList:Record[] = recordList;
  onUpdateNotes(value:string){
    this.record.notes =value
  }
  onUpdateTags(value:string[]){
    this.record.tags = value
  }
  saveRecord(){
    const newRecord =JSON.parse(JSON.stringify(this.record))
    console.log(newRecord);
    recordList.push(newRecord)
    console.log(recordList);
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
