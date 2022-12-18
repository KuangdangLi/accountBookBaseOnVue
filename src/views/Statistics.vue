<template>
  <div>
    <layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="value"></Tabs>
      <div class="wrapper" :class="value==='-' ? 'minus groupList' : 'plus groupList'">
      <Detail :value="groupedList" :type="value" />
        <div class="chart-wrapper" ref="chartWrapper">
          <MyChart class="chart" :options="chartOption" :type="value"></MyChart>
        </div>
        <div class="buttonWrapper">
          <NewButton v-if="viewSwitch" @click="()=>()=>{console.log('执行了')}" iconName="bar"/>
          <NewButton v-else @click="()=>()=>{viewSwitch=true}" iconName="detail"/>
        </div>
      </div>
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
import dayjs, {Dayjs} from 'dayjs';
import clone from '@/lib/clone';
import MyChart from '@/components/Statistics/MyChart.vue';
import Detail from '@/components/Statistics/Detail.vue';
import NewButton from '@/components/NewButton.vue';

@Component({
  components: {Detail, MyChart, Tabs,NewButton}
})
export default class Statistics extends mixins(stateHelper) {
  value = '-'
  viewSwitch:boolean = true
  get recordList() {
    return store.state.recordList
  }
  currentTagName(id:string){
    return store.state.tagList.filter(tag=>tag.id===id)[0]?.name
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
    }else{
      return recordDate.format('YYYY年M月D日')
    }
  }
  get groupedList(){
    const {recordList} = this
    if(recordList.length===0){return []}
    const newList = clone(recordList).filter(item=>item.type === this.value).sort((a,b)=>dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf())
    if(newList.length===0) {return []}
      const result:Result = [{title:(newList[0].createdAt as string),items:[newList[0]]}]
      for(let i=1;i<newList.length;i++){
        if(newList[i]){
          const current = newList[i]
          const last = result[result.length-1]
          if(dayjs(current.createdAt).isSame(last.title,'day')){
            last.items.push(current)
          }else{
            result.push({title:(current.createdAt as string),items:[newList[i]]})
          }

        }
      }
    result.map(group=>{
      group.total = group.items.reduce((sum,item)=>{
        return ((sum*100) + (item.amount*100))/100
      },0)
    })
      return result
  }
  get chartOption(){
    const x:RecordItem[] = JSON.parse(JSON.stringify(this.recordList.filter(recordItem=>recordItem.type===this.value)))
    x.sort((a,b)=>{
      if(a.createdAt===b.createdAt)return 0;
      if((a.createdAt as string)>(b.createdAt as string))return -1;
      if((a.createdAt as string)<(b.createdAt as string))return 1;
      return 0
    })
    const lastDay = dayjs(x[0]?.createdAt)
    const dateArr:Dayjs[] = []
    dateArr.push(lastDay)
    const amountArr:number[] = []
    let dataOfAMonth:RecordItem[] = []
    const pushAmount = (all:RecordItem[],uni:Dayjs)=>{
      const xxx = all.filter(item=>dayjs(item.createdAt).isSame(uni,'day'))
      dataOfAMonth=[...dataOfAMonth,...xxx]
      xxx[0] ? amountArr.push(xxx.reduce((sum,item)=>{return ((sum*100) + (item.amount*100))/100},0)) : amountArr.push(0)
    }
    pushAmount(x,lastDay)
    for(let i = 0;i<31;i++){
      if(i!==0){
        const xx = lastDay.subtract(i,'day')
        dateArr.push(xx)
        pushAmount(x,xx)
      }
    }
    const idAndAmount:IdAndAmount = {}
    dataOfAMonth.forEach(item=> {
      // const tagName = findTag(item.tagID).name
      if(!(idAndAmount[item.tagID])){
        idAndAmount[item.tagID] = item.amount
      }else{
        idAndAmount[item.tagID] = ((idAndAmount[item.tagID] *100 ) + (item.amount * 100)) / 100
      }
    })
    const pieChartOption:PieChartOption[] = []
    let medium = {name:'',value:0}
    for(let i in idAndAmount){
      medium.name = this.currentTagName(i)
      medium.value = idAndAmount[i]
      pieChartOption.push(JSON.parse(JSON.stringify(medium)))
    }
    pieChartOption.sort((a,b)=>{
      if(a.value === b.value) return 0
      if(a.value > b.value) return -1
      if(a.value < b.value) return 1
      return 0
    }).forEach((a,index,array)=>a.itemStyle={color:`${this.value === '-' ? 'rgba(68, 199, 128' : 'rgba(227, 174, 0'},${(1/(array.length))*(array.length-index)})`})
    const newDate = dateArr.map(date=>date.format('MM-D'))
    return {dateArr:newDate,amountArr,pieChartOption}
  }
  recordTypeList = recordTypeList
}
</script>

<style lang="scss" scoped>
  .wrapper{
    height: 85%;
    overflow-y: auto;
    ::v-deep &.minus{
      .iconWrapper{
        background-color: #4ead75;
      }
    }
    ::v-deep &.plus{
      .iconWrapper{
        background-color: #e3ae00;
      }
    }
    >.buttonWrapper{
      position: fixed;
      bottom: 15%;
      left: 1%;
      >::v-deep .button{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        >.iconWrapper{
          padding: 10px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          >svg{
            width: 15px;
            height: 15px;
            fill: white;
          }
        }
        >span{
          display: inline-block;
        }
      }
    }
  }
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
  //.chart{
  //  &-wrapper{
  //    overflow: auto;
  //    &::-webkit-scrollbar{
  //      display: none;
  //    }
  //  }
  //}
</style>