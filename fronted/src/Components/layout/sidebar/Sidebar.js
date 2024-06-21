





import React from 'react'
import { SidebarData } from './SidebarData'
import {sidebar} from '../sidebar/sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../Hooks/UseAuthContext'





export  const Sidebar = () => {
  const navigate = useNavigate()
const {dispatch}  = useAuthContext()
     
  const handleItemClick = (item) => {
    if (item.Link === '/logout') {
      localStorage.removeItem('user')
      dispatch({ type: 'LOGOUT' })
      navigate('/')
    } else {
      navigate(item.Link)
    }
  }

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li key={key} className={`row ${window.location.pathname === val.Link ? "active" : ""}`} onClick={() => { handleItemClick(val); }}>
              <div id="icon">{val.icon}</div> 
              <div id="title">{val.title}</div> 
            </li>
          );
        })}
      </ul>
    </div>
  );
}



// import React, { useState } from 'react';
// import { SidebarData } from './SidebarData';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../../Hooks/UseAuthContext';
// import '../sidebar/sidebar.css'; // assuming this is the correct path

// export const Sidebar = () => {
//   const navigate = useNavigate();
//   const { dispatch } = useAuthContext();
//   const [dropdown, setDropdown] = useState(null);

//   const handleItemClick = (item) => {
//     if (item.link === '/logout') {
//       localStorage.removeItem('user');
//       dispatch({ type: 'LOGOUT' });
//       navigate('/');
//     } else {
//       navigate(item.link);
//     }
//   };

//   const handleDropdownClick = (title) => {
//     setDropdown(dropdown === title ? null : title);
//   };

//   return (
//     <div className="Sidebar">
//       <ul className="SidebarList">
//         {SidebarData.map((val, key) => {
//           return (
//             <li key={key} className={`row ${window.location.pathname === val.link ? "active" : ""}`}>
//               <div id="icon">{val.icon}</div>
//               <div id="title" onClick={() => val.subMenu ? handleDropdownClick(val.title) : handleItemClick(val)}>
//                 {val.title}
//               </div>
//               {val.subMenu && dropdown === val.title && (
//                 <ul className="DropdownList">
//                   {val.subMenu.map((subItem, subKey) => (
//                     <li key={subKey} className={`row ${window.location.pathname === subItem.link ? "active" : ""}`} onClick={() => handleItemClick(subItem)}>
//                       <div id="title">{subItem.title}</div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };
