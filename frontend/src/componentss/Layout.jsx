import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="">
        <NavBar />
      </div>
    
      <main className="pb-4">
        {/* Le composant Outlet permet d'afficher le contenu des pages spécifiques */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;