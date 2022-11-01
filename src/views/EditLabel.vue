<template>
  <layout>
  <div class="navBar">
    <Icon class="leftIcon" name="left" @click.native="goBack"></Icon>
    <span class="title">编辑标签</span>
    <span class="rightIcon"></span>
  </div>
  <div class="form-wrapper">
    <FormItem :value="tag.name"
              @update:value="update"
              title="标签名" edit-place-holder="请输入标签名"/>
  </div>
  <div class="button-wrapper">
    <Button @click="remove">删除标签</Button>
  </div>
    {{tag}}
  </layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import FormItem from "@/components/FormItem.vue"
import store from '@/store/index';
import {mixins} from 'vue-class-component';
import fetchHelper from '@/mixins/fetchHelper';


@Component({components: {Button,FormItem}})
export default class EditLabel extends mixins(fetchHelper) {
  tag: Tag | undefined
  tagList = store.state.tagList
  created(){
    const id = this.$route.params.id
    const index = this.tagList.map(tag=>tag.id).indexOf(id);
    if(index>=0){
      this.tag = this.tagList[index]
    }else{
      this.$router.replace('/404')
    }
  }
  goBack(){
    this.$router.back()
  }
  update(name:string){
    console.log('editLabel页面：'+ name);
    if(this.tag) {const id =this.tag.id;store.commit('updateTag', {id:id, newName:name})}
  }
  remove(){
    if(this.tag) {
      store.commit('removeTag',this.tag.id)
        window.alert('删除成功')
        this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
  }
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>