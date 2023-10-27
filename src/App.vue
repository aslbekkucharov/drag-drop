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
        <Card v-for="(card, i) in cards" :key="i" :index="i + 1" :card="card">
          <template v-if="card.hasChildrens">
            <Card v-for="(children, j) in card.childrens" :key="j" :index="subIndex(i, j)" :card="children" />
          </template>
        </Card>
      </div>

    </section>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Card from './components/Card.vue';

const cards = reactive([
  {
    id: 0,
    order: 1,
    name: 'MASTERCARD',
    hasChildrens: true,
    childrens: [
      {
        id: 0,
        hasChildrens: false,
        name: 'Максимал фойда (Нац. валюта)',
      },
      {
        id: 1,
        hasChildrens: false,
        name: 'On-line (Нац. валюта)',
      },
      {
        id: 2,
        hasChildrens: false,
        name: 'Аванс (Нац. валюта)',
      },
      {
        id: 3,
        hasChildrens: false,
        name: 'Максимал фойда (Ин. валюта)',
      },
      {
        id: 4,
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
        hasChildrens: false,
        name: 'Максимал фойда (Нац. валюта)',
      },
      {
        id: 1,
        hasChildrens: false,
        name: 'On-line (Нац. валюта)',
      },
      {
        id: 2,
        hasChildrens: false,
        name: 'Аванс (Нац. валюта)',
      },
      {
        id: 3,
        hasChildrens: false,
        name: 'Максимал фойда (Ин. валюта)',
      },
      {
        id: 4,
        hasChildrens: true,
        name: 'On-line (Ин. валюта)',
        childrens: [
          {
            id: 0,
            hasChildrens: false,
            name: 'Максимал фойда (Нац. валюта)',
          },
          {
            id: 1,
            hasChildrens: false,
            name: 'On-line (Нац. валюта)',
          },
          {
            id: 2,
            hasChildrens: false,
            name: 'Аванс (Нац. валюта)',
          },
          {
            id: 3,
            hasChildrens: false,
            name: 'Максимал фойда (Ин. валюта)',
          },
          {
            id: 4,
            hasChildrens: false,
            name: 'On-line (Ин. валюта)',
          }
        ]
      }
    ]
  }
])

function subIndex(index: number, sub: number) {
  return `${index + 1}.${sub + 1}`
}

</script>