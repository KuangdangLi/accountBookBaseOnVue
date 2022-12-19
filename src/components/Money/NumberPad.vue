<template>
  <div class="numberPadWrapper">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" :class="`ok ${typeColor}`">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent" class="dot">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue{
    @Prop(Number) value!:number;
    @Prop(String) type!:Type
    output:string = this.value.toString();
    get typeColor(){
      let className = ''
      if(this.type === '-'){
        className = 'minus'
      }else if(this.type === '+'){
        className = 'plus'
      }
      if(Number(this.output) !== 0){
        className = className.concat(' ready')
      }
      return className
    }
    inputContent(event:MouseEvent){
      const button = event.target as HTMLButtonElement;
      const input = button.textContent!;
      if(this.output === '0'){
        if('0123456789'.indexOf(input)>=0){
          this.output = input;
        }else{
          this.output += input;
        }
        return;
      }
      if(!(this.output.indexOf('.')>=0)){
        if(this.output.length === 7){
          if(input=== '.'){
            this.output += input;
            return;
          }else {return;}
        }
      } else{
        if(input === '.'){return;}
        const [,float] =  this.output.split('.')
        if(float.length>=2) {return}
      }
      this.output += input;
    }
    clear(){
      this.output = '0';
    }
    remove(){
      if(this.output.length ===1){
        this.output = '0';
      }else {
        this.output = this.output.slice(0,-1)
      }
    }
    ok(){
      this.$emit('update:value',parseFloat(this.output))
      this.$emit('submit')
      this.output = this.value.toString();
    }
}
</script>

<style lang="scss" scoped>
  div.numberPadWrapper{
    >.output{
      font-family: Consolas , monospace;
      font-size: 36px;
      color: #333;
      line-height: 72px;
      text-align: right;
      padding-right: 16px;
      background-color: #fff;
    }
    >.buttons{
      padding: 5px 0;
      width: 100%;
      display: grid;
      grid-template-rows: 52px 52px 52px 52px;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 5px;
      grid-template-areas:
    '1 2 3 delete'
    '4 5 6 clear'
    '7 8 9 OK'
    'zero zero dot OK'
    ;
      button{
        background-color: white;
        font-size: 18px;
        border-radius: 5px;
        &.ok{
          grid-area: OK;
          color: white;
          &.minus{
            background-color: rgba(62, 181, 117,0.5);
            &.ready{
              background-color: rgb(62, 181, 117);
            }
          }
          &.plus{
            background-color: rgba(227, 174, 0,0.5);
            &.ready{
              background-color: rgb(227, 174, 0);
            }
          }
        }
        &.zero{
          grid-area: zero;
        }
      }
    }
  }
</style>