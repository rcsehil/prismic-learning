import { test, expect } from '@playwright/test';

// This test assumes your dev server is running at http://localhost:3000

test.describe('Habits Library Page', () => {
  test('should display the main heading and category filter', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('heading', { name: /Habits Library/i })).toBeVisible();
    await expect(page.getByRole('combobox')).toBeVisible();
    await expect(page.getByRole('option', { name: /All Categories/i })).toBeVisible();
  });

  test('should show habits grid or loading spinner', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    // Wait for either the spinner or a habit card to appear
    const spinner = page.locator('svg.animate-spin');
    const habitCard = page.locator('.border.rounded-lg');
    await expect(spinner.or(habitCard)).toBeVisible();
  });

  test('should allow searching for habits', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const searchInput = page.getByPlaceholder('Search habits...');
    await searchInput.fill('water');
    // Wait for debounce/network
    await page.waitForTimeout(1000);
    // Either habits matching "water" appear, or no results message
    const noResults = page.getByText(/no habits found/i);
    const habitName = page.getByText(/water/i);
    await expect(noResults.or(habitName)).toBeVisible();
  });
});
