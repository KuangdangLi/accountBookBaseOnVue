<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag" @click="toggle(tag)" :class="{selected: selectedTags.indexOf(tag)>=0}">{{tag}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue{
  @Prop(Array) dataSource:string[] | undefined;
  selectedTags:string[] = [];
  create(){
    const name = window.prompt('请输入标签名');
    if(name === ''){
      window.alert('标签名不能为空')
    }else if(this.dataSource && name){
      if(this.dataSource.indexOf(name)>= 0 ){
        window.alert('不能输入已存在的标签名')
      }else if(name.length >5 ){
        window.alert('标签名不能过长')
      } else{
        this.$emit('update:dataSource', [...this.dataSource, name]);
      }
    }
  }
  toggle(tag:string){
    const index = this.selectedTags.indexOf(tag);
    if(index>=0){
      this.selectedTags.splice(index,1)
    }else{
      this.selectedTags.push(tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>