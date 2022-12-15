<template>
  <div>
    <layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="value"></Tabs>
        <ul v-if="groupedList.length>0">
          <li v-for="group in groupedList" :key="group.title">
           <h3 class="title">{{beautifyDate(group.title)}}<span>￥{{group.total}}</span></h3>
          <ol>
            <li v-for="item in  group.items" :key="item.createdAt" class="record">
             <span>{{currentTagName(item.tagID)}}</span>
             <span class="notes">{{item.notes}}</span>
             <span>￥{{item.amount}}</span>
            </li>
          </ol>
          </li>
        </ul>
      <div v-else class="noResult">目前没有相关记录</div>
      <div class="chart-wrapper" ref="chartWrapper">
        <MyChart class="chart" :options="chartOption" :type="value"></MyChart>
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
import MyChart from '@/components/MyChart.vue';
import {EChartOption} from 'echarts';

type Result =  {title:string,items:RecordItem[],total?:number}[]

@Component({
  components: {MyChart, Tabs}
})
export default class Statistics extends mixins(stateHelper) {
  value = '-'
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
        return ((sum*100) + (item.amount*100))/100
      },0)
    })
      return result
  }
  get options():EChartOption|undefined{
    if(this.dateAmountList){
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: 0,
          right: 0,
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.dateAmountList['dateList'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel:{
              formatter(value:string){
                return value.substr(5)
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '30%',
            data: this.dateAmountList['amountList']
          }
        ]
      }
    }else{
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: 0,
          right: 0,
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['暂无数据','暂无数据'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel:{
              formatter(value:string){
                return value
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '30%',
            data: [0,0]
          }
        ]
      }
    }
  }
  get dateAmountList(){
    console.log('this.groupedList');
    console.log(this.groupedList);
    if(this.groupedList[0]){
      const lastDay = dayjs(this.groupedList[0].title)
      let dateArray = []
      let amountArray = []
      let correspondingDateItem
      for(let i=0;i<=30;i++){
        let dayItem = lastDay.subtract(i,'day').format('YYYY-MM-DD')
        dateArray.push(dayItem)
        correspondingDateItem = this.groupedList.filter(item=>item.title === dayItem)[0];
        amountArray.push( correspondingDateItem ? correspondingDateItem.total : 0)
        // console.log(lastDay.subtract(i,'day').format('MM月DD'));
      }
      console.log(dateArray);
      console.log(amountArray);
      return {dateList:dateArray,amountList:amountArray}
    }else{
      return undefined
    }

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
  //.chart{
  //  &-wrapper{
  //    overflow: auto;
  //    &::-webkit-scrollbar{
  //      display: none;
  //    }
  //  }
  //}
</style>