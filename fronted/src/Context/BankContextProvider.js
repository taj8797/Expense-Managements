// src/BankContext.js
import React, { createContext, useReducer } from 'react';

export const BankContext = createContext();

const initialState = {
  bankAccounts: []
};

const bankReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACCOUNTS':
      return {
        ...state,
        bankAccounts: action.payload
      };
    case 'ADD_ACCOUNT':
      return {
        ...state,
        bankAccounts: [...state.bankAccounts, action.payload]
      };
    case 'DELETE_ACCOUNT':
      return {
        ...state,
        bankAccounts: state.bankAccounts.filter(account => account.accountNumber !== action.payload)
      };
    default:
      return state;
  }
};

export const  BankProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bankReducer, initialState);

  const setAccounts = (accounts) => {
    dispatch({ type: 'SET_ACCOUNTS', payload: accounts });
  };

  const addAccount = (account) => {
    dispatch({ type: 'ADD_ACCOUNT', payload: account });
  };

  const deleteAccount = (accountNumber) => {
    dispatch({ type: 'DELETE_ACCOUNT', payload: accountNumber });
  };

  return (
    <BankContext.Provider value={{ state, setAccounts, addAccount, deleteAccount }}>
      {children}
    </BankContext.Provider>
  );
};


