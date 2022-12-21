<template>
    <layout>
      <Tabs :data-source="recordTypeList" class-prefix="type" :value.sync="type"></Tabs>
      <ul :class="type ==='-' ? 'minus' : 'plus'" class="tagList">
        <li v-for="tag in tags" :key="tag.id">
          <router-link :to="(tag.id<10) ? '/labels' : `/labels/edit/${ tag.id}`">
            <div class="iconWrapper">
              <Icon :id="tag.id" />
            </div>
            <span>{{ tag.name }}</span>
          </router-link>
        </li>
        <li class="addButton">
          <NewButton icon-name="add" content="新增标签" @innerEvent="createTag"/>
        </li>
      </ul>
    </layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import store from '@/store/index';
import {mixins} from 'vue-class-component';
import stateHelper from '@/mixins/stateHelper';
import RecordTypeList from '@/constants/recordTypeList';
import Icon from '@/components/Icon.vue';
import NewButton from '@/components/NewButton.vue';

@Component({
  components: {Tabs,Icon,NewButton}
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
ul.tagList{
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  ::v-deep &.minus{
    .iconWrapper{
      background-color: #3eb575;
    }
  }
  ::v-deep &.plus{
    .iconWrapper{
      background-color: #e3ae00;
    }
  }
   >li{
    -webkit-tap-highlight-color: rgba(255,255,255,0);
    margin-bottom: 10px;
    >a{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    >.button{
      font: inherit;
    }
     .iconWrapper{
      border: 1px solid #f8f8f8;
      padding: 15px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg{
        width: 30px;
        height: 30px;
        fill: white;
      }
    }
    span{
      display: inline-block;
    }
  }
  >::v-deep li.addButton{
    -webkit-tap-highlight-color: rgba(255,255,255,0);
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    >.button{
      font: inherit;
    }
    .iconWrapper{
      border: 1px solid #f8f8f8;
      padding: 15px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg{
        width: 30px;
        height: 30px;
        fill: white;
      }
    }
    span{
      display: inline-block;
    }
  }
}
</style>