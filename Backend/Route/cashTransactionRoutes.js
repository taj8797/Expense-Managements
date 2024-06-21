
const express = require('express') 

const transactionRouter = express.Router()
const middleware =require("../middleware/userAuth")

const {createCashTransaction ,fetchCashTransaction,fetchTotalCashAmount ,createTarget ,fetchTotalTarget}  = require("../Controller/cashTransaction")



transactionRouter.post('/DataCashTransaction',middleware, createCashTransaction)



transactionRouter.get('/fetchCash',middleware, fetchCashTransaction)


transactionRouter.get('/fetchTotalCash',middleware, fetchTotalCashAmount)

transactionRouter.post('/createTarget',middleware, createTarget)


transactionRouter.get('/getTarget',middleware, createTarget)





module.exports = transactionRouter