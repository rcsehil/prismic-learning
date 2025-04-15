'use client'
import { createClient } from "@/prismicio";
import { Content, filter } from "@prismicio/client";
import { useState, useEffect } from "react";
import type { Category } from "../types/category";
import CategoryFilter from "@/components/CategoryFilter";
import HabitGrid from "@/components/HabitGrid";

export default function HabitsPage() {
  const [filteredHabits, setFilteredHabits] = useState<Content.HabitDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  const client = createClient();

  async function fetchCategories() {
    const categoriesDoc = await client.getAllByType('habit_category');
    const categories = categoriesDoc.map(
      (category) => ({
        name: category.data.name || '',
        id: category.id
      })
    );
    setCategories(categories);
  }

  async function fetchFilteredHabits() {
    setLoading(true);
    // Prepare filters
    const filters = [];
    
    // Add name search filter
    if (searchTerm && searchTerm.length > 3) {
      filters.push(
        filter.fulltext('my.habit.name', searchTerm)
      );
    }

    // Add category filter
    if (selectedCategory) {
      filters.push(
        filter.at('my.habit.category', selectedCategory)
      );
    }

    // Fetch habits with applied filters
    try {
      const fetchedHabits = await client.getAllByType("habit", { 
        filters: filters.length > 0 ? filters : undefined,
        fetchLinks: ['habit_category.name']
      })
      setFilteredHabits(fetchedHabits);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching habits:', error);
      setFilteredHabits([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchFilteredHabits();
  }, []);

  useEffect(() => {
    fetchFilteredHabits();
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Habits Library</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search habits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 flex-grow"
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Habits Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      ) : (
        <HabitGrid 
          habits={filteredHabits} 
        />
      )}

      {/* No Results Message */}
      {filteredHabits.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No habits found matching your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
