import express, { Request, Response } from "express";

import { GenerateSQL } from "./services/generateSQL";

const app = express();

const PORT = 3030

console.log('Endpoint test server:')
console.log(`Run the command 'lt --port ${PORT}' to start a tunnel
  which will be publicly available to test (like in a App Script)
  
  `)


app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/genSQL', (req : Request, res : Response) => {

  const body = req.body;

  console.log('App Script payload', body);

  const genSQL = new GenerateSQL();

  // genSQL.read
  res.send('OK')
})


app.listen(PORT)