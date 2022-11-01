import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex)

type RootState = {
  recordList:RecordItem[],
  tagList:Tag[],
  currentTag: Tag | undefined
}

const store = new Vuex.Store({
  state: {
    recordList:[] as RecordItem[],
    tagList:[] as Tag[],
    currentTag: undefined
  } as RootState,
  mutations: {
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || "[]")
    },
    saveRecord(state){
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList))
    },
    createRecord(state,data:RecordItem){
      data.createdAt = new Date();
      // const newRecord = clone(data);
      state.recordList.push(clone(data))
      store.commit('saveRecord')
    },
    fetchTags(state){
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
    },
    setCurrentTag(state,id:string){
      state.currentTag = state.tagList.filter(item => item.id ===id)[0]
    },
    saveTag(state){
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList))
    },
    createTag(state){
      const name = window.prompt('请输入标签名');
      if(name === ''){
        window.alert('标签名不能为空')
      }else if(state.tagList && name){
        const nameList = state.tagList.map(tag => tag.name)
        if(nameList.indexOf(name)>= 0 ){
          window.alert('不能输入已存在的标签名')
        }else if(name.length >10 ){
          window.alert('标签名不能过长')
        } else{
          const id = createId().toString()
          state.tagList.push({id,name})
          store.commit('saveTag')
        }
      }
    },
    removeTag(state,id:string){
      let index = -1;
      for(let i = 0;i< state.tagList.length;i++){
        if(state.tagList[i].id === id){
          index = i
          break
        }
      }
      if(index !== -1) {
        state.tagList.splice(index,1)
        store.commit('saveTag')
      }else{
        window.alert('标签不存在')
      }
    },
    updateTag(state, payload: {id:string,newName:string }) {
      const {id,newName} = payload
      const idList =  state.tagList.map(tag=>tag.id)
      if(idList.indexOf(id)>=0){
        const names = state.tagList.map(tag=>tag.name)
        if(names.indexOf(newName)>=0){
          window.alert('标签名重复')
        }else{
          store.commit('setCurrentTag',payload.id)
          const tag = state.currentTag
          tag && (tag.name = newName)
          store.commit('saveTag')
          window.alert('修改成功')
        }
      }else{
        window.alert('标签不存在')
      }
    }
  },
})


store.commit('fetchRecords')
store.commit('fetchTags')

export default store;