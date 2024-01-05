//AddUser.tsx
//Import
import React, { useState, FormEvent } from "react";
import DOMPurify from "dompurify";
//Structure for UserItem
interface UserItem {
  email: string;
  password: string;
}
//Component
const AddUser: React.FC = () => {
  //State store data
  const [newUser, setNewUser] = useState<UserItem>({
    email: "",
    password: "",
  });

  //State to show/hide register-form
  const [showRegisterUser, setRegisterUser] = useState<boolean>(false);
  const [userAddedMessage, setUserAddedMessage] = useState<string | null>(null);
  //Hide/show form
  const toggleForm = () => {
    setRegisterUser((prevShowForm) => !prevShowForm);
  };
  //Event for submit register form
  const addUserSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Sanitize user input using DOMPurify
    const sanitizedEmail = DOMPurify.sanitize(newUser.email);
    const sanitizedPassword = DOMPurify.sanitize(newUser.password);
// Update state with sanitized values
setNewUser({
  email: sanitizedEmail,
  password: sanitizedPassword,
});
    //Fetch
    try {
      const response = await fetch("http://127.0.0.1:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: sanitizedEmail,
          password: sanitizedPassword,
        }),
      });

      const responseData = await response.json();
      //If response ok
      if (response.ok) {
        setNewUser({
          email: "",
          password: "",
        });

        setUserAddedMessage(responseData.message || 'Användare skapad');
        //Hide message after 3 s
        setTimeout(() => setUserAddedMessage(null), 3000);
        //Error
      } else {
        setUserAddedMessage(responseData.message || 'Kunde inte skapa användare');
        //Hide message after 3 s
        setTimeout(() => setUserAddedMessage(null), 3000);
      } //Error
    } catch (error) {
      setUserAddedMessage('Kunde inte skapa användare');
        //Hide message after 3 s
        setTimeout(() => setUserAddedMessage(null), 3000);
    }
  };
  return (
    <div>
      {/*Button to show/hide form */}
      <div className="add-container container mx-auto d-grid">
        <div className="mx-auto d-flex flex-column"></div>
        <button
          type="button"
          className="btn btn-hide btn-light mx-auto p-2 m-5"
          onClick={toggleForm}
        >
          Registrera ny användare
        </button>
      </div>
      {showRegisterUser && (
        <form
          className="form-control form-control-sm border-0 p-2 mx-auto w-100"
          onSubmit={addUserSubmit}
        >
          {" "}
          {/*Form to add user*/}
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
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
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
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-secondary mt-2">
            Skapa användare
          </button>
          {userAddedMessage && (
            <p className="alert alert-light text-center mt-2">
              {userAddedMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
};


export default AddUser;
