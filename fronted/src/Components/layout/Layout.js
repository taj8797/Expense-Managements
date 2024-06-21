import React from "react";

import { Header } from "../layout/header/Header.js";

import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/Sidebar.js";

import { Footer } from "../footer/Footer.js";

const Layout = () => {
  return (
    <div>
      <section>
      <Sidebar />
        {/* <Header /> */}
        {/* <div className="content"> */}
        <section>
          <Outlet />
        </section>

          {/* <Footer /> */}
        {/* </div> */}
      </section>
    </div>
  );
};

export default Layout;
