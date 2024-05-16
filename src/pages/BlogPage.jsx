import React, { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import CategoryFilter from "../components/CategoryFilter";
import PostButtons from "../components/PostButtons";
import { AuthContext } from "../context/AuthContext";
import EditForm from "../components/EditForm";

const BlogPage = () => {
  const { posts, setPosts, handleDelete } = useContext(BlogContext);
  const { currentUser } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [commentInputs, setCommentInputs] = useState({});

  const categories = ["All", ...new Set(posts?.map((post) => post.category))];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleEditPost = (postId, updatedPost) => {
    const index = posts.findIndex((post) => post.id === postId);
    const updatedPosts = [...posts];
    updatedPosts[index] = { ...updatedPosts[index], ...updatedPost };
    setPosts(updatedPosts);
  };

  const handleAddComment = (postId) => {
    const index = posts.findIndex((post) => post.id === postId);
    const updatedPosts = [...posts];
    const updatedPost = { ...updatedPosts[index] };
    updatedPost.comments.push({
      id: updatedPost.comments.length + 1,
      author: currentUser.email,
      text: commentInputs[postId],
    });
    updatedPosts[index] = updatedPost;
    setPosts(updatedPosts);
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const updatedPosts = posts.map((post) => {
    return {
      ...post,
      author: post.author,
    };
  });

  const filteredPosts =
    selectedCategory === "All"
      ? updatedPosts || []
      : updatedPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Blog Posts</h1>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
      />
      <div className="grid gap-6">
        {filteredPosts.map((post) => {
          const isAuthor = currentUser && currentUser.email === post.author;

          return (
            <div
              key={post.id}
              className="bg-purple-800 shadow-md rounded-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-purple-100">{post.author}</p>
                <p className="text-purple-100">{post.category}</p>
              </div>
              <h2 className=" text-purple-300 font-semibold mb-2">
                {post.title}
              </h2>
              <p className="text-purple-200 mb-4">{post.text}</p>

              <div className="mb-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex mb-2">
                    <span className="font-semibold text-purple-100 mr-2">
                      {comment.author}:
                    </span>
                    <span className="text-purple-200">{comment.text}</span>
                  </div>
                ))}
              </div>
              {currentUser && (
                <div className="mb-4">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs({
                        ...commentInputs,
                        [post.id]: e.target.value,
                      })
                    }
                    placeholder="Write a comment..."
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-600"
                  >
                    Add Comment
                  </button>
                </div>
              )}

              {currentUser.email === post.author && (
                <div>
                  <PostButtons
                    postId={post.id}
                    handleDelete={handleDelete}
                    handleEdit={handleEditPost}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPage;
