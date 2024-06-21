

const bankCollection = require('../model/bankModel')

const createBankAccount = async(req,res) => {
  

     try{

    
     const  resultdata = await bankCollection.create(req.body)

     if(!resultdata){
      return res.status(404).send({message : "Error creating bank Account"})
     }
      
     return res.status(200).send({message : "Bank Account created successfully",resultdata})
      
}catch(error){
     console.log('error====',error.message);

     res.status(404).send({message : "Data created successfully"
     })
}

}


//========================================getBankAccount ===========================


const getBankAccount = async(req,res) => {

     try{

          const resultGetData = await bankCollection.find({}).sort({createdAt : -1})
          if(!resultGetData){
               return res.status(404).send({message : "Something went wrong"

               })
             }

             return res.status(200).json(resultGetData)
     }catch(error){
          console.log('error',error.message );

          return res.status(500).send({message : "Invalid Server"})
     }
}


//========================================Delete Bank Account  ===========================

const updateBankAccount = async(req,res)=> {
     const id = req.params.id

     try{
          const resultUpdateData = await bankCollection.findByIdAndUpdate({_id :id},req.body,{new : true})
        if(!resultUpdateData){

          return res.status(404).send({message : "Something went wrong"})

          }
          return res.status(200).send({message : "Bank Account updated successfully",resultUpdateData})
          
     }catch(error){
               console.log('error',error.message );

               return res.status(500).send({message : "Invalid Server"})
          }

     }


     //================================deleteBank Account ==================

     const deleteBankAccount = async(req,res) => {
          const id = req.params.id

          try{
               const resutlDelete= await bankCollection.findByIdAndDelete({_id :id})
               
               if(!resutlDelete){
                    return res.status(404).send({message : "Something went wrong"})
               }


               return res.status(200).send({message : "Bank Account deleted successfully"})
          }catch(error){


               console.log('error====',error.message);

               return res.status(500).send({message : "Invalid server "})



     }

}

const cardCollection =require('../model/CardModel')


//===================================Add Cards ==========================

const createCard = async(req,res) => {


     try{

          const resultData = await cardCollection.create(req.body)
          if(!resultData){
               return res.status(404).send({message : "Something went wrong"})
          }

          return res.status(200).send({message : "Card create Successfully",resultData})
     }catch(error){

          console.log('error',error.message);
          return res.status(500).send({message : "Invalid Server"})
     }
}


// =====================================fetch Card ============================================
const getCardDetails = async(req,res) => {

     try{

          const resultGetData = await cardCollection.find({}).sort({createdAt : -1})
          if(!resultGetData){
               return res.status(404).send({message : "Something went wrong"

               })
             }

             return res.status(200).json(resultGetData)
     }catch(error){
          console.log('error',error.message );

          return res.status(500).send({message : "Invalid Server"})
     }
}

///==============================update Card Detials ========================================

const updateCardDetails = async(req,res)=> {
     const id = req.params.id

     try{
          const resultUpdateData = await cardCollection.findByIdAndUpdate({_id :id},req.body,{new : true})
        if(!resultUpdateData){

          return res.status(404).send({message : "Something went wrong"})

          }
          return res.status(200).send({message : "Card  updated successfully",resultUpdateData})
          
     }catch(error){
               console.log('error',error.message );

               return res.status(500).send({message : "Invalid Server"})
          }

     }



     //==================================delete Card Detials =================================

     const deleteCardDetails= async(req,res) => {
          const id = req.params.id

          try{
               const resutlDelete= await cardCollection.findByIdAndDelete({_id :id})
               
               if(!resutlDelete){
                    return res.status(404).send({message : "Something went wrong"})
               }


               return res.status(200).send({message : "Card details deleted successfully",resutlDelete})
          }catch(error){


               console.log('error====',error.message);

               return res.status(500).send({message : "Invalid server "})



     }

}


///============================total bank balance ============================


const totalBankBalance = async (req, res) => {
  try {
    const accounts = await bankCollection.find();
    console.log("account======",accounts);

    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ message: 'No bank accounts found' });
    }
    const AvailableBalance = accounts.reduce((total, account) => total + account.availableBalance, 0);
    res.json({ AvailableBalance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch balances' });
  }
}




module.exports = {createBankAccount ,getBankAccount ,updateBankAccount ,
      deleteBankAccount ,createCard ,getCardDetails ,updateCardDetails, deleteCardDetails ,totalBankBalance}