import React from "react";

const CategoryFilter = ({
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <div className="mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`mr-4 mb-4 px-4 py-2 rounded-lg ${
            selectedCategory === category
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          } hover:bg-indigo-700 transition duration-300`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
