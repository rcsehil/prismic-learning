import { Content } from '@prismicio/client';
import Link from 'next/link';
import { PrismicNextImage } from '@prismicio/next';
import React from 'react';

type HabitGridProps = {
  habits: Content.HabitDocument[];
};

const HabitGrid: React.FC<HabitGridProps> = ({ habits }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="border rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <Link href={`/${habit.uid}`} className="block">
            {habit.data.main_image && (
              <PrismicNextImage
                field={habit.data.main_image}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{habit.data.name}</h2>
              <p className="text-gray-600 mb-2">
                Difficulty: {habit.data.difficulty_level}
              </p>
              <p className="text-gray-600">
                Category: {habit.data.category.data.name}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HabitGrid;
