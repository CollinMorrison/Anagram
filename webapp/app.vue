<script setup lang="ts">
// state isPlaying controls the game state
const isPlaying = useState('isPlaying', () => false)
</script>

<template>
  <div>
    <h1>Word Scramble</h1>
    <!-- if you're playing the game, render the game -->
    <div v-if="isPlaying">
      TEST
    </div>

    <!-- otherwise, render the welcome content -->
    <div v-else>
      <button @click="isPlaying = true">Start Game</button>
    </div>
  </div>
</template>

<script lang="ts">
// import WordService from '@/WordService.ts'
export default {
  data() {
    return {
      scrambledWord: '',
      word: '',
      guessedWords: [],
    }
  }
}
</script>
