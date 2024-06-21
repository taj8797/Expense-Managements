import React from 'react';
import  './App.css'
import { Login } from './pages/login/Login';
import { Route, Routes} from 'react-router-dom';
import Register from './pages/register/Register';
import { ForgotPassword } from './pages/forgotPassword/ForgotPassword';
import { OtpVerify } from './pages/otpVerify/OtpVerify';
import VerifyOtp from './pages/VerifyOtp/VerifyOtp';
import { ResetPassword } from './pages/resetPassword/ResetPassword';
import { AddCashExpenses } from './Components/AddCashExpenses/AddCashExpenses';
import { BankAccountCard } from './Components/bankAccount-andCard/BankAccountCard';

import { AddBankAccount } from './Components/AddBankAccount/AddBankAccount';
import {Dashboard}  from './Components/dashboard/Dashboard';

import Layout from './Components/layout/Layout';
import { AddCreditCard } from './Components/AddCredit/AddCreditCard';
import { Transaction } from './Components/transaction/Transaction';
import { AddTransaction } from './Components/transaction/AddTransaction';
import TableCashExpensis from './Components/AddCashExpenses/TableCashExpensis';
import { Setting } from './Components/Setting/Setting';
import { ThemeProvider } from 'react-bootstrap';


// import { Header } from './Components/layout/header/Header';

export const App = () => {
  return (
    <div className='App'>
      <ThemeProvider>
      <Routes>
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgotPassword' element={<ForgotPassword/>} />
      <Route path='/verifyOtpEmail' element={<OtpVerify />}/>
      <Route path='/verifyOtp' element={<VerifyOtp/>}/>
      <Route path='/reset-Password' element={<ResetPassword/>}/>

      {/* <Route path='/layout' element={<Layout/>}/> */}
      <Route  element={<Layout />}> 
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/add-cash-expenses'  element={<TableCashExpensis/>}/>
      <Route path='/addCards' element={< AddCreditCard/>}/>
      <Route path='/addBankAccount'  element={<AddBankAccount/>}/>
      <Route path='/bankAndCard'  element={<BankAccountCard/>}/>
     
      
      <Route path='/transactions' element={< Transaction/>}/>

      <Route path='/addTransaction' element={<AddTransaction/>}/>



      <Route path='/setting' element={<Setting/>}/>


      </Route>


      </Routes>
      </ThemeProvider>

    </div>
  );
};


