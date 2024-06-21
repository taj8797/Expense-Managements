

const CashCollection =require('../model/transaction-Cash-Model')


const createCashTransaction = async(req,res) => {


  try{

const resultData = await CashCollection.create(req.body)

if(!resultData){

  return res.status(404).json({message : "Invalid trasaction data"})
}

return res.status(201).json(resultData)

  }catch(err) {
    console.log(err);
    res.status(500).send({message:"An error occurred while creating the transaction"})
  }
}


//=====================fetch Cash transaction-Transaction================

const fetchCashTransaction = async(req,res) => {


  try{

const resultData = await CashCollection.find()

if(!resultData){

  return res.status(404).json({message : "Invalid trasaction data,",resultData})
}

return res.status(200).json({message :  "Fetch cash Transaction successfully ",  resultData})

  }catch(err) {
    console.log(err);
    res.status(500).send({message:"An error occurred while creating the transaction"})
  }
}


// ==================================update Cash Transaction================================

const updateCashTransaction = async(req,res) => {


  try{

const resultData = await CashCollection.findByIdAndUpdate(req.params.id,req.body,{new : true})

if(!resultData){

  return res.status(404).json({message : "Invalid trasaction data"})
}

return res.status(201).json(resultData)

  }catch(err) {
    console.log(err);
    res.status(500).send({message:"An error occurred while creating the transaction"})
  }
}



//=============================create target amount ===========================
const targetCollection =require('../model/TargettingCashMoel')

const createTarget = async (req, res) => {
  try {
    const { total } = req.body; // Assuming the total is provided in the request body
    const target = new targetCollection({ total });
    if(!target){
      return res.status(400).json({ message: 'Invalid target data' });
    }
    await target.save();
    res.status(201).json(target); // Return the created target
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to create target' });
  }
};



///========================get total amount ====================

const fetchTotalTarget = async (req, res) => {

  try{

    const resultData = await targetCollection.find()
    if (!resultData) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    return res.status(200).json(resultData); // Send the array directly
  }catch(error){

    console.log('error',error.message);
    return res.status(500).json({ message: error.message });
  }

}

//==============================calculated total reached based on expeses  ================================




const calculateReached = async () => {
  const expenses = await CashCollection.find();
  return expenses.reduce((acc, transaction) => acc + transaction.amount, 0);
};

const fetchTotalCashAmount = async (req, res) => {
  try {
    const reached = await calculateReached();
    if (!reached) {
      return res.status(404).json({ message: 'No expenses found' });
    }

    const target = await targetCollection.findOne(); // Assuming there's only one target
    if (!target) {
      return res.status(404).json({ message: "Target not found" });
    }
    
    return res.status(200).json({ reached, total: target.total });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while fetching expenses' });
  }
};


module.exports = {createCashTransaction  ,fetchCashTransaction ,updateCashTransaction ,fetchTotalCashAmount ,createTarget ,fetchTotalTarget}