type Tag = {
  name: string,
  id: string
}
type RecordItem = {
  type:string,
  amount:number,
  tags?:Tag[],
  notes?:string,
  createdAt?: string
}
