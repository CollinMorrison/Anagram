<script setup>
// state isPlaying controls the game state
let isPlaying = useState('isPlaying', () => false)
let guessedCorrectly = useState('guessedCorrectly', () => false)
</script>

<template>
  <div>
    <h1>Word Scramble</h1>
    <!-- if you're playing the game, render the game -->
    <div v-if="isPlaying">
      <p> Scrambled Word: </p>
      <p>{{ scrambledWord }}</p>
      <div>
        <input
          type="text"
          placeholder="Enter your guess"
          @change="handleInputChange"
          v-model="currentGuess"
        />
        <button
          @click="handleGuess()"
        >
        Guess
        </button>
      </div>
      <div>
        <div>
          <p>Guessed Words:</p>
          <ul>
            <li v-for="word in guessedWords">{{ word }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- otherwise, render the welcome content -->
    <div v-else>
      <p>Welcome to Word Scramble!</p>
      <p>This is a game for only the most clever of wordists. Once you have embarked on this mission, 
        you will have to utilize the computer between your ears to unscramble the word. 
        Don't worry - this isn't some sick game that only gives you a certain number of lives. 
        You can guess until you get the word correctly, and you will be shown the words you have already guessed. 
        Be aware, however, that this may not be easy. Click "Start Game", and enjoy!</p>
      <button @click="startGame">Start Game</button>
    </div>
  </div>
</template>

<script>
import WordService from '@/WordService.ts'
export default {
  data() {
    return {
      scrambledWord: '',
      word: '',
      guessedWords: [],
      currentGuess: '',
    }
  },
  methods: {
    handleGuess() {
      console.log("handleGuess")
      console.log("current guess: " + this.currentGuess)
      // if the guess is correct, set guessedCorrectly to true
      // and add the word to the guessedWords array
      if (this.currentGuess === this.word) {
        guessedCorrectly.value = true
      }
      this.guessedWords.push(this.currentGuess)
      this.currentGuess = ''
    },
    handleInputChange(e) {
      console.log("handling change: " + e.target.value)
      this.currentGuess = e.target.value
    },
    async startGame() {
      console.log("starting game")
      // isPlaying.value = true
      let wordObject = await WordService.getWord()
      console.dir(wordObject)
    }
  },
}
</script>
