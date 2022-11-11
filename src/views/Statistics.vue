<template>
  <div>
    <layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="value"></Tabs>
        <ul v-if="groupedList.length>0">
          <li v-for="group in groupedList" :key="group.title">
           <h3 class="title">{{beautifyDate(group.title)}}<span>￥{{group.total}}</span></h3>
          <ol>
            <li v-for="item in  group.items" :key="item.createdAt" class="record">
             <span>{{joinTags(item.tags)}}</span>
             <span class="notes">{{item.notes}}</span>
             <span>￥{{item.amount}}</span>
            </li>
          </ol>
          </li>
        </ul>
        <div v-else class="noResult">目前没有相关记录</div>
    </layout>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import store from '@/store/index';
import {mixins} from 'vue-class-component';
import stateHelper from '@/mixins/stateHelper';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

type Result =  {title:string,items:RecordItem[],total?:number}[]

@Component({
  components: {Tabs}
})
export default class Statistics extends mixins(stateHelper) {
  get recordList() {
    return store.state.recordList
  }
  joinTags(tags:Tag[]){
    return tags.map(tag=>tag.name).join(',')
  }
  beautifyDate(date:string){
    const recordDate =dayjs(date)
    const now = dayjs()
    if(recordDate.isSame(now,'year')){
      if(recordDate.isSame(now,'day')){
        return recordDate.format('M月D日') + ' 今天'
      }else if(recordDate.isSame(now.subtract(1,'day'),'day')){
        return recordDate.format('M月D日')+ ' 昨天'
      }else if(recordDate.isSame(now.subtract(2,'day'),'day')){
        return recordDate.format('M月D日')+ ' 前天'
      }else{
        return recordDate.format('M月D日')
      }
    }
  }
  get groupedList(){
    const {recordList} = this
    if(recordList.length===0){return []}
    const newList = clone(recordList).filter(item=>item.type === this.value).sort((a,b)=>dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf())
    if(newList.length===0) {return []}
      const result:Result = [{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}]
      for(let i=1;i<=newList.length;i++){
        if(newList[i]){
          const current = newList[i]
          const last = result[result.length-1]
          if(dayjs(current.createdAt).isSame(last.title,'day')){
            last.items.push(current)
          }else{
            result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[newList[i]]})
          }

        }
      }
    result.map(group=>{
      group.total = group.items.reduce((sum,item)=>{
        return sum + item.amount
      },0)
    })
      return result
  }
  recordTypeList = recordTypeList
  value = '-'
}
</script>

<style lang="scss" scoped>
  .noResult {
    padding: 16px;
    text-align: center;
  }
  ::v-deep {
    .type-tabs-item{
      background: #C4C4C4;
      &.selected{
        background: white;
        &::after{
          display: none;
        }
      }
    }
  }
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: white;
    @extend %item;
  }
  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>