export interface CardType {
    id: number
    order: number
    name: string
    parentId?: number
    hasChildrens: boolean
    childrens?: CardType[]
}

export interface DnDPayloadType {
    removedIndex: number
    addedIndex: number
    payload?: any
}