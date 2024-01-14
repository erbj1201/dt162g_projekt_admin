//AddMenu.tsx
//Import
import React, { useState, ChangeEvent, FormEvent } from "react";
import DOMPurify from "dompurify";

// Defining the structure of the menu item
interface MenuItem {
  name: string;
  description: string;
  category: string;
  price: string;
}

// Component
const AddMenuItemComponent: React.FC = () => {
  // State to manage the data for the new menu item
  const [newItem, setNewItem] = useState<MenuItem>({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  // Get the token from local storage
  const token = localStorage.getItem("token");
  // State to control the visibility of the form
  const [showForm, setShowForm] = useState<boolean>(false);
  // Function to handle changes in the form inputs
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Sanitize the input 
    const sanitizedValue = DOMPurify.sanitize(value);
    setNewItem((prevItem) => ({ ...prevItem, [name]: sanitizedValue }));
  };

  // State to manage messages
  const [formMsg, setFormMsg] = useState<string | null>(null);

  // State to track form submission status
  const [submitting, setSubmitting] = useState<boolean>(false);
  // Function to clear update and delete messages after a specified time
  const clearMessages = () => {
    setFormMsg(null);
  };
  // Event handler for the form submission
  const addItemSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Reset messages
    setFormMsg(null);
    setSubmitting(true);
    //Fetch
    try {
      const response = await fetch("http://127.0.0.1:3000/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(newItem),
      });
      //If response ok
      if (response.ok) {
        setNewItem({
          name: "",
          description: "",
          category: "",
          price: "",
        });
        //Reload
        window.location.reload();
        // Show message
        setFormMsg("Produkt tillagd i meny");
        // Clear message after  3 seconds
        setTimeout(clearMessages, 3000);
      } else {
        // If response is not ok
        setFormMsg("Kunde inte lägga till produkt i menyn");
        // Clear message after  3 seconds
        setTimeout(clearMessages, 3000);
      }
    } catch (error) {
      setFormMsg("Fel vid lagring, försök igen");
      // Clear message after  3 seconds
      setTimeout(clearMessages, 3000);
    } finally {
      // Reset form-related states and enable the form
      setSubmitting(false);
      // Clear message after 3 seconds
      setTimeout(clearMessages, 3000);
    }
  };

  return (
    <div>
      <div className="add-container container mx-auto">
        {/* Display the general error message */}
        {formMsg && (
          <div className="alert alert-light text-center">{formMsg}</div>
        )}

        <div className="mx-auto d-flex flex-column">
          <h1 className="mx-auto pb-5 text-center">Menyer </h1>
          {/* Button to show/hide form */}
          <button
            type="button"
            className="btn btn-hide btn-light mx-auto p-2"
            onClick={() => setShowForm((prevShowForm) => !prevShowForm)}
            disabled={submitting}
          >
            {showForm ? "Dölj" : "Lägg till i meny"}
          </button>
        </div>
        {/* Form to add menu item */}
        {showForm && (
          <form
            className="form-control form-control-sm border-0 p-2 mx-auto w-100"
            onSubmit={addItemSubmit}
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Namn:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Beskrivning:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Kategori:
              </label>
              <select
                id="category"
                name="category"
                value={newItem.category}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="" disabled>
                  Välj kategori
                </option>
                <option value="Frukost">Frukost</option>
                <option value="Bakelser">Bakelser</option>
                <option value="Bullar & kakor">Bullar & kakor</option>
                <option value="Smörgåsar">Smörgåsar</option>
                <option value="Kalla drycker">Kalla drycker</option>
                <option value="Varma drycker">Varma drycker</option>
                {/* Add more options as needed */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Pris:
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={newItem.price}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            {/* Button to submit the form */}
            <button
              type="submit"
              className="btn btn-secondary mt-2"
              disabled={submitting}
            >
              {submitting ? "Lägger till..." : "Lägg till"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddMenuItemComponent;
