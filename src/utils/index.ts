import type { CardType, DnDPayloadType } from "@/types"

export function applyDrag(arr: Array<CardType>, dragResult: DnDPayloadType): CardType[] {
    const { removedIndex, addedIndex, payload } = dragResult

    if (removedIndex === null && addedIndex === null) return arr

    const result = [...arr]

    let itemToAdd = payload

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }

    return result
}