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
export default  {
  name: "Layout",
  props: ['classPrefix'],
  components: {Nav}
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
    max-height: 100vh;
    overflow-y: hidden;
    >.content{
      flex-grow: 1;
      overflow-y: hidden;
    }
  }
</style>