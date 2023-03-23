import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // Expected title
  await expect(page).toHaveTitle(/Developer Journey/);

  // Displays link to Home tab
  const homeLink = await page.getByRole('link', { name: 'Home' })
  await expect(homeLink).toBeVisible();

  // Should show up Player Username
  const playerName = page.getByText('CI User').nth(1);
  expect(playerName).toBeVisible();

  // Moves the player to the first tile
  const upBtn = await page.getByRole('button', { name: 'Move player up' });
  await upBtn.click();
  await upBtn.click();

  // Validates that the user is now positioned on first tile
  const firstTile = await page.locator('.bg-slate-200').first()
  const player = await firstTile.getByTestId('usericon');
  await expect(player).toBeVisible();
});
