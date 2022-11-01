<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag.id)" :class="{selected: idList.indexOf(tag.id)>=0}">{{tag.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import store from '@/store/index';

@Component
export default class Tags extends Vue{
  @Prop(Array) value!:Tag[];
  tagList = store.state.tagList
  selectedTags = this.value;
  idList:string[] = []
  @Watch('value')
  select(){
    this.selectedTags = this.value;
    this.idList = this.selectedTags.map(item=>item.id);
  }
  create(){
    store.commit('createTag')
  }
  toggle(id:string){
    const index = this.idList.indexOf(id);
    if(index>=0){
      this.selectedTags.splice(index,1)
      this.$emit('update:value',this.selectedTags)
    }else{
      let index = -1;
      for(let i = 0;i<this.tagList.length;i++){
        if(this.tagList[i].id === id){
          index = i;
          break
        }
      }
      this.selectedTags.push(this.tagList[index])
      this.$emit('update:value',this.selectedTags)
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