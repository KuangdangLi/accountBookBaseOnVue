<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource" :key="item.value" class="tabs-item"
        :class="liClass(item)" @click="select(item)">
      {{item.text}}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = {
  text:string,
  value:string
}

@Component
export default class Tabs extends Vue {
 @Prop({required:true,type:Array}) dataSource!:DataSourceItem[]
 @Prop(String) value!:string
 @Prop(String) classPrefix!:string

 liClass(item:DataSourceItem){
   return {
     [this.classPrefix + '-tabs-item']:this.classPrefix,
     selected: item.value === this.value
   }
 }
 select(item:DataSourceItem){
   this.$emit('update:value',item.value)
 }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  flex-direction: row;
  >li{
    width: 50%;
    font-size: 24px;
    line-height: 64px;
    position: relative;
    text-align: center;
    &:nth-child(1){
      background-color: #fff;
      color: black;
      &.selected{
        background-color: rgb(62, 181, 117);
        color: white;
      }
    }
    &:nth-child(2){
      background-color: white;
      color: black;
      &.selected{
        background-color: rgb(227, 174, 0);
        color: white;
      }
    }
    &:not(.selected)::after{
      content: '';
      display: block;
      height: 1px;
      background-color: #e7e7e7;
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
  }
}
</style>