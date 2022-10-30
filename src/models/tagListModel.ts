import createId from '@/lib/createId';

const localStorageName = 'tagList'



type TagListModel = {
  data: Tag[],
  fetch: ()=> Tag[],
  save:()=> void,
  create:(name:string) => void
  remove:(id:string) => boolean
  update:(id:string,name:string) => 'success' | 'notFound' | 'duplicated'
}

const tagListModel:TagListModel = {
  data:[],
  fetch():Tag[]{
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]')
    return this.data
  },
  save(){
    window.localStorage.setItem(localStorageName,JSON.stringify(this.data))
  },
  create(name){
    const id = createId().toString()
    this.data.push({id,name})
    this.save()
  },
  remove(id){
    let index = -1;
    for(let i = 0;i< this.data.length;i++){
      if(this.data[i].id === id){
        index = i
        break
      }
    }
    if(index === -1) {return false;}
    this.data.splice(index,1)
    this.save()
    return true;
  },
  update(id:string,name:string) {
    const idList =  this.data.map(tag=>tag.id)
    if(idList.indexOf(id)>=0){
      const names = this.data.map(tag=>tag.name)
      if(names.indexOf(name)>=0){
        return 'duplicated'
      }else{
        const tag = this.data.filter(item => item.id ===id)[0]
        tag.name = name
        this.save();
        return 'success'
      }
    }else{
      return 'notFound'
    }
  }
}

export default tagListModel;