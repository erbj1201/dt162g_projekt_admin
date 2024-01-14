//MenuData.tsx

//Import
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import DOMPurify from "dompurify";

//Url for fetch
const url = "http://127.0.0.1:3000/menu";

//Define structur meny item
interface Post {
  _id: number;
  name: string;
  description: string;
  category: string;
  price: string;
}
//Component
const MenuComponent: React.FC = () => {
  //States
  const [error, setError] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [editableContent, setEditableContent] = useState<{
    [key: number]: Post | Partial<Post>;
  }>({});

  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

   // Function to clear update and delete messages after a specified time
   const clearMessages = () => {
    setUpdateMessage(null);
    setDeleteMessage(null);
  };
  //Token from localstorage
  const token = localStorage.getItem("token");
  //Function to get all menyPosts
  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const fetchedPosts = (await response.json()) as Post[];
      setPosts(fetchedPosts);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  //UseEffect hook to filter meny by category
  useEffect(() => {
    getPosts(); // Fetch data when the component mounts
  }, []);

  useEffect(() => {
    // Filter posts by selected category
    const filtered = posts.filter((post) =>
      category ? post.category === category : true
    );
    setFilteredPosts(filtered);
  }, [category, posts]);
  //Function to handle field with contenteditable
  const changeFieldsContentEditAble = (
    postId: number,
    updatedFields: Partial<Post>
  ) => {
    setEditableContent((prevContent) => ({
      ...prevContent,
      [postId]: {
        ...prevContent[postId],
        ...updatedFields,
      },
    }));
  };
  //Update meny item
  const updatePost = async (postId: number) => {
    try {
      const changeBeforeFetch = editableContent[postId];
      if (!changeBeforeFetch) return; // No changes to save

      // Sanitize input-content
      const sanitizedFields = {
        ...changeBeforeFetch,
        name: sanitizeData(changeBeforeFetch.name || ""),
        description: sanitizeData(changeBeforeFetch.description || ""),
        category: sanitizeData(changeBeforeFetch.category || ""),
        price: sanitizeData(changeBeforeFetch.price || ""),
      };
      //Fetch
      const response = await fetch(`${url}/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(sanitizedFields),
      });
      //Respons ok
      if (response.ok) {
        // get all posts
        getPosts();
        setUpdateMessage('Produkt uppdaterad');
        // Clear message after 3 seconds
        setTimeout(clearMessages, 3000);
      } else {
        setUpdateMessage('Produkt kunde inte uppdateras');
        // Clear message after 3 seconds
        setTimeout(clearMessages, 3000);
      }
    } catch (error) {
      setUpdateMessage("Kunde inte uppdatera produkt");
      // Clear message after  3 seconds
      setTimeout(clearMessages, 3000);
    }
  };
  //Delete one post (menyitem)
  const deletePost = async (postId: number) => {
    try {
      //fetch
      const response = await fetch(`${url}/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
      });
      //Response ok
      if (response.ok) {
        // Fetch data again to update the list
        getPosts();
        setDeleteMessage('Produkt raderad')
        // Clear message after  3 seconds
      setTimeout(clearMessages, 3000);
      } else {
        setDeleteMessage('Produkt kunde inte raderas')
        // Clear message after  3 seconds
      setTimeout(clearMessages, 3000);
      }
    } catch (error) {
      setDeleteMessage("Fel vid radering av produkt");
      // Clear message after  3 seconds
      setTimeout(clearMessages, 3000);
    }
  };
  //Sanitize data with DOMpurify
  const sanitizeData = (html: string) => {
    return DOMPurify.sanitize(html);
  };
  //Before data is shown
  if (isLoading) {
    return <p>Loading...</p>;
  } //If error
  if (error) {
    return <p>Something went wrong, please try again!</p>;
  }

  return (
    <div>
      {/* Form for selecting menu category */}
      <form className="form-control border-0 mx-auto w-50 text-center m-5">
        <label className="form-label border-0 mx-auto p-2" htmlFor="category">
          <strong>Sortera meny efter kategori</strong>
        </label>
        <select
          className="form-select form-select-sm mb-3 border border-white shadow-none text-center"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          value={category || ""}
        >
          <option value="" disabled>
            Välj kategori
          </option>
          <option value="">Alla</option>
          {Array.from(new Set(posts.map((post) => post.category))).map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </form>
      {/* Displaying the menu data in a table */}
      {!isLoading && !error && (
        <div className="mx-auto text-center">
        {updateMessage && <p className="alert alert-light text-center">{updateMessage}</p>}
        {deleteMessage && <p className="alert alert-light text-center">{deleteMessage}</p>}
          <div className="table-responsive">
            <table className="table table-dark table-hover table-sm table-responsive">
              <thead>
                <tr>
                  <th>Namn</th>
                  <th>Beskrivning</th>
                  <th className="category">Kategori</th>
                  <th>Pris</th>
                  <th className="delete">Radera</th>
                  <th className="updateColumn">Ändra</th>
                 
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post._id}>
                    <td>
                      <ContentEditable
                        html={sanitizeData(
                          (editableContent[post._id]?.name ||
                            post.name) as string
                        )}
                        disabled={false}
                        onChange={(e) =>
                          changeFieldsContentEditAble(post._id, {
                            name: e.target.value,
                            description: post.description,
                            category: post.category,
                            price: post.price,
                          })
                        }
                      />
                    </td>
                    <td>
                      <ContentEditable
                        html={sanitizeData(
                          (editableContent[post._id]?.description ||
                            post.description) as string
                        )}
                        disabled={false}
                        onChange={(e) =>
                          changeFieldsContentEditAble(post._id, {
                            description: e.target.value,
                            name: post.name,
                            category: post.category,
                            price: post.price,
                          })
                        }
                      />
                    </td>
                    <td className="category">
                      <select
                        className="form-select form-select-sm"
                        value={
                          (editableContent[post._id]?.category ||
                            post.category) as string
                        }
                        onChange={(e) =>
                          changeFieldsContentEditAble(post._id, {
                            category: e.target.value,
                            name: post.name,
                            description: post.description,
                            price: post.price,
                          })
                        }
                      >
                        {Array.from(new Set(posts.map((p) => p.category))).map(
                          (category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                    <td>
                      <ContentEditable
                        html={sanitizeData(
                          editableContent[post._id]?.price || post.price
                        )}
                        disabled={false}
                        onChange={(e) =>
                          changeFieldsContentEditAble(post._id, {
                            price: e.target.value,
                            name: post.name,
                            description: post.description,
                            category: post.category,
                          })
                        }
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="table-btn btn btn-light"
                        onClick={() => deletePost(post._id)}
                      >
                        Radera
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="update table-btn btn btn-light"
                        onClick={() => updatePost(post._id)}
                      >
                        Ändra
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuComponent;
