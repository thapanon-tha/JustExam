const express = require("express")
const https = require("https")
const cors = require("cors")
const port = 3000 || process.env.PORT;

const app = express()

app.listen(port,()=>{
  console.log(`server run on port ${port}`)
})