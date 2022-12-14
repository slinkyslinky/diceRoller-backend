import express from "express";
import routes from './routes/index.js';
import cors from 'cors';
import fs from 'node:fs';
import bodyParser from 'body-parser'


import { getPoolResult } from "./functions/getPoolResult.js";
import { calculatePoolResult } from "./functions/calculatePoolResult.js";

import { getDiceResult } from "./functions/getDiceResult.js";
import { calculateStatistic } from "./functions/calculateStatistic.js";



const app = express();
const port = 8000;

app.listen(port, () => {
   console.log('all work...');
})
app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', 'https://dise-roller.vercel.app');
   res.setHeader('Access-Control-Allow-Methods', 'GET');
   res.setHeader('Access-Control-Allow-Methods', 'POST');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
})
app.use(cors())
app.use(bodyParser.json())


app.get('/files/systemsList', (req, res) => {
   let text = fs.readFileSync('./files/systemsList.json', 'utf8')
   res.send(text)
})
let diceSystem = ''

app.get('/files/mysystemImg', (req, res) => {
   let text = fs.readFileSync('./files/mysystemImg.json', 'utf8')
   res.send(text)
})

diceGetter("common")
diceGetter("mysystem")
diceGetter("genesys")

function diceGetter(system) {
   app.get(`/files/${system}Dice`, (req, res) => {
      let text = fs.readFileSync(`./files/${system}Dice.json`, 'utf8')
      res.send(text)
      diceSystem = system

   })


}


app.post('/functions/roll', (req, res) => {
   const rolledPool = getPoolResult(req.body);
   const resultObject = calculatePoolResult(diceSystem, rolledPool)

   res.send({ "pool": rolledPool, "result": resultObject.pool, "status": resultObject.status })
})

app.post('/functions/statistic', (req, res) => {
   const arrayOfResultPool = []

   for (let i = 0; i < 10; i++) {
      const rolledPool = getPoolResult(req.body);
      arrayOfResultPool.push(calculatePoolResult(rollRule, rolledPool).pool)
   }

   calculateStatistic(statisticRule, arrayOfResultPool)
   // res.send{"result":}
   // const rolledPool = getPoolResult(req.body);
   // const resultObject = calculatePoolResult(rollRule, rolledPool)
   // res.send({ "pool": rolledPool, "result": resultObject.pool, "status": resultObject.status })
})

app.post('/functions/reroll', (req, res) => {

   const numberOfDice = req.body.numberOfDice;
   const pool = req.body.resultOfRoll.pool
   const newValue = getDiceResult(req.body.dice);

   pool[numberOfDice] = newValue
   const resultObject = calculatePoolResult(rollRule, pool)


   res.send({ "pool": pool, "result": resultObject.pool, "status": resultObject.status })
})



