<template>
  <main class="wrapper">
    <section class="section">

      <div class="section__header">
        <h2 class="section__title">Список тем обращения и продуктов</h2>
        <span class="search-result">
          <span class="search-result__label">Найдено: 3</span>
        </span>
      </div>

      <div class="cards">
        <Card 
          v-for="(card, i) in cards"
          :key="i"
          :card="card"
          :draggable="true"
          :card-index="card.order"
          @dragstart="onDragStart(i)" 
          @dragover="onDragOver(i)" 
          @dragend="onDragEnd" 
          @drop="onDrop(i)"
        />
      </div>

    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { CardType } from '@/types'
import Card from './components/Card.vue'

const cards = reactive<Array<CardType>>([
  {
    id: 0,
    order: 1,
    name: 'MASTERCARD',
    hasChildrens: true,
    childrens: [
      {
        id: 0,
        order: 1,
        hasChildrens: false,
        name: 'Максимал фойда (Нац. валюта)',
      },
      {
        id: 1,
        order: 2,
        hasChildrens: false,
        name: 'On-line (Нац. валюта)',
      },
      {
        id: 2,
        order: 3,
        hasChildrens: false,
        name: 'Аванс (Нац. валюта)',
      },
      {
        id: 3,
        order: 4,
        hasChildrens: false,
        name: 'Максимал фойда (Ин. валюта)',
      },
      {
        id: 4,
        order: 5,
        hasChildrens: false,
        name: 'On-line (Ин. валюта)',
      }
    ]
  },
  {
    id: 1,
    order: 2,
    name: 'Максимал фойда (Нац. валюта)',
    hasChildrens: true,
    childrens: [
      {
        id: 0,
        order: 1,
        hasChildrens: false,
        name: 'Максимал фойда (Нац. валюта)',
      },
      {
        id: 1,
        order: 2,
        hasChildrens: false,
        name: 'On-line (Нац. валюта)',
      },
      {
        id: 2,
        order: 3,
        hasChildrens: false,
        name: 'Аванс (Нац. валюта)',
      },
      {
        id: 3,
        order: 4,
        hasChildrens: false,
        name: 'Максимал фойда (Ин. валюта)',
      },
      {
        id: 4,
        order: 5,
        
        hasChildrens: true,
        name: 'On-line (Ин. валюта)',
        childrens: [
          {
            id: 0,
            order: 1,
            hasChildrens: false,
            name: 'Максимал фойда (Нац. валюта)',
          },
          {
            id: 1,
            order: 2,
            hasChildrens: false,
            name: 'On-line (Нац. валюта)',
          },
          {
            id: 2,
            order: 3,
            hasChildrens: false,
            name: 'Аванс (Нац. валюта)',
          },
          {
            id: 3,
            order: 4,
            hasChildrens: false,
            name: 'Максимал фойда (Ин. валюта)',
          },
          {
            id: 4,
            order: 5,
            hasChildrens: false,
            name: 'On-line (Ин. валюта)',
          }
        ]
      }
    ]
  }
])

const draggingIndex = ref<number | null>(null)

function onDragStart(index: number) {
  draggingIndex.value = index
}

function onDragOver(index: number) {
  if (index !== draggingIndex.value && draggingIndex.value !== null) {
    // Swap items in the array
    const draggedItem = cards[draggingIndex.value]
    cards.splice(draggingIndex.value, 1)
    cards.splice(index, 0, draggedItem)
    draggingIndex.value = index
  }
}

function onDragEnd() {
  draggingIndex.value = null
}

function onDrop(index: number) {

}

</script>