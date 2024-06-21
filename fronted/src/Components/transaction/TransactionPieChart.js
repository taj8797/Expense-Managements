

import React, { useEffect, useState } from 'react';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#ff9999', '#66b3ff', '#99ff99'];


export const TransactionPieChart = () => {

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if(token){
    fetchTransactions();

    }
}, [token]);


const fetchTransactions = async () => {
  try {
    const response = await fetch(
      `http://localhost:3008/api/transactionUpi/fetchAllTransaction`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Response is not JSON");
    }

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch data");
    }

    console.log("Fetching transaction=========",result);
    
    if (!Array.isArray(result)) {
      throw new TypeError("Expected result to be an array");
    }

    setTransactions(result);
    setError(null);
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
};






const aggregateTransactions = () => {
  return transactions.reduce((acc, transaction) => {
      const { type, amount } = transaction;
      if (!acc[type]) {
          acc[type] = 0;
      }
      acc[type] += amount;
      return acc;
  }, {});
};

const aggregatedData = aggregateTransactions();
const data = Object.keys(aggregatedData).map(key => ({
  name: key,
  value: aggregatedData[key]
}));
  return (

    <div style={{ textAlign: 'start' ,marginTop : "70px" }}>

    {error && <p style={{color: 'red'}}>{error}</p>}
    <PieChart width={400} height={400}>
        <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
        >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Tooltip />
        <Legend />
    </PieChart>
    {/* Buttons or form to add transactions */}
</div>
  )
}

