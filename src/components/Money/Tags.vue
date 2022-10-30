<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id" @click="toggle(tag.id)" :class="{selected: idList.indexOf(tag.id)>=0}">{{tag.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Tags extends Vue{
  @Prop(Array) dataSource!:Tag[];
  @Prop(Array) value!:Tag[];
  selectedTags = this.value;
  idList:string[] = []
  @Watch('value')
  select(){
    this.selectedTags = this.value;
    this.idList = this.selectedTags.map(item=>item.id);
  }
  create(){
    const name = window.prompt('请输入标签名');
    if(name === ''){
      window.alert('标签名不能为空')
    }else if(this.dataSource && name){
      const nameList = this.dataSource.map(tag => tag.name)
      if(nameList.indexOf(name)>= 0 ){
        window.alert('不能输入已存在的标签名')
      }else if(name.length >5 ){
        window.alert('标签名不能过长')
      } else{
        this.$emit('update:dataSource', name);
      }
    }
  }
  toggle(id:string){
    const index = this.idList.indexOf(id);
    if(index>=0){
      this.selectedTags.splice(index,1)
      this.$emit('update:value',this.selectedTags)
    }else{
      let index = -1;
      for(let i = 0;i<this.dataSource.length;i++){
        if(this.dataSource[i].id === id){
          index = i;
          break
        }
      }
      this.selectedTags.push(this.dataSource[index])
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