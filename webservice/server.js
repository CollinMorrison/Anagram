import express from 'express';
import fetch from 'node-fetch';
import { config as dotenvConfig } from 'dotenv';
import cors from 'cors';

// initialize app
const app = express();
app.use(cors());

//Accepts a GET request
app.get('/word', (req, res) => {

    // prepare the request
    const url = 'https://random-word-api.herokuapp.com/word'
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }

    let response = {
        word: null,
        scrambledWord: null
    }

    // make the request
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            // return 500 if the response is not a single word
            if (json.length !== 1) {
                res.status(500).send("Error: the word API either returned more than one word or no words at all")
            }
            response.word = json[0]

            // return 500 if the word is null
            if(response.word === null) { 
                res.status(500).send("Error: There is an error with the word API")
            }

            // this splits the word by each character, then sorts the characters
            // randomly, then joins them back together
            response.scrambledWord = response.word.split('').sort(() => Math.random() - 0.5).join('')

            // send the response
            res.status(200).send(response)
        })

})

app.listen(3001, () => console.log("App is listening on port 3001"))

//export for testing
export default app;