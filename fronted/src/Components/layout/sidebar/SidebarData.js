

import React from 'react'
import { Link } from 'react-router-dom';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import RepeatSharpIcon from '@mui/icons-material/RepeatSharp';
import AccountBalanceSharpIcon from '@mui/icons-material/AccountBalanceSharp';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';

export  const SidebarData = [
     {
      title : "Expense management",
     },

  {
      title : "Dashboard" ,
      icon : <HomeSharpIcon/>,
      Link: '/dashboard'

  },

  {
    title : "Transaction" ,
    icon : <RepeatSharpIcon/>,
    Link: '/transactions'

},

{
  title : "Bank Accounts and cards" ,
  icon : <AccountBalanceSharpIcon/>,
  Link: '/bankAndCard'

},

{
  title : "Add cash expenses" ,
  icon : <PaymentsIcon/>,
  Link: '/add-cash-expenses'

},



{
  title : "Add Transaction" ,
  icon : <AddBoxRoundedIcon/>,
  Link: '/addTransaction'

},
{
  title : "Add Cards" ,
  icon : <AddBoxRoundedIcon/>,
  Link: '/addCards'

},

{
  title : "Add bank account" ,
  icon : <AddBoxRoundedIcon/>,
  Link: '/addBankAccount'

},

// {
//   title : "Settings" ,
//   icon : <SettingsApplicationsRoundedIcon/>,
//   Link: '/setting'

// },

{
  title : "Log out" ,
  icon : <HouseSidingIcon/>,
  Link: '/logout'

}

]
 
