<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav></Nav>
  </div>
</template>

<script lang="ts">

import Nav from '@/components/Nav.vue';
export default  {
  name: "Layout",
  components: {Nav}
}
</script>

<style lang="scss" scoped>
  .nav-wrapper{
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    height: 100vh;
  }
  .content{
    flex-grow: 1;
    overflow: auto;
  }
</style>