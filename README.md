# Welcome to the Anagram game!

## Guide for running this app
* Clone this repository into the desired directory
  
### Starting the back-end
* Navigate to the "webservice" directory in the terminal
* run `npm i` to install dependencies
* run `node server.js` to start the back-end server
* "App is listening on port 3001" will print in the terminal

### Starting the front-end
* Navigate to the "webapp" directory in the terminal
* run `npm i` to install dependencies
* run `npm run dev` to start the locally hosted web-page
* Navigate to https://localhost:3000 in your browser, and the main page should render

### Navigating the app
This is a simple game that prompts the user to unscramble the Anagram provided. Previous guesses are listed, and each guess must be unique, not be longer than the word, and not include letters that aren't present in the word.

### Notes and what I would've done next
I started building testing with mocha and chai into the back end, but didn't quite get it working within the time limit. I would finish implementing that. In addition, there's a potential flaw/security risk with this game as it is written, though it is minor. If the user is tech savvy, they can access the unscrambled word since it is stored on the client (not including the console statement I included for testing purposes - you can test all the functionality and cheat by using that). I would implement a database connection that stores each unscrambled word and does the guess validation on the back end to secure the answer. 

I would also finish implementing the functionality to get successful sub-words. I didn't quite get to that before I realized it was a requirement.