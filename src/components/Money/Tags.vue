<template>
    <div class="wrapper">
    <ul >
      <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag.id)" :class="selectedAndColor(tag)">
        <div class="iconWrapper">
          <Icon :id="tag.id" />
        </div>
        <span>{{ tag.name }}</span>
      </li>
      <li>
        <NewButton icon-name="add" content="新增标签" @createTag="createTag"/>
      </li>
    </ul>
    </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import store from '@/store/index';
import stateHelper from '@/mixins/stateHelper';
import {mixins} from 'vue-class-component';
import NewButton from '@/components/NewButton.vue';
@Component({
  components: {NewButton}
})
export default class Tags extends mixins(stateHelper){
  @Prop(String) value!:string;
  @Prop(String) type!:Type;
  get tagList(){
    return  store.state.tagList.filter(tag => tag.type === this.type);
  }
  createTag(){
    const name = window.prompt('请输入标签名')
    store.commit('createTag', {name,type:this.type})
    if(store.state.createTagError){window.alert(store.state.createTagError.message)}
  }
  toggle(id:string){
    if(id===this.value){
      this.$emit('update:value','')
    }else {
      this.$emit('update:value',id)
    }
  }
  get selectedAndColor(){
    const x = this.type
    const y = this.value
    return function (tag:Tag)
    {
      let className = '';
      if (tag.id === y) {
        className = 'selected';
      }
      if (className) {
        if (x === '-') {
          className = className.concat(' minus');
        } else if (x === '+') {
          className = className.concat(' plus');
        }
      }
      return className || ' ';
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
flex-grow: 1;
justify-content: end;
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 16px 12px;
background-color: #fff;
overflow-y: hidden;
>ul {
  @media (max-width: 300px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  font-size: 10px;
  overflow-y: hidden;
  > ::v-deep li {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     .iconWrapper {
      margin-bottom: 5px;
      border: 1px solid #f7f7f7;
      padding: 8px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f7f7f7;
      > svg {
        width: 20px;
        height: 20px;
        fill: #c4c4c4;
      }
    }
    > span {
      display: inline-block;
      color: #c4c4c4;
    }
    &.selected {
      >span {
        color: black;
      }
      &.minus{
        > .iconWrapper {
          border-color: transparent;
          background-color: #38b478;
          > svg {
            fill: white;
          }
        }
      }
      &.plus{
        > .iconWrapper {
          border: none;
          background-color: #e3ae00;
          > svg {
            fill: white;
          }
        }
      }
    }
    >button.button{
      font-size: 12px;
      color: #a3b0c5;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      svg{
        fill: #c4c4c4;
      }
    }
  }
}
}
</style>