<template>
  <div class="datePickerWrapper">
    <div class="trigger" @click="()=>{$emit('update:pickerSwitch',!pickerSwitch);}">
      <div class="iconWrapper">
        <Icon name="calendar" />
      </div>
      <span>{{displayDate.format('YYYY-MM-DD')}}</span>
    </div>
    <div v-if="pickerSwitch" class="picker">
    <div class="head">
      <span @click="() => {mediumDate = (mediumDate.month(mediumDate.month() - 1));}">&lt;</span>
      <span>{{ mediumDate.format('YYYY-MM') }}</span>
      <span @click="() => {mediumDate = (mediumDate.month(mediumDate.month() + 1));}">&gt;</span>
    </div>
    <table>
      <thead>
      <tr>
        <th>日</th>
        <th>一</th>
        <th>二</th>
        <th>三</th>
        <th>四</th>
        <th>五</th>
        <th>六</th>
      </tr>
      </thead>
      <tbody @click="(e) => printData(e)">
      <tr v-for="DayList in dateArr" :key="DayList[0].toISOString()">
      <td v-for="day in DayList" :key="day.toISOString()" :data-date="day.toISOString()"
                              :class="classes(day)">{{ day.format('D') }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs, {Dayjs} from 'dayjs';
import Icon from '@/components/Icon.vue';

type DayList = Dayjs[]

@Component({
  components:{Icon}
})
export default class DatePicker extends Vue {
  @Prop() initDate!:string
  @Prop() pickerSwitch!:boolean
  mediumDate = dayjs(this.initDate)
  get displayDate(){
    return dayjs(this.initDate)
  }
  get dateArr(){
    const month = this.mediumDate.month()
    const date1 = this.mediumDate.date(1)
    const date1Day = date1.day()
    let howMuchDay
    if(month === 1){
      howMuchDay = (6 - (date1.month(month+1).subtract(1,'d').day()))+(6-(6-date1Day)) >= 7 ? 35 : 28
    }else{
      howMuchDay =(6 - (date1.month(month+1).subtract(1,'d').day()))+(6-(6-date1Day)) >= 7 ? 42 : 35
    }
    let x:DayList = []
    const xxx:DayList[] =[]
    for(let i = -date1Day;i<howMuchDay;i++){
      x.push(date1.add(i,'d'))
      if(x.length === 7){
        xxx.push((JSON.parse(JSON.stringify(x)) as string[]).map(item=>dayjs(item)))
        x = []
      }
    }

    return xxx
  }
  printData = (e:any)=>{
    const x = e.target.dataset.date
    this.$emit('update:initDate',x)
    this.$emit('update:pickerSwitch',false)
  }
  get classes(){
    return (day: Dayjs) => {
      let x = ''
      if (!(day.isSame(this.mediumDate, 'month'))) {
        x = 'notSelected'
      }
      if (day.isSame(this.displayDate, 'day')) {
        x = ' selected'
      }
      return x || ' '
    }
  }
  mounted(){
    const xxx = document.getElementsByClassName('notSelected')
    if(xxx.length!==0){
      for(let i =0;i<xxx.length;i++){
        xxx.item(Number(i))?.addEventListener('click',(e)=>{
          e.stopPropagation()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  div.datePickerWrapper{
    position: relative;
    align-items: center;
    font-size: 14px;

    >div.trigger{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      cursor: pointer;
      user-select: none;
      >.iconWrapper{
        margin-top: -3px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        >::v-deep svg{
          fill: #3eb575;
        }
      }
    }
    >.picker {
      position: absolute;
      top: 30px;
      right: 10px;
      z-index: 99;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(128, 128, 128, 0.3);

      > div.head {
        height: 40px;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 226px;
        background-color: #3eb575;
        color: #f7f7f7;

        > span {
          cursor: pointer;
          user-select: none;
        }
      }

      > table {
        margin-top: 10px;
        border-radius: 5px;

        > thead {
          > tr {
            > th {
              font-size: 12px;
              color: #c4c4c4;
            }
          }
        }

        > tbody {
          overflow: hidden;

          > tr {
            padding-top: 8px;

            > td {
              text-align: center;
              line-height: 30px;
              font-size: 12px;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background-color: white;
              cursor: pointer;
              &.selected {
                background-color: #3eb575;
              }

              &.notSelected {
                color: #c4c4c4;
                cursor: not-allowed;
              }
            }
          }
        }
      }
    }
  }
</style>