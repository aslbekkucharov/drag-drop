<template>
  <main class="wrapper">
    <section class="section">

      <div class="section__header">
        <h2 class="section__title">Список тем обращения и продуктов</h2>
        <span class="search-result">
          <span class="search-result__label">Найдено: {{ cards.length }}</span>
        </span>
      </div>
          
      <Container @drop="onDrop" v-bind="dndSettings" group-name="cards-">
        <Draggable v-for="(card, i) in cards" :key="card.id">
          <Card :card="card" :card-index="i + 1" />
        </Draggable>
      </Container>

    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { applyDrag } from '@/utils'
import { dndSettings } from '@/config'
import Card from '@/components/Card.vue'
import type { CardType, DnDResultType } from '@/types'
import { Container, Draggable } from "vue3-smooth-dnd"

const cards = ref<Array<CardType>>([
  {
    id: 213,
    order: 1,
    name: 'MASTERCARD',
    hasChildrens: true,
    childrens: [
      {
        id: 21389,
        order: 1,
        hasChildrens: false,
        name: 'Максимал фойда (Нац. валюта)',
      },
      {
        id: 2134,
        order: 2,
        hasChildrens: false,
        name: 'On-line (Нац. валюта)',
      },
      {
        id: 45234,
        order: 3,
        hasChildrens: false,
        name: 'Аванс (Нац. валюта)',
      },
      {
        id: 6154,
        order: 4,
        hasChildrens: false,
        name: 'Максимал фойда (Ин. валюта)',
      },
      {
        id: 33124,
        order: 5,
        hasChildrens: false,
        name: 'On-line (Ин. валюта)',
      }
    ]
  },
  {
    id: 12341,
    order: 2,
    name: 'Максимал фойда (Нац. валюта)',
    hasChildrens: true,
    childrens: [
      {
        id: 6512,
        order: 1,
        hasChildrens: false,
        name: 'Максимал фойда (Нац. валюта)',
      },
      {
        id: 18212,
        order: 2,
        hasChildrens: false,
        name: 'On-line (Нац. валюта)',
      },
      {
        id: 439818,
        order: 3,
        hasChildrens: false,
        name: 'Аванс (Нац. валюта)',
      },
      {
        id: 9281,
        order: 5,
        
        hasChildrens: true,
        name: 'On-line (Ин. валюта)',
        childrens: [
          {
            id: 213781,
            order: 1,
            hasChildrens: false,
            name: 'Максимал фойда (Нац. валюта)',
          },
          {
            id: 2138,
            order: 2,
            hasChildrens: false,
            name: 'On-line (Нац. валюта)',
          },
          {
            id: 2349218,
            order: 3,
            hasChildrens: false,
            name: 'Аванс (Нац. валюта)',
          }
        ]
      }
    ]
  }
])

function onDrop(dropResult: DnDResultType) {
  cards.value = applyDrag(cards.value, dropResult)
}
</script>