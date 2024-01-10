export interface ITab {
  id: string
  name: string
  text: string
}

export interface IData {
  tabs: ITab[]
  active: string
}
