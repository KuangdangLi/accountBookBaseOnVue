<template>
  <div class="wrapper">
  <div  ref="barContainer" class="container"></div>
  <div  ref="pieContainer" class="container"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts';
import {EChartOption,ECharts} from 'echarts';


@Component
export default class MyChart extends Vue {
  @Prop() options!:ChartOption
  @Prop(String) type!:Type
  barChart?:ECharts = undefined
  pieChart?:ECharts = undefined
  get barOption(): EChartOption{
    return ({
      title:{
        show:true,
        text:'每日对比',
      },
      tooltip: {
        show:true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label:{
            color:'black'
          }
        },
        extraCssText:'width:100px;height:50px',
      },
      grid: {
        left: 0,
        right: 0,
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.options.dateArr,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel:{
            show:true,
            interval:3
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine:{
            show:false
          },
          axisLabel:{
            margin: 10
          }
        }
      ],
      series: [
        {
          name: '金额',
          type: 'bar',
          barWidth: '50%',
          data: this.options.amountArr,
          itemStyle:{
            color: this.type === '-' ? '#38b478' : '#e3ae00'
          }
        }
      ]
    })
  }
  get pieOption(): EChartOption{
    return ({
      title: {
        text: '支出构成',
        left: 'left'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b}:<br />{c}￥",
        textStyle: {width: '10px',height: '10px'},
        extraCssText:'width:100px;height:50px',
      },
      series: [
        {
          name: 'Amount Percent',
          type: 'pie',
          radius: '50%',
          data: this.options.pieChartOption,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'outer', //标签的位置
                textStyle: {color: "#333", fontSize: "14"},
                formatter: function (val:any) {
                  //让series 中的文字进行换行
                  // return val.name;
                  return val.name + "\n(" + val.percent + "%)";
                },
              },
            }},
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
  mounted(){
    if(this.options?.dateArr === undefined){return console.error('options为空')}
    this.barChart = echarts.init(this.$refs.barContainer as HTMLDivElement)
    this.barChart.setOption(this.barOption)
    this.pieChart = echarts.init(this.$refs.pieContainer as HTMLDivElement)
    this.pieChart.setOption(this.pieOption)
  }
  @Watch('options')
  onOptionsUpdate(){
    if(this.options?.dateArr === undefined){return console.error('options为空')}
    this.barChart!.setOption(this.barOption)
    this.pieChart!.setOption(this.pieOption)
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  .container{
    padding: 0 10px;
    width: 100%;
    height: 300px;
    overflow-x: hidden;
  }
}
</style>