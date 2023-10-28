<template>
    <div class="div">
        <div class="card">

            <div class="card__inner">
                <div class="card-col card-col--numb">
                    <span class="card-col__name">№</span>
                    <span class="card-col__value">{{ index }}</span>
                </div>

                <div class="card-col card-col--name" :class="{ 'card-col--root': !card.hasChildrens }">
                    <span class="card-col__name">Название</span>
                    <span class="card-col__value">{{ card?.name }}</span>
                </div>

                <div class="card-col card-col--order">
                    <span class="card-col__name">Очередность</span>
                    <span class="card-col__value">{{ card?.order }}</span>
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
                    <button v-if="card.hasChildrens" @click="toggleCollapse" class="btn btn--rounded btn--primary">
                        <span class="icon icon--chewron-down"></span>
                    </button>
                    <button class="btn btn--rounded btn--outlined">
                        <span class="icon icon--dots"></span>
                    </button>
                </div>
            </div>

            <transition-group name="slide-fade">
                <slot v-if="isChildsCollapsed"></slot>
            </transition-group>

        </div>

    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue'

const props = defineProps({
    card: {
        type: Object,
        required: true
    },
    index: {
        type: [Number, String],
        requried: true
    }
})

const isChildsCollapsed = ref<boolean>(false)

function toggleCollapse() {
    isChildsCollapsed.value = !isChildsCollapsed.value
}

const cardSubcats = computed(() => {
    const subcats = props.card.hasChildrens ? props.card.childrens.map((ch: object) => ch.name) : '-'
    const result = Array.isArray(subcats) ? subcats.join(' / ') : subcats

    return result.length > 90 ? result.substring(0, 90) + "..." : result
})

</script>