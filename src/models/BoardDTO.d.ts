interface IColumn {
    id: string
    title: string
    order: string
}

export interface IBoard {
    id: string
    title: string
    columns: IColumn[]
}
