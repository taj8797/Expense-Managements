import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import '../AddCashExpenses/addCashExpenses.css';
import { Table, Button } from 'react-bootstrap';
import { AddCashExpenses } from './AddCashExpenses';
// import EditCashExpensis from './EditCashExpensis';
// import DeleteCashExpensis from './DeleteCashExpensis';

const TableCashExpensis = () => {
  const [data, setData] = useState({
    amount: '',
    date: '',
    reason: '',
  });
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expensePerPage, setExpensePerPage] = useState(5);
  const token = localStorage.getItem('token');
  const [openModal, setOpenModal] = useState(false);
  const [editData , setEditData] =useState(false)
  const [deletModal , setDeletModal] = useState(false)
  const [editExpenses , setEditExpenses] = useState([])

  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
  }, [token, currentPage]);  //update when token or current page changes

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:3008/api/transaction/fetchCash', {
     
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
     
      console.log("response==========",response);
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Response is not JSON");
      }

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch expenses');
      }

      if (!Array.isArray(result.resultData)) {
        throw new TypeError("Expected resultData to be an array");
      }

      setExpenses(result.resultData);
      console.log("expenses====>",expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
      setError(error.message);
    }
  };

  const openExpenses = () => {
    setOpenModal(true);
  };

  const closeExpenses = () => {
    setOpenModal(false);
  };
  // const openEditData = () => {
  //   console.log("======>");
  //   setEditData(true);
  // }


  // const closeEditData = () => {
  //   setEditData(false);
  // }

  // const openDeleteModal = () => {
  //   setDeletModal(true);
  // }

  // const closeDeleteModal = () => {
  //   setDeletModal(false);
  // }

  // const getExpensesUpdate = (val) => {
  //   console.log('val=============',val);
  //   setEditExpenses(val)
  //   openEditData()

    
    
  // }
  // console.log('editExpenses',editExpenses);


  const indexOfLastExpense = currentPage * expensePerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensePerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);
  console.log("");

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="form-fetchContainer">
      <h2 style={{position : "absolute0",top : "400px",left : "50%"}}>Cash Expenses</h2>
      <div style={{position :"absolute" ,right :"100px",top :"300px"}}>
      <Button variant="primary" style={{width :"200px",marginTop : "400px"}} onClick={openExpenses}><FiPlus /></Button>
      </div>
      <Table striped bordered hover style={{position : "absolute",top : "400px",width :"70%"}}>
        <thead className='thead-design'>
          <tr>
            <th>Sl.No</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Amount</th>
            
          </tr>
        </thead>
        <tbody>
          {currentExpenses.map((expense, index) => (
            <tr key={expense._id}>
              <td>{index + 1}</td>
              <td>{expense.reason}</td>
              <td>{expense.amount}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              {/* <td>


                <button

                onClick={() =>getExpensesUpdate(expense._id) }
                >
                <FiEdit />

                </button>
               
                <FiTrash2 onClick={() =>openDeleteModal() } />
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(expenses.length / expensePerPage) }).map((_, index) => (
          <li key={index} className="page-item">
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>

      {openModal && <AddCashExpenses close={closeExpenses} />}

      {/* {editData&&<EditCashExpensis editData={editExpenses}  close={closeEditData}/>}
      
      {deletModal&& <DeleteCashExpensis close = {closeDeleteModal} />} */}
    </div>
  );
};

export default TableCashExpensis;
