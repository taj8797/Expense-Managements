import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const StaticsExpenseShow = () => {
  const token = localStorage.getItem('token');

  const [error, setError] = useState(false);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Expenses',
        backgroundColor: 'rgba(194, 116, 161, 0.5)',
        borderColor: 'rgb(194, 116, 161)',
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    const period = 'lastWeek';
    try {
      const response = await fetch(`http://localhost:3008/api/transactionUpi/fetchTransactionByLastMonth?period=${period}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const resultData = await response.json();
     
      const expensesData = resultData;

      // Check if previousMonthsExpenses is defined before accessing its properties
      if (expensesData && expensesData.previousMonthsExpenses) {
        const labels = expensesData.previousMonthsExpenses.map(item => item.monthYear);
        const dataValues = expensesData.previousMonthsExpenses.map(item => item.expense);

        setData({
          labels: labels,
          datasets: [
            {
              label: 'Expenses',
              backgroundColor: 'rgba(194, 116, 161, 0.5)',
              borderColor: 'rgb(194, 116, 161)',
              data: dataValues,
            },
          ],
        });
      } else {
        console.log('No previous months expenses data available');
        setError('No data available');
      }
    } catch (error) {
      console.log('Error fetching data:', error);
      setError(error.message);
    }
  };

  return (
    <CDBContainer>
      <div style={{ width: '1400px', height: '320px', marginTop: '300px', marginLeft: '320px' }}>
        <h3 style={{ marginLeft: '50px' }}>Statistics</h3>
        {error ? (
          <p style={{ color: 'red' }}>Failed to fetch data: {error}</p>
        ) : (
          <Bar data={data} options={{ responsive: true }} />
        )}
      </div>
    </CDBContainer>
  );
};
