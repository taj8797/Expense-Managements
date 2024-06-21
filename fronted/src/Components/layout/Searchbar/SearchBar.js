// import React, { useEffect, useState } from 'react';
// import '../Searchbar/SearchBar.css';

// export const SearchBar = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [filteredExpenses, setFilteredExpenses] = useState([]);
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (token) {
//       fetchAllexpenses();
//     }
//   }, [token]);

//   const fetchAllexpenses = async () => {
//     try {
//       const response = await fetch('http://localhost:3008/api/transactionUpi/fetchAllTransaction', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();
//       console.log('Data from API:', data); // Debugging: Log data to check its structure
//       setExpenses(data.results || []); // Ensure data.results is not undefined
//       setFilteredExpenses(data.results || []); // Initialize filteredExpenses with all expenses
//     } catch (error) {
//       console.log(error.message);
//       setError(error.message);
//     }
//   };

//   const handleSearch = async () => {
  
//     try {
//       if (query) {
//         const response = await fetchFilteredExpenses(query);
//         console.log('Search Response:', response); // Debugging: Log the search response
//       } else {
//         setFilteredExpenses(expenses); // Reset to all expenses if query is empty
//       }

//       setError(null); // Clear any previous errors
//     } catch (error) {
//       console.log(error.message);
//       setError(error.message);
//       setFilteredExpenses([]); // Reset filtered expenses on error
//     }
//   };

//   const fetchFilteredExpenses = async (query) => {
//     try {
//       const response = await fetch(`http://localhost:3008/api/transactionUpi/searchTransactionData?query=${query}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       });

//       console.log("Response from search API:", response); // Debugging: Log the response object

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();
//       console.log("Data from search API:", data); // Debugging: Log the data

//       setFilteredExpenses(data.results || []); // Ensure data.results is not undefined
//       return data;
//     } catch (error) {
//       console.log(error.message);
//       setError(error.message);
//       setFilteredExpenses([]); // Reset filtered expenses on error
//     }
//   };


//   return (
//     <div className="dashboard-content">
//     {/* Other dashboard content here */}
    
//     {/* Add search bar container */}
//     <div className="search-bar-container">
//       <input 
//         type="text" 
//         className="search-input" 
//         placeholder="Search transactions..." 
//         onChange={(e)=> {
//           setQuery(e.target.value) //update query on input change 
//         }}
//       />
//       <button className="search-button">Search</button>
//     </div>
    
//     <div className="last-transactions-container">
//       <h3>Last transactions</h3>
//       <ul className="results-list">
//         {filteredExpenses.length > 0 ? (
//           filteredExpenses.map((transaction, index) => (
//             <li key={index} className="result-item">
//               {transaction.type} - {transaction.description} - {transaction.merchant} - {transaction.category} - {transaction.status}
//             </li>
//           ))
//         ) : (
//           <p className="no-results">No results found</p>
//         )}
//       </ul>
//     </div>
//   </div>
  
    
//   );
// };
// import React, { useEffect, useState } from 'react';
// import '../Searchbar/SearchBar.css';

// export const SearchBar = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [filteredExpenses, setFilteredExpenses] = useState([]);
  
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [responseResult, setResponseResult] = useState([]);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (token) {
//       fetchAllexpenses();
//     }
//   }, [token]);

//   useEffect(() => {
//     console.log('Expenses state updated:', expenses);
//     console.log('Results state updated:', results);
//     console.log('FilteredExpenses state updated:', filteredExpenses);
//   }, [expenses, results, filteredExpenses]);

//   const fetchAllexpenses = async () => {
//     try {
//       const response = await fetch('http://localhost:3008/api/transactionUpi/fetchAllTransaction', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       });
       
     

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();
//       console.log('Data from API111111111111111111111111111111111111111111111111111111111:', data); // Debugging: Log data to check its structure
//       setResponseResult(data)

//       // Check if data.results exists and is an array
//       if (Array.isArray(data)) {
//         setExpenses(data);
//         setResults(data);
//         setFilteredExpenses(data);
//       } else {
//         throw new Error('Invalid data structure');
//       }
//     } catch (error) {
//       console.log(error.message);
//       setError(error.message);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       let response = [];
//       if (query) {
//         response = await fetchFilteredExpenses(query);
//         console.log('Search Response:', response); // Debugging: Log the search response
//       } else {
//         // Assuming fetchFilteredExpenses can fetch all expenses if no query is provided
//         response = await fetchFilteredExpenses(); 
//       }
  
//       setFilteredExpenses(response); // Update the state with the response
//       setError(null); // Clear any previous errors
//       console.log('FilteredExpenses after handleSearch:', response); // Log the updated filtered expenses
//     } catch (error) {
//       console.log(error.message);
//       setError(error.message);
//       setFilteredExpenses([]); // Reset filtered expenses on error
//     }
//   };

//   const fetchFilteredExpenses = async (query) => {
//     try {
//       const response2 = await fetch(`http://localhost:3008/api/transactionUpi/searchTransactionData?query=${query}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       });
  
//       console.log("Response from search API:", response2); // Debugging: Log the response object
  
//       if (!response2.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const data = await response2.json(); // Ensure the response body is parsed
//       console.log("Parsed data from search API:", data); // Debugging: Log the parsed data
  
    
//       if (data && data.results) {
//         setFilteredExpenses(data.results); // Ensure data.results is not undefined
//         console.log("Filtered Expenses after search:", data.results); // Log filtered expenses after search
//       } else {
//         console.log("No results found in the response");
//         setFilteredExpenses([]); // Handle case where results are not found
//       }
  
//       return data;
//     } catch (error) {
//       console.log(error.message);
//       setError(error.message);
//       setFilteredExpenses([]); // Reset filtered expenses on error
//     }
//   };
  
//   return (
//     <div className="dashboard-content">
//       {/* Other dashboard content here */}
      
//       {/* Add search bar container */}
//       <div className="search-bar-container">
//         <input 
//           type="text" 
//           className="search-input" 
//           placeholder="Search transactions..." 
//           value={query}
//           onChange={(e) => setQuery(e.target.value)} // Update query state on input change
//         />
//         <button className="search-button" onClick={handleSearch}>Search</button> {/* Call handleSearch on button click */}
//       </div>
      
//       <div className="last-transactions-container">
//         <h3 className='search-head'>Last transactions</h3>

//         {error && <p>{error}</p>}
//         <ul className="results-list">
//           {/* {response.length > 0 ? ( */}
//             {responseResult.map((transaction, index) => (
//               <li key={transaction._id || index} className="result-item"> {/* Ensure a unique key */}
//                 <div>Type: {transaction.type}</div>
//                 <div>Description: {transaction.description}</div>
//                 <div>Merchant: {transaction.merchant}</div>
//                 <div>Category: {transaction.category}</div>
//                 <div>Status: {transaction.status}</div>
//                 <div>Amount: {transaction.amount}</div>
//                 <div>Bank ID: {transaction.bankId}</div>
//               </li>
//             ))}
//           {/* ) : (
//             <p>No transactions found.</p> */}
          
//         </ul>
//       </div>
//     </div>
//   );
// };


// import React, { useEffect, useState } from 'react';
// import { Row, Col } from 'react-bootstrap';
// import '../Searchbar/SearchBar.css';

// export const SearchBar = () => {
//   // const [expenses, setExpenses] = useState([]);
//   const [filteredExpenses, setFilteredExpenses] = useState([]);
//   const [query, setQuery] = useState('');
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1); // Start with page 1
//   const [totalPages, setTotalPages] = useState(0);

//   const pageSize = 2;
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (token) {
//       fetchFilteredExpenses(query, page); // fetchAllexpenses();
//     }


//     // On component mount, check if there's any stored search data and clear it
//     const storedSearchData = sessionStorage.getItem('searchData');
//     if (storedSearchData) {
//       sessionStorage.removeItem('searchData');
//     }
//   }, [token]);



//   useEffect(() => {
//     if (token) {
//       fetchFilteredExpenses(query, page); // Fetch initial data
//     }
//   }, [token, page]); // Fetch whenever token or page changes


  // const fetchAllexpenses = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3008/api/transactionUpi/fetchAllTransaction', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }

  //     const data = await response.json();
  //     console.log('Data from API:', data);

  //     if (Array.isArray(data)) {
  //       // setExpenses(data);
  //       setFilteredExpenses(data);
        
  //     } else {
  //       throw new Error('Invalid data structure');
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     setError(error.message);
  //   }
  // };

  // const handleSearch = async () => {
  //   try {
  //     if (query) {
  //       const response = await fetchFilteredExpenses(query,page);
  //       console.log('Search Response:', response);
  //       setFilteredExpenses(response); // Update the state with the response
  //       setTotalPages(response.totalPages); // Update total pages
  //     } else {
  //       setFilteredExpenses(expenses); // Reset to all expenses if query is empty
  //     }

  //     setError(null); // Clear any previous errors
  //     console.log('FilteredExpenses after handleSearch:', filteredExpenses);
  //   } catch (error) {
  //     console.log(error.message);
  //     setError(error.message);
  //     setFilteredExpenses([]); // Reset filtered expenses on error
  //   }
  // };

  // const fetchFilteredExpenses = async (query,page) => {
  //   try {
  //     const response = await fetch(`http://localhost:3008/api/transactionUpi/searchTransactionData?query=${query}&page=${page}&pagiSize=${pageSize}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`
  //       }
  //     });

  //     console.log("Response from search API:", response);

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const data = await response.json();
  //     console.log("Parsed data from search API:", data);

  //     if (data && Array.isArray(data)) {
  //       return data; // Return the filtered results
  //     } else {
  //       console.log("No results found in the response");
  //       return [];
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     setError(error.message);
  //     return []; // Return an empty array on error
  //   }
  // };

//   const fetchFilteredExpenses = async (query, page) => {
//     try {
//       const response = await fetch(`http://localhost:3008/api/transactionUpi/searchTransactionData?query=${query}&page=${page}&pageSize=${pageSize}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();
//       setFilteredExpenses(data); // Update filtered expenses with new data
//       setTotalPages(data.totalPages); // Update total pages from API response

//     } catch (error) {
//       console.log('Error fetching data:', error.message);
//       setError(error.message);
//       setFilteredExpenses([]);
//       setTotalPages(0);
//     }
//   };
  
//   const handleSearch = () => {
//     setPage(1); // Reset page to 1 when performing a new search
//     fetchFilteredExpenses(query, 1); // Fetch data for the first page
//   };

//   const loadPrevious = () => {
//     if (page > 1) {
//       const newPage = page - 1;
//       setPage(newPage);
//       fetchFilteredExpenses(query, newPage);
//     }
//   };

//   const loadNext = () => {
//     if (page < totalPages) {
//       const newPage = page + 1;
//       setPage(newPage);
//       fetchFilteredExpenses(query, newPage);
//     }
//   };


//   return (
//     <div className="dashboard-content">
//       <div className="search-bar-container">
//         <input 
//           type="text" 
//           className="search-input" 
//           placeholder="Search transactions..." 
//           value={query}
//           onChange={(e) => setQuery(e.target.value)} // Update query state on input change
//         />
//         <button className="search-button" onClick={handleSearch}>Search</button> {/* Call handleSearch on button click */}
//       </div>
//       {filteredExpenses.length > 0 && (
//         <div className="last-transactions-container">
//           <h3 className="search-head">Details Transactions</h3>

//           {error && <p>{error}</p>}

//           <Row>
//             {filteredExpenses.map((transaction, index) => (
//               <Col key={transaction._id || index} md={4}>
//                 <div className="result-item">
//                   <div>Type: {transaction.type}</div>
//                   <div>Category: {transaction.category}</div>
//                   <div>Date: {transaction.date}</div>
//                   <div>Amount: {transaction.amount}</div>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//            {/* Pagination controls */}
//            <div className="pagination">
//             <button onClick={loadPrevious} disabled={page <= 1}>Previous</button>
//             <span> Page {page} of {totalPages} </span>
//             <button onClick={loadNext} disabled={page >= totalPages}>Next</button>
//           </div>
          
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import { Row, Col,Button } from 'react-bootstrap';
import '../Searchbar/SearchBar.css';

export const SearchBar = () => {
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Start with page 1
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 2;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchFilteredExpenses(query, page);
    }

    // On component mount, check if there's any stored search data and clear it
    const storedSearchData = sessionStorage.getItem('searchData');
    if (storedSearchData) {
      sessionStorage.removeItem('searchData');
    }
  }, [token]);

  useEffect(() => {
    if (token && query !== '') {
      fetchFilteredExpenses(query, page);
    }
  }, [token, page]); // Fetch whenever token or page changes

  const fetchFilteredExpenses = async (query, page) => {
    try {
      const response = await fetch(`http://localhost:3008/api/transactionUpi/searchTransactionData?query=${query}&page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setFilteredExpenses(data.transactions); // Update filtered expenses with new data
      setTotalPages(data.totalPages); // Update total pages from API response

    } catch (error) {
      console.log('Error fetching data:', error.message);
      setError(error.message);
      setFilteredExpenses([]);
      setTotalPages(0);
    }
  };

  const handleSearch = () => {
    setPage(1); // Reset page to 1 when performing a new search
    fetchFilteredExpenses(query, 1); // Fetch data for the first page
  };

  const loadPrevious = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchFilteredExpenses(query, newPage);
    }
  };

  const loadNext = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      fetchFilteredExpenses(query, newPage);
    }
  };

  return (
    <div className="dashboard-content">
      <div className="search-bar-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search transactions..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state on input change
        />
        <button className="search-button" onClick={handleSearch}>Search</button> {/* Call handleSearch on button click */}
      </div>
      {filteredExpenses.length > 0 && (
        <div className="last-transactions-container">
          <h3 className="search-head">Details Transactions</h3>

       

          <Row style={{marginLeft : "80px",marginTop : "40px" ,justifyContent :"space-between"}}>
            {filteredExpenses.map((transaction, index) => (
              <Col key={transaction._id || index} md={4}>
                <div className="result-item">
                  <div>Type: {transaction.type}</div>
                  <div>Category: {transaction.category}</div>
                  <div>Date: {transaction.date}</div>
                  <div>Amount: {transaction.amount}</div>
                </div>
              </Col>
            ))}
          </Row>
           {/* Pagination controls */}
           <div className="pagination d-flex justify-content-between align-items-center mt-4">
            <Button variant="primary" onClick={loadPrevious} disabled={page <= 1}>Previous</Button>
            <span style={{ marginTop: "5px", fontWeight: "bold" }}> Page {page} of {totalPages} </span>
            <Button variant="primary" onClick={loadNext} disabled={page >= totalPages}>Next</Button>
          </div>
          
        </div>
      )}
    </div>
  );
};
