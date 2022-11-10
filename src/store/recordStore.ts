import clone from "@/lib/clone.ts"

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList:[] as RecordItem[],
  fetchRecord():RecordItem[]{
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]")
    return this.recordList
  },
  saveRecord(){
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.recordList))
  },
  createRecord(data:RecordItem){
    data.createdAt = new Date().toISOString();
    // const newRecord = clone(data);
    this.recordList.push(clone(data))
    this.saveRecord()
  }
}

recordStore.fetchRecord()

export default recordStore;