export interface CardType {
    id: number,
    order: number,
    name: string,
    hasChildrens: boolean,
    childrens?: Array<CardType>
}

export interface DnDResultType {
    removedIndex: number
    addedIndex: number
    payload?: any
}