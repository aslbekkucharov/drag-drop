<template>
    <div class="card">

        <div class="card__inner">
            <div class="card-col card-col--numb">
                <span class="card-col__name">№</span>
                <span class="card-col__value">{{ cardIndex }}</span>
            </div>

            <div class="card-col card-col--name" :class="{ 'card-col--root': !card.hasChildrens }">
                <span class="card-col__name">Название</span>
                <span class="card-col__value">{{ cardName }}</span>
            </div>

            <div class="card-col card-col--order">
                <span class="card-col__name">Очередность</span>
                <span class="card-col__value">{{ index }}</span>
            </div>

            <div class="card-col card-col--subcats">
                <span class="card-col__name">Подкатегории</span>
                <span class="card-col__value">{{ cardSubcats }}</span>
            </div>

            <div v-if="card.hasChildrens" class="card-col card-col--count">
                <span class="card-col-label card-col-label--grey">
                    <span class="card-col-label__text">{{ card.childrens?.length }}</span>
                </span>
            </div>

            <div class="card-col card-col--actions" :class="{ 'ml-auto': !card.hasChildrens }">
                <button v-if="card.hasChildrens" @click="toggleCollapse" :class="{ 'card-expanded': isChildsCollapsed }" class="btn btn--rounded btn--primary">
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="btn__icon">
                        <path d="M4 6L8 10L12 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button class="btn btn--rounded btn--outlined">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="btn__icon">
                        <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10Z" />
                    </svg>
                </button>
            </div>
        </div>

        <transition-group v-if="card.hasChildrens" name="slide-fade">
            <Container v-if="isChildsCollapsed" :get-child-payload="getChildPayload" @drop="onDrop" :group-name="`cards-${card.id}`" v-bind="dndSettings">
                <Draggable v-for="(c, i) in card.childrens" :key="card.id">
                    <Card :card-index="`${cardIndex}.${i + 1}`" :index="i + 1" :key="i" :card="c" />
                </Draggable>
            </Container>
        </transition-group>

    </div>
</template>

<script lang="ts" setup>
import { applyDrag } from '@/utils'
import { dndSettings } from '@/config'
import { Container, Draggable } from "vue3-smooth-dnd"
import type { CardType, DnDPayloadType } from '@/types'
import { useWindowResize } from '@/composables/useWindowResize'
import { defineProps, computed, ref, onMounted, watch, inject, type PropType, type ComputedRef, type Ref } from 'vue'

const { width } = useWindowResize()

const props = defineProps({
    card: {
        type: Object as PropType<CardType>,
        required: true
    },

    index: {
        type: Number,
        required: true
    },

    cardIndex: {
        type: [Number, String],
        required: true
    }
})

const cards = inject<Ref<CardType[]>>('cards')
const nameStringMaxLength = ref<number>(28)
const subCatsStringMaxLength = ref<number>(90)

const isChildsCollapsed = ref<boolean>(false)

const cardSubcats: ComputedRef<string | undefined> = computed(() => {
    const subcats: string[] | string | undefined = props.card.hasChildrens ? props.card.childrens?.map((child: CardType) => child.name) : '-'
    const result = Array.isArray(subcats) ? subcats.join(' / ') : subcats

    return result && result.length > subCatsStringMaxLength.value ? result.substring(0, subCatsStringMaxLength.value) + "..." : result
})

const cardName: ComputedRef<string> = computed(() => {
    return props.card.name.length > nameStringMaxLength.value ? props.card.name.substring(0, nameStringMaxLength.value) + "..." : props.card.name
})

function toggleCollapse(): void {
    isChildsCollapsed.value = !isChildsCollapsed.value
}

function getChildPayload(index: number): { index: number, parentId: number | undefined } {
    const parentId = props.card.childrens && props.card.childrens[index].parentId
    
    return {
        index,
        parentId
    }
}

function updateChildrensRecursively(cards: CardType[], parentId: number, payload: DnDPayloadType) {
    for (const card of cards) {
        if (card.id === parentId) {
            card.childrens = card.childrens ? applyDrag(card.childrens, payload) : []
        } else if (card.childrens && card.childrens.length > 0) {
            updateChildrensRecursively(card.childrens, parentId, payload)
        }
    }
}

function onDrop(data: DnDPayloadType) {
    if (cards) {
        updateChildrensRecursively(cards.value, data.payload.parentId, data)
    }
}

function setStringsInitialLength(val: number) {
    if (val <= 1200) {
        subCatsStringMaxLength.value = 50
        nameStringMaxLength.value = 12
    } else {
        subCatsStringMaxLength.value = 90
        nameStringMaxLength.value = 28
    }
}

onMounted(() => {
    setStringsInitialLength(width.value)
})

watch(width, (newVal) => {
    setStringsInitialLength(newVal)
})

</script>