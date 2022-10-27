<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"></Icon>
      <div>money</div>
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"></Icon>
      <div>labels</div>
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"></Icon>
      <div>statistics</div>
    </router-link>
  </nav>
</template>

<script lang="ts">

export default {
  name:'Nav'
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  > .item.selected{
    color: $color-highlight;
  }
}
</style>