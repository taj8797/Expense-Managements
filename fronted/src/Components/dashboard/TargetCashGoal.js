

import React, { useEffect, useState } from 'react'
import '../dashboard/targetCashGoal.css'
import {ProgressBar,} from 'react-bootstrap';

export const TargetCashGoal = () => {

  const [reached , setReached] = useState()
  const [total, setTotal ] = useState()
  const [error, setError] = useState()
 const token = localStorage.getItem('token')

 useEffect(()=> {
   if(token){
    fetchData()
   
   }
 },[token])




    const fetchData = async () => {
      try {
        const reachedResponse = await fetch('http://localhost:3008/api/transaction/fetchTotalCash',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!reachedResponse.ok) {
          throw new Error('Failed to fetch reached amount');
        }
        const reachedData = await reachedResponse.json();
        setReached(reachedData.reached);

        const totalResponse = await fetch('http://localhost:3008/api/transaction/getTarget',{
          method : "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },

        });
        if (!totalResponse.ok) {
          throw new Error('Failed to fetch total amount');
        }
        const totalData = await totalResponse.json();
        setTotal(totalData.total);
      } catch (error) {
        setError(error.message);
      }
    };

    const progress = Math.round((reached / total) * 100);

  return (
    
    <div className="card cash-progress2">
      {error && <p className="error-message">{error}</p>}
      <div className="card-body">
        <div className="header1">
          <h5 className="card-title">Cash expenses</h5>
          <p className="card-subtitle mb-2 text-muted">Month</p>
        </div>
        <div className="circular-progress">
          <div className="circle">
            <div className="inner-circle">
              {/* <span>{progress}%</span> */}
            </div>
          </div>
        </div>
        <div className="details1">
          <p><strong>{progress}% Reached</strong></p>
          <p>Rs.{reached} out of Rs.{total}</p>
        </div>
        {/* <div className="actions">
          <button className="edit-button btn btn-primary">Edit your target spending</button>
          <button className="add-goal-button btn btn-secondary">+ Add goal</button>
        </div> */}
      </div>
    </div>
  )
}

