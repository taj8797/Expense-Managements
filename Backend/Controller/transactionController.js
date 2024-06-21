const transactionCollection = require("../model/transactionModel");

const bankCollection = require("../model/bankModel");
const Target = require("../model/TargettingCashMoel")

const mongoose = require("mongoose");

const addTransaction = async (req, res) => {
  const { type, amount, description, merchant, category, date,bankId } =
    req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bankAccount = await bankCollection.findById(bankId).session(session);

    if (!bankAccount) {
      return res.status(400).json({ message: "Bank Account not found" });
    }

    // check if the transaction is debit or credit account
    if (type === "DebitCard" || type === "UPI" || type === "CreditCard") {
      if (bankAccount.availableBalance < amount) {
        throw new Error("Insufficient balance");
      }

      bankAccount.availableBalance -= amount;
    } else {
      bankAccount.availableBalance += amount;
    }

    const transaction = new transactionCollection({
      type,
      amount,
      date,
      description,
      merchant,
      category,
      
      bankId
     
    });

    await transaction.save({ session });
    await bankAccount.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json(transaction);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};
// Get all transactions

const getAllTransactions = async (req, res) => {
  try {
    const gettransactions = await transactionCollection.find();
    if (!gettransactions) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    return res.status(200).json(gettransactions); // Send the array directly
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: error.message });
  }
};


const getTransactionsByType = async (req, res) => {
  const { type } = req.params;
  const { page = 0, limit = 2 } = req.query; // Default page to 0 and limit to 2
  const offset = page * limit;

  try {
    const transactions = await transactionCollection
      .find({ type })
      .skip(offset)
      .limit(parseInt(limit));

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "Transaction upi was not found" });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///  ========================get Transaction by lastMonth ==================

const getTransactionsByPeriod = async (req, res) => {
  try {
    const { period, page = 1, pageSize = 10 } = req.query; // Get the period from query parameters
    const currentDate = new Date();

    let startDate;

    if (period === "lastMonth") {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );
    } else if (period === "lastWeek") {
      startDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
    } else {
      return res.status(400).json({ message: "Invalid period specified" });
    }

    const totalTransactionsCount = await transactionCollection.countDocuments({
      date: { $gte: startDate },
    });

    const transactions = await transactionCollection.find({
      date: { $gte: startDate },
    })
    .skip((page - 1) * pageSize)
    .limit(parseInt(pageSize));

    return res.status(200).json({
      totalTransactionsCount,
      transactions,
      totalPages: Math.ceil(totalTransactionsCount / pageSize),
      currentPage: page
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};






const getTotalExpenses = async (req, res) => {
  try {
    const transactions = await transactionCollection.find({});
    if (!transactions) {
      return res.status(404).json({ message: "Something went wrong" });
    }

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    const currentMonthYear = `${currentMonth} ${currentYear}`;

    let currentMonthExpense = 0;
    let previousMonthsExpenses = {};

    transactions.forEach(transaction => {
      const amount = transaction.amount; // Assuming transaction has an 'amount' field
      const date = new Date(transaction.date); // Assuming transaction has a 'date' field

      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;

      if (monthYear === currentMonthYear) {
        currentMonthExpense += amount;
      } else {
        if (!previousMonthsExpenses[monthYear]) {
          previousMonthsExpenses[monthYear] = 0;
        }
        previousMonthsExpenses[monthYear] += amount;
      }
    });

    return res.status(200).json({
      currentMonthExpense,
      previousMonthsExpenses,
      transactions // Include transactions if needed for other purposes
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: error.message });
  }
};



// =======================saving goals by total expenses========================

const calculateReached = async () => {
  const expenses = await transactionCollection.find();
  return expenses.reduce((acc, transaction) => acc + transaction.amount, 0);
};

const fetchTotalExpensesByTarget = async (req, res) => {
  try {
    const reached = await calculateReached();
    if (!reached) {
      return res.status(404).json({ message: 'No expenses found' });
    }

    const target = await Target.findOne(); // Assuming there's only one target
    if (!target) {
      return res.status(404).json({ message: "Target not found" });
    }
    
    return res.status(200).json({ reached, total: target.total });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while fetching expenses' });
  }
};


// ====================================getTransaction by only lastMonth to show category spenc 

const showStaticsBar = async (req, res) => {
  try {
    const transactions = await transactionCollection.find({});
    if (!transactions) {
      return res.status(404).json({ message: "Something went wrong" });
    }

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    const currentMonthYear = `${currentMonth} ${currentYear}`;

    let currentMonthExpense = 0;
    let previousMonthsExpenses = {};

    transactions.forEach(transaction => {
      const amount = transaction.amount;
      const date = new Date(transaction.date);

      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;

      if (monthYear === currentMonthYear) {
        currentMonthExpense += amount;
      } else {
        if (!previousMonthsExpenses[monthYear]) {
          previousMonthsExpenses[monthYear] = 0;
        }
        previousMonthsExpenses[monthYear] += amount;
      }
    });

    const formattedData = {
      currentMonthExpense,
      previousMonthsExpenses: Object.entries(previousMonthsExpenses).map(([monthYear, expense]) => ({ monthYear, expense }))
    };

    return res.status(200).json(formattedData);
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: error.message });
  }
};

