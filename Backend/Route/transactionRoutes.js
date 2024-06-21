


const express = require('express');

const middleware = require('../middleware/userAuth')
const transactionRouter = express.Router()
const {addTransaction ,getAllTransactions  ,getTransactionsByType ,getTransactionsByPeriod ,getTotalExpenses,fetchTotalExpensesByTarget ,showStaticsBar,searchTransaction} = require('../Controller/transactionController')

transactionRouter.post('/CreateTransaction',middleware,addTransaction)

transactionRouter.get('/fetchAllTransaction',middleware,getAllTransactions)

transactionRouter.get('/fetchTransactionByType/:type',middleware,getTransactionsByType)



transactionRouter.get('/fetchTransactionByLastMonth',middleware,getTransactionsByPeriod)

transactionRouter.get('/fetchTransactionExpenses',middleware,getTotalExpenses)


transactionRouter.get('/fetchExpensesByGoal',middleware,fetchTotalExpensesByTarget)


transactionRouter.get('/fetchStaticsData',middleware,showStaticsBar)

//==========================Search Transaction =========================

transactionRouter.get('/searchTransactionData',middleware,searchTransaction)







// transactionRouter.get('/getExpesesByCategories',middleware,showExpenseCategoriesWise)




module.exports = transactionRouter