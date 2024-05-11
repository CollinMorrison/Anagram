<!-- <script setup>
// state isPlaying controls the game state
let isPlaying = useState('isPlaying', () => false)
let guessedCorrectly = useState('guessedCorrectly', () => false)
</script> -->

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
        <button @click="handleGuess()">Guess</button>
      </div>
      <div>
        <div>
          <p>Guessed Words:</p>
          <ul>
            <li v-for="word in guessedWords">{{ word }}</li>
          </ul>
        </div>
      </div>
      <div v-if="guessedCorrectly">
        <p>You guessed {{ word }} correctly! Would you like to play again?</p>
        <button @click="startGame">Play Again</button>
      </div>
    </div>

    <!-- otherwise, render the welcome content -->
    <div v-else>
      <p>Welcome to Word Scramble!</p>
      <p>This is a game for only the most clever of wordists. Once you have embarked on this mission, 
        you will have to utilize the computer between your ears to unscramble the word. 
        Don't worry - this isn't some sick game that only gives you a certain number of lives. 
        You can guess until you get the word correct, and you will be shown the words you have already guessed. 
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
      isPlaying: false,
      guessedCorrectly: false
    }
  },
  methods: {
    // handle the guess, determine if it's correct
    handleGuess() {
      // if the guess is correct, set guessedCorrectly to true
      // and add the word to the guessedWords array
      if (this.currentGuess === this.word) {
        this.guessedCorrectly = true
      }
      this.guessedWords.push(this.currentGuess)
      this.currentGuess = ''
    },

    // update currentGuess with what's being typed in the input field
    handleInputChange(e) {
      this.currentGuess = e.target.value
    },

    // start the game, get the word and its scrambled version
    async startGame() {
      this.isPlaying = true
      this.guessedCorrectly = false
      this.guessedWords = []
      let wordObject = await WordService.getWord()
      //TODO: implement error handling
      this.scrambledWord = wordObject.scrambledWord
      this.word = wordObject.word

      // I'm leaving this here for testing purposes
      console.dir(wordObject)
    }
  },
}
</script>
