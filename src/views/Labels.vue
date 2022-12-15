<template>
    <layout>
      <Tabs :data-source="recordTypeList" class-prefix="type" :value.sync="type"></Tabs>
      <div class="tags">
        <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
          <span>{{ tag.name }}</span>
          <Icon name="right"></Icon>
        </router-link>
        <div class="createTag-wrapper">
          <Button @click="createTag">新建标签</Button>
        </div>
      </div>
    </layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import Button from '@/components/Button.vue';
import store from '@/store/index';
import {mixins} from 'vue-class-component';
import stateHelper from '@/mixins/stateHelper';
import RecordTypeList from '@/constants/recordTypeList';


@Component({
  components: {Tabs, Button}
})
export default class Labels extends mixins(stateHelper) {
  type:Type = '-'
  get tags(){
    return  store.state.tagList.filter(tag => tag.type === this.type);
  }
  recordTypeList = RecordTypeList
  createTag(){
    const name = window.prompt('请输入标签名')
    store.commit('createTag', {name,type:this.type})
    if(store.state.createTagError){window.alert(store.state.createTagError.message)}
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag-wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>