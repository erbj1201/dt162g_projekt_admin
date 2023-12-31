//Login.tsx
//Import
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Component
const Login: React.FC = () => {
  //Hook navigation
  const navigate = useNavigate();
  //State for storing data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //Event for handling input-changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //Event for handling login
  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Fetch
    try {
      const response = await fetch("http://127.0.0.1:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      //Response ok, get token and store
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        // Store the token in localStorage
        localStorage.setItem("token", token);
        // Redirect to menu-page
        navigate("/");
      } else {
        //Error login
        console.error("Login failed:", response.statusText);
      } //Error login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <main className="container text-center">
        {/*Login-form*/}
        <h1 className="p-5 m-5">Logga in</h1>
        <form
          className="form-control form-control-sm border-0 p-2 mx-auto w-100"
          onSubmit={loginUser}
        >
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Mejladress:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Lösenord:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-secondary mt-2">
            Logga in
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
