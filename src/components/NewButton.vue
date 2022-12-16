<template>
  <button class="button" @click="add">
    <div class="iconWrapper">
      <Icon :name="iconName" />
    </div>
    <span v-if="content">{{ content }}</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
@Component
export default class NewButton extends Vue {
 @Prop() iconName!:string
 @Prop() content!:string
  add(){
   this.$emit('createTag')
  }
}
</script>