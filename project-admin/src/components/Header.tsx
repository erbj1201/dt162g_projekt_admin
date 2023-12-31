//Header.tsx
//Import
import React from "react";
import Nav from "../components/MainNav";
import heroImage from "../assets/header_coffe.jpg";
//Component
const Header: React.FC = () => {
  return (
    <header className="page-header container-fluid w-100 mx-auto">
      <a href="/" className="logo mx-auto">
        CoffeCake Café
      </a>
      <div className="hero-image-container mx-auto">
        <img
          className="img-fluid page-header w-100 mx-auto"
          src={heroImage}
          alt="Hero"
        />
      </div>
      <Nav />
    </header>
  );
};

export default Header;
