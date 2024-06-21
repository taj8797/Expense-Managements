



const express = require("express")

const bankRouter = express.Router()
const middleware = require("../middleware/userAuth")

const {createBankAccount ,getBankAccount ,updateBankAccount , deleteBankAccount,
  createCard ,getCardDetails ,updateCardDetails, deleteCardDetails ,totalBankBalance} = require('../Controller/bank-Controller')

//======================Bank Route===========================

bankRouter.post('/createBankAcc',middleware,createBankAccount)

bankRouter.get('/getBankAcc',middleware,getBankAccount)


bankRouter.put('/updateBankAcc/:id',middleware,updateBankAccount)


bankRouter.delete('/deleteBankAcc/:id',middleware,deleteBankAccount)

//=============================Card Route ==============================

bankRouter.post('/createCard',middleware,createCard)

bankRouter.get('/getCard',middleware,getCardDetails)

bankRouter.put('/updateCard/:id',middleware,updateCardDetails)


bankRouter.delete('/deleteCard/:id',middleware,deleteCardDetails)


bankRouter.get('/getBankBalance',middleware,totalBankBalance)



module.exports = bankRouter
