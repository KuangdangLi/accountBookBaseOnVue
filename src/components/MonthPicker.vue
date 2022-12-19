<template>
  <div class="monthPicker">
    <div class="trigger" @click="()=>{$emit('update:pickerSwitch',!pickerSwitch)}">
      <div class="iconWrapper">
        <Icon name="calendar" />
      </div>
      <span> {{ initMonth.format('YYYY年MM月') }}</span>
    </div>
    <div v-if="pickerSwitch" class="picker">
    <div class="head">
      <span @click="() => {medium=(medium.year(medium.year() - 1));}">&lt;</span>
      <span>{{ medium.format('YYYY年') }}</span>
      <span @click="() => {medium=(medium.year(medium.year() + 1));}">&gt;</span>
    </div>
    <ol @click="(e) => {printMonth(e);}">
     <li v-for="item in monthList" :key="item.toISOString()" :data-date="item.toISOString()"
         :class="classes(item)">
       {{ item.format('M月') }}
      </li>
    </ol>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs, {Dayjs} from 'dayjs';
import Icon from '@/components/Icon.vue';

@Component({
  components:{Icon}
})
export default class MonthPicker extends Vue {
  @Prop() initMonth!:Dayjs
  @Prop() pickerSwitch!:boolean
  medium = dayjs(this.initMonth.toISOString())
  // selectedMonth = undefined
  get monthList(){
    const x = []
    for(let i = 0;i<12;i++){
      x.push(this.medium.month(i))
    }
    return x
  }
  get classes(){
    const x = this.initMonth
    return function(item:Dayjs){
      return   item.isSame(x, 'month') ? 'selected' : ' '
    }
  }
  printMonth=(e:MouseEvent)=>{
    const x = dayjs((e.target as HTMLOListElement).dataset.date)
    this.$emit('update:initMonth',x)
    console.log(this.pickerSwitch);
    this.$emit('update:pickerSwitch',false)
    console.log(this.pickerSwitch);
  }
}
</script>

<style lang="scss" scoped>
  div.monthPicker{
    position: relative;
    align-items: center;
    font-size: 14px;
    -webkit-tap-highlight-color: rgba(255,255,255,0);

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
      top: 20px;
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
      >ol{
        padding: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 10px;
        >li{
          padding: 10px 0;
          box-shadow: 0 3px 3px rgba(128, 128, 128, 0.1);
          background-color: transparent;
          position: relative;
          overflow: hidden;
          border-radius: 3px;
          text-align: center;
          &.selected{
            background-color: #3eb575;
            color: white;
          }
        }
      }
    }
  }
</style>