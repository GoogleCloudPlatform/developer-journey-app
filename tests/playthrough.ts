/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
