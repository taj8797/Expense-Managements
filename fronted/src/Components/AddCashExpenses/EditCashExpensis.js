
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

const EditCashExpensis = ({close,editData}) => {
  console.log("editData====>",editData);
  const [data , setdata] = useState()


  return (

   <>

<Modal show={true} onHide={close} size='lg'>

<Modal.Header closeButton>
<Modal.Title>Edit Expenses</Modal.Title>
</Modal.Header>

<div className='container-Modal'>


<div className="form-container"> 
<form className="transaction-form">

<div className='parnt-div'>
        <div className='cld-1'>
        <input
          type="date"
          name="date"
          placeholder='Date'
          // value={data.date}
          // onChange={handleChange}
          required
        />
        </div>
        <div className='cld-2'>
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          // value={data.reason}
          // onChange={handleChange}
          required
        />
        </div>

         <div className='cld-3'>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          // value={data.amount}
          // onChange={handleChange}
          required
        />
        </div>
         </div>
         <div>
        <button type="submit">Update</button>
      
        </div>



</form>

</div>
</div>



</Modal>
   </>
  )
}

export default EditCashExpensis