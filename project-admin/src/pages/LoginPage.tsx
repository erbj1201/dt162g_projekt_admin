//LoginPage.tsx
//Import
import Footer from "../components/Footer";
import Login from "../components/Login";
import AddUser from "../components/AddUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Component
export const LoginPage = () => {
  //Hook navigation
  const navigate = useNavigate();
  //Token from localstorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (token) {
      navigate("/");
    }
  });
  return (
    <div>
      {/*import-component*/}
      <Login />
      <AddUser />
      <Footer />
    </div>
  );
};

export default LoginPage;
