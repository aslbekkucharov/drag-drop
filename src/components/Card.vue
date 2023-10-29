<template>
    <div class="div">
        <div class="card">

            <div class="card__inner">
                <div class="card-col card-col--numb">
                    <span class="card-col__name">№</span>
                    <span class="card-col__value">{{ cardIndex }}</span>
                </div>

                <div class="card-col card-col--name" :class="{ 'card-col--root': !card.hasChildrens }">
                    <span class="card-col__name">Название</span>
                    <span class="card-col__value">{{ card.name }}</span>
                </div>

                <div class="card-col card-col--order">
                    <span class="card-col__name">Очередность</span>
                    <span class="card-col__value">{{ card.order }}</span>
                </div>

                <div class="card-col card-col--subcats">
                    <span class="card-col__name">Подкатегории</span>
                    <span class="card-col__value">{{ cardSubcats }}</span>
                </div>

                <div v-if="card.hasChildrens" class="card-col card-col--count">
                    <span class="card-col-label card-col-label--grey">
                        <span class="card-col-label__text">12</span>
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
                <Card 
                    v-if="isChildsCollapsed" 
                    v-for="(c, i) in card.childrens"
                    :card-index="generateIndex(cardIndex, c)"
                    :key="i"
                    :card="c"
                />
            </transition-group>

        </div>

    </div>
</template>

<script lang="ts" setup>
import type { CardType } from '@/types'
import { defineProps, computed, ref, type PropType } from 'vue'

const props = defineProps({
    card: {
        type: Object as PropType<CardType>,
        required: true
    },
    cardIndex: {
        type: [Number, String],
        required: true
    }
})

const isChildsCollapsed = ref<boolean>(false)

function toggleCollapse() {
    isChildsCollapsed.value = !isChildsCollapsed.value
}

function generateIndex(parentIndex: number | string, card: CardType) {
    return `${parentIndex}.${card.order}`
}

const cardSubcats = computed(() => {
    const subcats: Array<string> | string | undefined = props.card.hasChildrens ? props.card.childrens?.map((child: CardType) => child.name) : '-'
    const result = Array.isArray(subcats) ? subcats.join(' / ') : subcats

    return result && result.length > 90 ? result.substring(0, 90) + "..." : result
})
</script>