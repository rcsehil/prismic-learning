import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";

type Params = { uid: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  
  try {
    const habit = await client.getByUID("habit", uid);
    return {
      title: habit.data.name || "Habit Details",
      description: "Habit details page"
    };
  } catch (error) {
    return {
      title: "Habit Not Found",
      description: "The requested habit could not be found"
    };
  }
}

export default async function HabitPage({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  
  try {
    const habit = await client.getByUID("habit", uid, {fetchLinks: ['habit_category.name']}).catch(() => notFound());

    return (
      <div className="max-w-2xl mx-auto p-6">
        <a style={{ display: "block", marginBottom: "1rem"}} href="/">Back to Habits</a>
        <h1 className="text-3xl font-bold mb-4">{habit.data.name}</h1>
        
        <div className="mb-4">
          <strong>Difficulty Level:</strong> {habit.data.difficulty_level}
        </div>
        
        <div className="mb-4">
          <strong>Category:</strong> {habit.data.category.data.name}
        </div>
        
        {habit.data.description && (
          <div className="mb-4">
            <strong>Description:</strong>
            <PrismicRichText field={habit.data.description} />
          </div>
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  const client = createClient();
  
  const habits = await client.getAllByType("habit");
  
  return habits.map((habit) => ({
    uid: habit.uid,
  }));
}
