

import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts';
import '../dashboard/SpendingOverView.css';

export const SpendingOverView = () => {
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [expenseAmounts, setExpenseAmounts] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const period = 'lastMonth';

    useEffect(() => {
        if (token) {
          getExpenseData();
        }
    }, [token, period]);

    const getExpenseData = async () => {
      try {
        const reqData = await fetch(`http://localhost:3008/api/transactionUpi/fetchTransactionByLastMonth?period=${period}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!reqData.ok) {
            throw new Error('Failed to fetch expense data');
        }

        const resData = await reqData.json();
        const categoryData = {};

        resData.transactions.forEach(transaction => {
            let category = '';
            if (typeof transaction.category === 'string') {
                category = transaction.category;
            } else if (typeof transaction.category === 'object' && transaction.category !== null) {
                category = transaction.category.name;
            }

            if (!categoryData[category]) {
                categoryData[category] = 0;
            }
            categoryData[category] += parseInt(transaction.amount);
        });

        const categories = Object.keys(categoryData);
        const amounts = Object.values(categoryData);

        setExpenseCategories(categories);
        setExpenseAmounts(amounts);
        setError(null);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    return (
        <React.Fragment>

            <div className="chart-container">
                <div className="chart">
                    <Chart
                        type="pie"
                        width={400}
                        height={400}
                        series={expenseAmounts}
                        options={{
                            title: { text: "Expenses PieChart" },
                            noData: { text: "No Data" },
                            labels: expenseCategories
                        }}
                    />
                </div>
            </div>
            {error && <div className="error">{error}</div>}
        </React.Fragment>
    );
}
