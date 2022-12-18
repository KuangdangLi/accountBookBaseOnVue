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
type ChartOption = {
  dateArr:string[]
  amountArr:number[]
  pieChartOption:PieChartOption[]
}

type IdAndAmount={
  [id:string]:number
}

type PieChartOption = {
  value:number,
  name:string,
  itemStyle:object
}

type Result =  {title:string,items:RecordItem[],total?:number}[]
