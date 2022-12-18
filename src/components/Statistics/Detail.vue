<template>
  <ul>
  <li v-for="group in value" :key="group.title">
    <header>
      <span>{{ group.title.split('年')[1] }}</span>
      <span>￥{{ group.total }}</span>
    </header>
    <div v-for="recordItem in group.items" class="content" :key="recordItem.createdAt">
      <div class='aside'>
        <div class="iconWrapper">
          <Icon :id="recordItem.tagID"/>
        </div>
      </div>
      <div class='main'>
        <div class='upItem'>
          <div>{{ currentTagName(recordItem.tagID) }}</div>
          <div>￥{{ recordItem.amount }}</div>
        </div>
        <div class='downItem'>
          <span>{{ HHmm(recordItem) }} &nbsp;</span>
          <span>{{ `${recordItem.notes}` ? `| ${recordItem.notes}` : '' }}</span>
        </div>
      </div>
    </div>
  </li>
</ul>
</template>

<script lang="ts">
import Icon from '@/components/Icon.vue';
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import store from '@/store';
import dayjs from 'dayjs';

@Component({
  components:{Icon}
})
export default class Detail extends Vue {
  @Prop(Array) value!:Result
  @Prop(String) type!:Type
  currentTagName(id:string){
    return store.state.tagList.filter(tag=>tag.id===id)[0]?.name
  }
  HHmm(recordItem:RecordItem){
    return dayjs(recordItem.createdAt).format('HH:mm')
  }
}
</script>

<style lang="scss" scoped>
ul {
  background-color: white;
  margin: 5px 5px 0;
  border-radius: 5px;
  > li {
    > header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px 15px;
      background-color: #fbfbfb;
    }

    > .content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      > .aside {
        padding: 15px;

        > .iconWrapper {
          margin-bottom: 5px;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          > svg {
            width: 20px;
            height: 20px;
            fill: white;
          }
        }
      }

      > .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px 15px 15px 0;
        width: 100%;
        border-bottom: 1px solid #f1f1f1;

        > .upItem {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 6px;
        }

        > .downItem {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          width: 100%;
          font-size: 14px;
          color: #cdcdcd;
        }
      }

      &:last-child {
        > .main {
          border-bottom: none;
        }
      }
    }
  }
}
</style>