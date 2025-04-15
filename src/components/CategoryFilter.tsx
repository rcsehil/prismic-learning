import React from "react";
import type { Category } from "../types/category";

export type CategoryFilterProps = {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }: CategoryFilterProps) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border p-2"
    >
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category.id}>{category.name}</option>
      ))}
    </select>
  );
}
