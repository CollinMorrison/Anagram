<template>
  <div>
    <h1 class="text-5xl font-bold">Word Scramble</h1>
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
        <button @click="quitGame">Quit</button>
      </div>
    </div>

    <!-- otherwise, render the welcome content -->
    <div v-else>
      <p>Welcome to Word Scramble!</p>
      <p class="">This is a game for only the most clever of wordists. Once you have embarked on this mission, 
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

      // if the guess is valid, add it to the guessedWords array
      if (this.validateGuess()) {
        this.guessedWords.push(this.currentGuess)
      }
      else {
        // if the guess is not valid, alert the user
        alert('Invalid guess. Please try again. Your guess must only include letters in the word, and not exceed the length of the word.')
       }
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
      if (!wordObject) alert("Please start the server and reload the page")
      //TODO: implement error handling
      this.scrambledWord = wordObject.scrambledWord
      this.word = wordObject.word

      // I'm leaving this here for testing purposes
      console.dir(wordObject)
    },

    quitGame() {
      this.isPlaying = false
      alert('Thanks for playing!')
    },

    validateGuess() {
      let currentGuessArray = this.currentGuess.split('')
      let wordArray = this.word.split('')

      // if the current guess is longer than the word, return false
      if (currentGuessArray.length > wordArray.length) {
        return false
      }

      // if the current guess has already been guessed, return false
      if (this.guessedWords.includes(this.currentGuess)) {
        return false
      }

      // if any of the letters in the current guess are not in the word, return false
      for (let i = 0; i < currentGuessArray.length; ++i) {
        if (!wordArray.includes(currentGuessArray[i])) {
          return false
        }
      }

      // guess is valid
      return true
    }
  },
}
</script>
