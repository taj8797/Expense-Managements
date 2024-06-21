





// src/components/ExpenseCard.js
import React, { useEffect, useState } from 'react';
import '../dashboard/totalExpenses.css'

export const TotalExpenses = () => {
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const [previousMonthsExpenses, setPreviousMonthsExpenses] = useState({});
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

 
  useEffect(()=> {
    fetchTotalExpense()

  },[token])

    const fetchTotalExpense = async () => {
          try {
            const response = await fetch('http://localhost:3008/api/transactionUpi/fetchTransactionExpenses', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
      
            if (!response.ok) {
              throw new Error('Failed to fetch balance');
            }
      
            const data = await response.json();
            setCurrentMonthExpense(data.currentMonthExpense);
            setPreviousMonthsExpenses(data.previousMonthsExpenses);
          } catch (error) {
            console.error(error);
            setError(error.message);
          }
        };
  return (
    <div className="card1">
    <h2 className='current-month'>Current Month's Expense: ₹{currentMonthExpense.toFixed(2)}</h2>
    <h3 className='previous-month'>Previous Months' Expenses:</h3>
    <ul className="monthly-expenses">
      {Object.entries(previousMonthsExpenses).map(([month, expense]) => (
        <li key={month}>
          {month}: ₹{expense.toFixed(2)}
        </li>
      ))}
    </ul>
  </div>
  );
};


