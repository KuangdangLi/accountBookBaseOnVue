<template>
  <div>
    <label class="formItem">
      <span class="name">{{ title }}</span>
      <input type="text" :placeholder="editPlaceHolder" maxlength="10" :value="value" @change="updateValue">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue{
  @Prop(String) value!:string;
  @Prop(String) title!:string;
  @Prop(String) editPlaceHolder!:string;

  updateValue(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    this.$emit('update:value',input.value)
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