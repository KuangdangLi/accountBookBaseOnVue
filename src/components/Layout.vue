<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`   ">
      <slot></slot>
    </div>
    <Nav></Nav>
  </div>
</template>

<script lang="ts">

import Nav from '@/components/Nav.vue';
import {Component, Prop} from 'vue-property-decorator';
import Vue from 'vue';

@Component({
  components:{Nav}
})
export default class Layout extends Vue{
  @Prop() classPrefix!:string
}
</script>

<style lang="scss" scoped>
  .layout-wrapper{
    @media (min-width: 500px){
      width: 500px;
      margin: 0 auto;
    }
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    transform: rotate(360deg);
    .content{
      flex-grow: 1;
      overflow: hidden;
      text-align: center;
    }
  }
</style>