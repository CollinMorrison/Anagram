import express from 'express';
import fetch from 'node-fetch';
import { config as dotenvConfig } from 'dotenv';
import cors from 'cors';

const app = express();

app.use(cors());

//Accepts a GET request
app.get('/word', (req, res) => {

    const url = 'https://random-word-api.herokuapp.com/word'
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }

    let response = fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log(json)
        })

})

app.listen(3001, () => console.log("App is listening on port 3001"))