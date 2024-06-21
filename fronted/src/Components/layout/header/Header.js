import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

import "../header/header.css";
import { useAuthContext } from "../../../Hooks/UseAuthContext";
import { SearchBar } from "../Searchbar/SearchBar";

export const Header = () => {
    const { user } = useAuthContext();
    console.log("user=====", user);

    return (
        <div className="header-navbar">

            <SearchBar/>
            {/* <div className="search-box">
                <input type="text" placeholder="search..." />
                <i className="bi bi-search search-icon"></i>
            </div> */}
            <div className="user-box">
                <i className="bi bi-person-circle user-icon"></i>
                {
                    user ? (
                        <div className="navbar-user">
                            <p style={{color : "black"}}>Welcome, {(user.username)}</p>
                            {/* <i className="bi bi-bell-fill user-icon"></i> */}
                        </div>
                    ) : (
                        <span className="user-name">Loading user info...</span>
                    )
                }
            </div>
        </div>
    );
};
