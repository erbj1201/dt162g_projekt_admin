//MenuPage.tsx
//import
import MenuComponent from "../components/MenuData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddMenuItemComponent from "../components/AddMenu";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

//Component
const MenuPage: React.FC = () => {
  //Hook navigation
  const navigate = useNavigate();
  //Token from localstorage
  const token = localStorage.getItem("token");

  //Effect hoook check auth
  useEffect(() => {
    // If not logged in, redirect to login
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div>
      {/*Including components*/}
      <Header />
      <main className="container mx-auto">
        <AddMenuItemComponent />
        <MenuComponent />
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;
