type Type = '-' | '+'

type Tag = {
  name: string,
  id: string,
  type:Type
}

type RecordItem = {
  type:string,
  amount:number,
  tagID:string,
  notes?:string,
  createdAt?: string
}
