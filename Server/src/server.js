const express = require("express")
const https = require("https")
const cors = require("cors")

require('dotenv').config({ path: '../.env' })

const port = process.env.PORT;

const app = express()

const api = require("./apis/index.api");
const logger = require("./middlewares/auth/index");




app.use("/api",api)

app.get("/", logger , (req, res) => {
  res.send("Hello World");
});

app.use((req,res)=>{
  res.status(501).send("incorrect path")
})

app.listen(port,()=>{
  console.log(`server run on port ${port}`)
})