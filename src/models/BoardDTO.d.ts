export interface IBoard {
    id: string
     title: string
     columns: IColumn
}

interface IColumn {
    id: string
    title: string
    order: string
}