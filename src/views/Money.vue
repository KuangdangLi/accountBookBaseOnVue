<template>
  <Layout class-prefix="layout">
  <NumberPad></NumberPad>
  <Types></Types>
  <Notes></Notes>
  <Tags :data-source.sync="tags"></Tags>
  </Layout>
</template>

<script lang="ts">

import NumberPad from '@/components/Money/NumberPad.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
export default  {
  name: 'Money',
  components: {Tags, Types, Notes, NumberPad},
  data(){
    return {
      tags: ['衣','食','住','行']
    }
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
