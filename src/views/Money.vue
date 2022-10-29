<template>
  <Layout class-prefix="layout">
  <NumberPad></NumberPad>
  <Types :value.sync="record.type"></Types>
  <Notes @update:value="onUpdateNotes"></Notes>
  <Tags :data-source.sync="tags" @update:value="onUpdateTags"></Tags>
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
  onUpdateNotes(value:string){
    this.record.notes =value
  }
  onUpdateTags(value:string[]){
    this.record.tags = value
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
