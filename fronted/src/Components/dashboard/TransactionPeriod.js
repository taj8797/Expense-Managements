import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'; // Assuming you are using Bootstrap for buttons

export const TransactionPeriod = () => {
  const [transactions, setTransactions] = useState([]);
  const [period, setPeriod] = useState('lastMonth');
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Start with page 1
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 7; // Adjust as needed
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchTransactions(page);
    }
  }, [token, period, page]); // Update useEffect dependencies

  const fetchTransactions = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:3008/api/transactionUpi/fetchTransactionByLastMonth?period=${period}&page=${page}&pageSize=${pageSize}`,
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

      console.log("Fetching transactions:", result);
      setTransactions(result.transactions || []); // Update transactions with data array or empty array if no data
      setTotalPages(result.totalPages);
      setError(null);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(error.message);
    }
  };

  const loadPrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const loadNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="transaction-container" style={{marginTop : "100px"}}>
      <div className="transaction-header">
        <h2 className='mb-4'>Last transactions</h2>
        <select className='select-month' onChange={(e) => setPeriod(e.target.value)} value={period}>
          <option value="lastMonth">Month</option>
          <option value="lastWeek">Week</option>
        </select>
      </div>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            <div className="d-flex space-bothside">
              <span>{transaction.category}</span>
              <div className="transaction-amount">
                {transaction.amount}
              </div>
            </div>
            <div>
              <span>{transaction.type}</span>
              <small>({transaction.paymentMethod})</small>
            </div>
            {showMore && (
              <div>
                {/* Additional transaction details */}
                <p>{transaction.description}</p>
                <small>{transaction.date}</small>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="pagination">
        <Button variant="outline-secondary" onClick={loadPrevious} disabled={page === 1}>
          &#x2190; Previous
        </Button>
        <Button variant="outline-secondary" onClick={loadNext} style={{ marginLeft: '10px' }} disabled={page >= totalPages}>
          Next &#x2192;
        </Button>
      </div>

      {/* Error handling */}
      {error && <div className="error">{error}</div>}
    </div>
  );
};
