import React, { useState } from "react";
import EditForm from "./EditForm";

const PostButtons = ({ postId, handleDelete, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  console.log("Props received by PostButtons:", {
    postId,
    handleDelete,
    handleEdit,
  });

  return (
    <div>
      {!isEditing && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleDelete(postId)}
          >
            Delete
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      )}
      {isEditing && (
        <EditForm
          postId={postId}
          handleEdit={handleEdit}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default PostButtons;
