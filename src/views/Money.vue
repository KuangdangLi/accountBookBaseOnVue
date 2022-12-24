<template>
  <div @click="qrcodeSwitch=false">
  <Layout class-prefix="layout" >
    <NumberPad :value.sync="record.amount" :type="record.type" @submit="saveRecord"></NumberPad>
    <Tabs :data-source="recordTypeList" class-prefix="type" :value.sync="record.type"></Tabs>
    <div class="layerWrapper">
      <DatePicker :init-date.sync="record.createdAt" :picker-switch.sync="datePickerSwitch"/>
      <FormItem :value.sync="record.notes" title="备注" edit-place-holder="在这里输入备注"></FormItem>
    </div>
    <Tags  :value.sync="record.tagID" :type="record.type"></Tags>
    <div v-if="qrcodeSwitch" class="qrcodeWrapper" >
      <div class="github">
      <img src="../../public/githubVue.png" alt="">
      </div>
      <div class="gitee">
      <img src="../../public/githubVue.png" alt="">
      </div>
    </div>
  </Layout>
  </div>
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
  qrcodeSwitch = false
  tags= store.state.tagList;
  record:RecordItem = {type:'-',amount:0,tagID:'',notes:'',createdAt:dayjs().toISOString()};
  recordList = store.state.recordList;
  recordTypeList = recordTypeList
  reset(){
    this.record = {type:'-',amount:0,tagID:'',notes:'',createdAt:dayjs().toISOString()};
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
  mounted(){
    if(document.documentElement.clientWidth>500){
      this.qrcodeSwitch = true
      window.alert('为了您得到满意的浏览效果，请用手机扫描二维码打开本页面')
    }
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
     >.formItemWrapper{
      width: 50vw;
      user-select: none;
    }
}
</style>
