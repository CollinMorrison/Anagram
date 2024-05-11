<template>
  <div class="bg-gradient-to-b from-slate-600 to-slate-950 h-screen bg-fixed">
  <div class="flex items-center justify-center h-screen">
    <div class="bg-slate-600 shadow-xl pr-10 pl-10 rounded-xl flex flex-col justify-center items-center relative w-3/4 h-auto">
    <h1 class="text-5xl font-bold mb-10 mt-5">Word Scramble</h1>
    <!-- if you're playing the game, render the game -->
    <div v-if="isPlaying">
      <p class="font-bold mb-5 text-xl flex justify-center"> Scrambled Word: <span class="text-2xl ml-3 flex justify-center">{{ scrambledWord }}</span></p>
      <div class="flex justify-center">
        <input
          type="text"
          placeholder="Enter your guess"
          @change="handleInputChange"
          v-model="currentGuess"
          class="border-2 border-gray-300 rounded-lg w-1/2 mb-5"
        />
        <button @click="handleGuess()" class="border-2 border-gray-300 rounded-lg pl-2 pr-2 ml-3 max-h-7">Guess</button>
      </div>
      <div>
        <div>
          <p class="font-bold text-lg flex justify-center mb-2">Guessed Words:</p>
          <ul class="font-bold flex justify-center mb-3">
            <li v-for="word in guessedWords" class="m-2">{{ word }}</li>
          </ul>
        </div>
      </div>
      <div v-if="guessedCorrectly">
        <div class="flex justify-center mt-5">
          <p class="font-bold">You guessed {{ word }} correctly! Would you like to play again?</p>
        </div>
        <div class="flex justify-center mt-5 mb-5">
          <button class="border-2 border-gray-300 rounded-lg pl-2 pr-2 ml-3 max-h-7" @click="startGame">Play Again</button>
          <button class="border-2 border-gray-300 rounded-lg pl-2 pr-2 ml-3 max-h-7" @click="quitGame">Quit</button>
        </div>
      </div>
    </div>

    <!-- otherwise, render the welcome content -->
    <div v-else>
      <p class="font-bold flex justify-center mb-5">Welcome to Word Scramble!</p>
      <p class="font-bold flex justify-center">This is a game for only the most clever of wordists. Once you have embarked on this mission, 
        you will have to utilize the computer between your ears to unscramble the word. 
        Don't worry - this isn't some sick game that only gives you a certain number of lives. 
        You can guess until you get the word correct, and you will be shown the words you have already guessed. 
        Be aware, however, that this may not be easy. Click "Start Game", and enjoy!</p>
      <div class="flex justify-center">
        <button class="border-2 border-gray-300 rounded-lg pl-2 pr-2 ml-3 max-h-7 mb-5 mt-5" @click="startGame">Start Game</button>
      </div>
    </div>
  </div>
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
        alert('Invalid guess. Please try again. Your guess must only include letters in the word, may not be a repeat guess, and may not exceed the length of the word.')
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

    // quit the game
    quitGame() {
      this.isPlaying = false
      alert('Thanks for playing!')
    },

    // make sure the guess follows the rules
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
