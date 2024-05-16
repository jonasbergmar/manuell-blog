import React, { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddPostPage = () => {
  const { handleCreatePost } = useContext(BlogContext);
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    text: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      author: currentUser.email,
      ...formData,
    };

    handleCreatePost(newPost);

    setFormData({
      category: "",
      title: "",
      text: "",
    });

    navigate("/");
  };

  return (
    <div className=" flex items-center flex-col max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <form
        className="w-[400px] mx-auto p-8 bg-purple-800 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="category" className="block font-semibold mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg outline-none"
            placeholder="Enter category"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg outline-none"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="content" className="block font-semibold mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg outline-none"
            rows="6"
            placeholder="Enter content"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default AddPostPage;
