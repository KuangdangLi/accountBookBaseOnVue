type Type = '-' | '+'

type Tag = {
  name: string,
  id: string,
  type:Type
}

type RecordItem = {
  type:string,
  amount:number,
  tags?:Tag[],
  notes?:string,
  createdAt?: string
}
