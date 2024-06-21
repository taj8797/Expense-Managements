import React from "react";
import '../dashboard/dashboard.css';
import { TransactionPeriod } from "./TransactionPeriod";
import { TotalBalanceLeft } from "./TotalBalanceLeft";
import { TargetCashGoal } from "./TargetCashGoal";
import { SpendingOverView } from "./SpendingOverView";
import { TotalExpenses } from "./TotalExpenses";
import { TotalExpensesGoal } from "./TotalExpensesGoal";
import { StaticsExpenseShow } from "./StaticsExpenseShow";
import { Header } from "../layout/header/Header";
import { Footer } from "../footer/Footer";



export const Dashboard = () => {


  return (
<>
    <Header/>
    
    <>

     <h2 className="head-dash">Dashboard</h2>
  
     </>
   <>
   <div className="container-first">
    <TotalExpenses />
   
   <TotalBalanceLeft />
     <TransactionPeriod /> 
   
    
  
     </div>
     {/* <div>
       <StaticsExpenseShow />
     </div> */}
     

     </>
     
   
    <TotalExpensesGoal/>
     <SpendingOverView />
     <TargetCashGoal />
     <Footer/>
    </>
  );
};


