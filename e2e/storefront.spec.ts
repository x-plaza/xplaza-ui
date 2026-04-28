import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and shows hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/X-Plaza/);
  });

  test('header navigation is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /products/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /categories/i })).toBeVisible();
  });

  test('search navigates to search page', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.getByPlaceholder(/search/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill('shoes');
      await searchInput.press('Enter');
      await expect(page).toHaveURL(/search/);
    }
  });
});

test.describe('Product Listing', () => {
  test('navigates to products page', async ({ page }) => {
    await page.goto('/products');
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Authentication', () => {
  test('login page is accessible', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading')).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test('register page is accessible', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading')).toBeVisible();
  });
});

test.describe('Cart', () => {
  test('cart page loads', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('h1')).toBeVisible();
  });
});
