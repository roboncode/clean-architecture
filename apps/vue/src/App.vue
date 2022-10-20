<script setup lang="ts">
import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import { ref } from 'vue'
import { getConcreteNumberTrivia, getRandomNumberTrivia } from './api/numberTrivia'
import { INumberTrivia } from 'business/numberTrivia/domain/entities/INumberTrivia'


const number = ref('')
const trivia = ref<INumberTrivia>()

const handleInputChange = (evt: any) => number.value = evt.target.value

const searchTriviaFromInput = async () => {
  const numberTrivia = await getConcreteNumberTrivia(number.value)
  trivia.value = numberTrivia
}

const searchRandomTrivia = async () => {
  const numberTrivia = await getRandomNumberTrivia()
  trivia.value = numberTrivia
}
</script>

<template>
  <div className="w-screen h-screen bg-base color-base flex justify-center items-center gap-4">
    <div class="fixed top-0 left-0 w-full flex items-center p-4">
      <div class="text-xl font-bold">Clean Architecture Vue Example</div>
      <div class="flex-grow"></div>
      <a href="https://github.com/roboncode/clean-architecture" target="_blank"><sl-icon name="github" class="text-2xl"></sl-icon></a>
    </div>
    <sl-card class="shadow-lg w-full max-w-md">
      <div slot="header" class="flex items-center gap-2 text-xl font-bold">
        <img src="./assets/vue.svg" class="w-6" alt="Vue logo" />
        <div>Number Trivia</div>
      </div>
      <div class="grid gap-4">
        <div v-if="trivia" class="text-center space-y-2">
          <div class="text-4xl font-bold">{{trivia.number}}</div>
          <div class="text-lg">{{trivia.text}}</div>
        </div>
        <sl-input type="number" placeholder="Input a number" size="large" class="w-full" @input="handleInputChange">
          <sl-icon name="search" slot="prefix"></sl-icon>
        </sl-input>
        <div class="flex gap-4">
          <sl-button variant="success" class="w-full" @click="searchTriviaFromInput"> Search </sl-button>
          <sl-button class="w-full" @click="searchRandomTrivia"> Get Random Trivia </sl-button>
        </div>
      </div>
    </sl-card>
  </div>
</template>
