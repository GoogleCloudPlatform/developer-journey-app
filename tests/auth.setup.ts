// auth.setup.ts
import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
  const emailInput = await page.getByRole('textbox', { name: /Username/ })
  await emailInput.fill('CI User');
  const signInButton = await page.getByRole('button', { type: 'submit' })
  await signInButton.click();
  await page.context().storageState({ path: authFile });
});
