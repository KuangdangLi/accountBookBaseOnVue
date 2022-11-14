<template>
  <div>
    <label class="formItem">
      <span class="name">{{ title }}</span>
      <input v-if="type=== 'date'" :type="type||'text'" :value="turnTO(value)" @change="updateDateValue">
      <input v-else :type="type||'text'" :placeholder="editPlaceHolder" maxlength="10" :value="value" @change="updateValue">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue{
  @Prop(String) value!:string;
  @Prop(String) title!:string;
  @Prop(String) editPlaceHolder!:string;
  @Prop(String) type?:string

  updateValue(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    // const [a,b,c] = (input.value.split('-'))
    // const newDate = new Date(Number(a),Number(b),Number(c),23,59).toISOString();
    // console.log(newDate)
    // // dayjs(input.value).format('YYYY-MM-DD');
    this.$emit('update:value',input.value)
  }
  updateDateValue(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log('input.value');
    console.log(input.value);
    const [a,b,c] = (input.value.split('-'))
    const newDate = new Date(Number(a),Number(b)-1,Number(c),23,59).toISOString();
    this.$emit('update:value',newDate)
  }
  turnTO(value:string){
    return dayjs(value).format('YYYY-MM-DD')
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>