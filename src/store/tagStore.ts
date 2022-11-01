import createId from '@/lib/createId';

const localStorageName = 'tagList'



type TagStore = {
  tagList: Tag[],
  findTag:(id:string)=> Tag,
  fetchTags: ()=> Tag[],
  saveTag:()=> void,
  createTag:() => void
  removeTag:(id:string) => boolean
  updateTag:(id:string,name:string) => 'success' | 'notFound' | 'duplicated'
}

const tagStore:TagStore = {
  tagList:[],
  fetchTags():Tag[]{
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageName) || '[]')
    return this.tagList
  },
  findTag(id){
    return this.tagList.filter(item => item.id ===id)[0]
  },
  saveTag(){
    window.localStorage.setItem(localStorageName,JSON.stringify(this.tagList))
  },
  createTag(){
    const name = window.prompt('请输入标签名');
    if(name === ''){
      window.alert('标签名不能为空')
    }else if(this.tagList && name){
      const nameList = this.tagList.map(tag => tag.name)
      if(nameList.indexOf(name)>= 0 ){
        window.alert('不能输入已存在的标签名')
      }else if(name.length >10 ){
        window.alert('标签名不能过长')
      } else{
        const id = createId().toString()
        this.tagList.push({id,name})
        this.saveTag()
      }
    }
  },
  removeTag(id){
    let index = -1;
    for(let i = 0;i< this.tagList.length;i++){
      if(this.tagList[i].id === id){
        index = i
        break
      }
    }
    if(index === -1) {return false;}
    this.tagList.splice(index,1)
    this.saveTag()
    return true;
  },
  updateTag(id:string,name:string) {
    const idList =  this.tagList.map(tag=>tag.id)
    if(idList.indexOf(id)>=0){
      const names = this.tagList.map(tag=>tag.name)
      if(names.indexOf(name)>=0){
        return 'duplicated'
      }else{
        const tag = this.findTag(id)
        tag.name = name
        this.saveTag();
        return 'success'
      }
    }else{
      return 'notFound'
    }
  }
}

tagStore.fetchTags()

export default tagStore;