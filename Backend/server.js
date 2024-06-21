const express =require("express")
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser');
const { Configuration, PlaidApi, PlaidEnvironments }  = require('plaid')
const cors = require("cors")

app.use(express.json())

app.use(cors())
const cron = require("node-cron")



// const configuration = new Configuration({
//   basePath: PlaidEnvironments.sandbox,
//   baseOptions: {
//     headers: {
//       'PLAID-CLIENT-ID': process.env.CLIENT_ID,
//       'PLAID-SECRET': process.env.SANDBOX_SECRET,
//     },
//   },
// });
// const client = new PlaidApi("configuration", configuration)
// app.use(bodyParser.json());

require('dotenv').config()
 



const port = 3008 || process.env.PORT


const emailRoutes = require("./Route/authRoutes")

const userRoutes = require("./Route/authRoutes")

const bankRoutes = require('./Route/bankRoutes')

const cashRoutes = require("./Route/cashTransactionRoutes")

const TransactinRoutes =require('./Route/transactionRoutes')

app.use('/api/bank',bankRoutes)



app.use('/api/transaction',cashRoutes)

app.use('/api/user', userRoutes)

app.use('/api/email',emailRoutes)

app.use('/api/transactionUpi',TransactinRoutes)




app.get('/',(req,res)=> {
  res.send("this is home page")
})



mongoose.connect(process.env.MongoUri)
.then(() => {
 
  app.listen(port, ()=> {
    console.log(`Server is running on Port ${port}`);
  })
}).catch((err) => {
  console.log('db is not connected',err);
})




