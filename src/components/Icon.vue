<template>
    <svg class="icon">
      <use :href="'#'+svgHref()" >
      </use>
    </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

let importAll = (requireContext:__WebpackModuleApi.RequireContext)=> requireContext.keys().forEach(requireContext);
try {
importAll(require.context('../assets/icons',true,/\.svg$/));
}catch (error){
  console.log(error);
}

type IconTable = {[id:string]:string}

const iconTable:IconTable = {
  '1' : 'food',
  '2' : 'traffic',
  '3' : 'shopping',
  '4' : 'electric',
  '5' : 'salary',
  '6' : 'bonus',
  '7' : 'hongbao',
  '9999': 'accountBook'
}

@Component
export default class Icon extends Vue{
  @Prop(String) name!:string;
  @Prop(String) id!:string;
  svgHref(){
    if(this.name){
      return this.name
    }else if(this.id){
      if(Number(this.id) - 7 > 0){
        return iconTable['9999']
      }else{
        return ('1234567'.indexOf(this.id)+1) && iconTable[this.id]
      }
    }
  }
  // props: ['name']
}
</script>

