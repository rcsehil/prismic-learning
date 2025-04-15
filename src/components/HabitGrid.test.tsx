import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HabitGrid from './HabitGrid';
import React from 'react';

// Mock next/link to render children directly
jest.mock('next/link', () => ({ __esModule: true, default: ({ children }: any) => children }));

// Mock PrismicNextImage
jest.mock('@prismicio/next', () => ({
  PrismicNextImage: ({ field, className }: any) => <img src={field?.url || ''} className={className} alt={field?.alt || ''} />,
}));

const habits = [
  {
    id: 'habit1',
    uid: 'habit-1',
    data: {
      name: 'Drink Water',
      main_image: { url: '/water.png', alt: 'Drink Water' },
      difficulty_level: 'Easy',
      category: { data: { name: 'Health' } },
    },
  },
  {
    id: 'habit2',
    uid: 'habit-2',
    data: {
      name: 'Read Book',
      main_image: { url: '/book.png', alt: 'Read Book' },
      difficulty_level: 'Medium',
      category: { data: { name: 'Learning' } },
    },
  },
] as any;

describe('HabitGrid', () => {
  it('renders all habits with name, difficulty, and category', () => {
    render(<HabitGrid habits={habits} />);
    expect(screen.getByText('Drink Water')).toBeInTheDocument();
    expect(screen.getByText('Read Book')).toBeInTheDocument();
    expect(screen.getByText('Difficulty: Easy')).toBeInTheDocument();
    expect(screen.getByText('Difficulty: Medium')).toBeInTheDocument();
    expect(screen.getByText('Category: Health')).toBeInTheDocument();
    expect(screen.getByText('Category: Learning')).toBeInTheDocument();
  });

  it('renders images with correct alt text', () => {
    render(<HabitGrid habits={habits} />);
    expect(screen.getByAltText('Drink Water')).toBeInTheDocument();
    expect(screen.getByAltText('Read Book')).toBeInTheDocument();
  });

  it('renders no habits if list is empty', () => {
    render(<HabitGrid habits={[]} />);
    // There should be no habit names in the document
    expect(screen.queryByText('Drink Water')).not.toBeInTheDocument();
    expect(screen.queryByText('Read Book')).not.toBeInTheDocument();
  });
});
