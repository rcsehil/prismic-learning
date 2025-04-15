import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';

const categories = [
  { id: '1', name: 'Health' },
  { id: '2', name: 'Productivity' },
  { id: '3', name: 'Learning' },
];

describe('CategoryFilter', () => {
  it('renders all categories and the "All Categories" option', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory=""
        setSelectedCategory={() => {}}
      />
    );

    expect(screen.getByText('All Categories')).toBeInTheDocument();
    categories.forEach(category => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('calls setSelectedCategory when a new category is selected', () => {
    const setSelectedCategory = jest.fn();
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory=""
        setSelectedCategory={setSelectedCategory}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    expect(setSelectedCategory).toHaveBeenCalledWith('2');
  });

  it('shows the correct selected category', () => {
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="3"
        setSelectedCategory={() => {}}
      />
    );
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('3');
  });
});
