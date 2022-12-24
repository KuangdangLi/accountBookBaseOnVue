<template>
  <Layout class-prefix="layout">
    444
    <NumberPad :value.sync="record.amount" :type="record.type" @submit="saveRecord"></NumberPad>
    <Tabs :data-source="recordTypeList" class-prefix="type" :value.sync="record.type"></Tabs>
    <div class="layerWrapper">
      <DatePicker :init-date.sync="record.createdAt" :picker-switch.sync="datePickerSwitch"/>
      <div class="note" @click="addNote">{{`添加备注: ${record.notes}`}}</div>
<!--      <FormItem :value.sync="record.notes" title="备注" edit-place-holder="在这里输入备注"></FormItem>-->
    </div>
    <Tags  :value.sync="record.tagID" :type="record.type"></Tags>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/FormItem.vue';
import store from "@/store/index"
import {mixins} from 'vue-class-component';
import stateHelper from '@/mixins/stateHelper';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import DatePicker from '@/components/DatePicker.vue';
import dayjs from 'dayjs';

const version:string = window.localStorage.getItem('recordVersion') || '0';
// if(version === '0.0.1'){
//   const state = window.localStorage.getItem('recordList')
//   if(state){
//     const newState = JSON.parse(state)
//     newState.forEach((record:RecordItem)=>{record.createdAt = new Date()});
//     window.localStorage.setItem('recordList',JSON.stringify(newState))
//   }
//   window.localStorage.setItem('recordVersion','0.0.2')
// }


@Component({
  components: {DatePicker, Tabs, FormItem, Tags, Types, NumberPad}
})
export default class Money extends mixins(stateHelper) {
  datePickerSwitch = false
  tags= store.state.tagList;
  record:RecordItem = {type:'-',amount:0,tagID:'',notes:'',createdAt:dayjs().toISOString()};
  recordList = store.state.recordList;
  recordTypeList = recordTypeList
  reset(){
    this.record = {type:'-',amount:0,tagID:'',notes:'',createdAt:dayjs().toISOString()};
  }
  addNote(){
    let note = window.prompt('请输入备注')
    if(!note){note=''}
    if(note.indexOf(' ')>=0){note='';window.alert('备注中不能出现空格')}
    if(note.length>6){window.alert('备注不能过长');return;}
    this.record.notes = note
  }
  saveRecord(){
    if(!(this.record.tagID)){
      window.alert('请选择标签')
      this.reset()
      return
    }
    store.commit('createRecord',this.record)
    this.reset()
  }
}
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
    >.qrcodeWrapper{
      position: absolute;
      top: 50%;
      left: 50%;
      transform :translate(-50%,-50%);
      >.github{
        position: relative;
        &::after{
          content: 'github链接';
          position: absolute;
          display: block;
          top: -16px;
          left: 10px;
        }
        >img{
          width: 200px;
        }
      }
      >.gitee{
        position: relative;
        &::after{
          content: '码云链接';
          position: absolute;
          display: block;
          top: -16px;
          left: 10px;
        }
        >img{
          width: 200px;
        }
      }
    }
  }
   div.layerWrapper{
    height: 40px;
     display: flex;
     -webkit-tap-highlight-color: rgba(0,0,0,0);
     >.datePickerWrapper{
       width: 50vw;
     }
     >.note{
      width: 50vw;
       font-size:14px;
       line-height: 40px;
      user-select: none;
    }
}
</style>