//============================SearchBar ===================================

// const searchTransaction = async (req,res) => {

//   try{

//     const {query}=req.query;
    // const regex = new RegExp(query,'i') //case-insensitive search

    //   const stringSearchQuery  = {
    //   $or:[
    //     { type: regex },
    //     { description: regex },
       
    //     { amount: regex },
    //     { merchant: regex },
    //     { category: regex },
    //     { status: regex }
    //   ]
    // }
    // const amountQuery = parseFloat(query);
    // let numericSearchQuery = {};
    // if (!isNaN(amountQuery)) {
    //   numericSearchQuery = { amount: amountQuery };
    // }

    // const dateQuery = new Date(query);
    // if (!isNaN(dateQuery)) {
    //   stringSearchQuery.$or.push({ date: dateQuery });
    // }

    // const searchQuery = {
    //   $or: [...stringSearchQuery.$or, numericSearchQuery],
    // };
   const searchTransaction = async (req, res) => {
      try {
        const { query, page, pageSize } = req.query;


        const pageNumber = parseInt(page) || 1;
        const limit = parseInt(pageSize) || 2;
        const skip = (pageNumber - 1) * limit;
    
    
        if (!query) {
          return res.status(400).json({ message: "Query parameter is required" });
        }
    
        const transactions = await transactionCollection.find({
          "$or": [
            { "type": { $regex: query, $options: "i" } },
            { "description": { $regex: query, $options: "i" } },
            { "merchant": { $regex: query, $options: "i" } },
            { "category": { $regex: query, $options: "i" } },
            { "status": { $regex: query, $options: "i" } },
          ]
        })
        .skip(skip)
        .limit(limit)
      

        // Count total documents matching the query for pagination info
    const totalDocuments = await transactionCollection
    .find({
      "$or": [
        { "type": { $regex: query, $options: "i" } },
        { "description": { $regex: query, $options: "i" } },
        { "merchant": { $regex: query, $options: "i" } },
        { "category": { $regex: query, $options: "i" } },
        { "status": { $regex: query, $options: "i" } },
      ]
    })
    .count();

    // Calculate total pages
    const totalPages = Math.ceil(totalDocuments / limit);

    
        if (transactions.length === 0) {
          return res.status(404).json({ message: "Can't find the data" });
        }
    
        return res.status(200).json({transactions,totalPages});
      } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: error.message });
      }
    }

module.exports = {
  addTransaction,
  getAllTransactions,
  getTransactionsByType,
  getTransactionsByPeriod,
  getTotalExpenses,fetchTotalExpensesByTarget, showStaticsBar,searchTransaction
}
