import React, { createContext, useState } from "react";
import blogPosts from "../Data/BlogPostsData";
import { AuthContext } from "./AuthContext";

export const BlogContext = createContext();

export const BlogProvider = (props) => {
  const [posts, setPosts] = useState(blogPosts || []);
  const { currentUser } = React.useContext(AuthContext);

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleEdit = (postId, updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, ...updatedPost } : post
    );
    setPosts(updatedPosts);
  };

  const handleAddPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const handleCreatePost = (newPost) => {
    newPost.comments = [];
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const contextValue = {
    posts: posts,
    setPosts: setPosts,
    handleDelete: handleDelete,
    handleEdit: handleEdit,
    handleCreatePost: handleCreatePost,
  };

  return (
    <BlogContext.Provider value={contextValue}>
      {props.children}
    </BlogContext.Provider>
  );
};
