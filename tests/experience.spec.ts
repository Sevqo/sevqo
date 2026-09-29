import { expect, test } from '@playwright/test'

test('the portfolio and scroll stories explain the ventures', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Building the systems')

  await page.getByRole('tab', { name: /AfriScore/ }).click()
  await expect(page.getByRole('tabpanel')).toContainText('A common language for African business information')

  await page.locator('#leadflow').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'View 02 / UNDERSTAND' }).click()
  await expect(page.locator('.lead-ui')).toContainText('James M.')
  await expect(page.locator('.lead-ui')).toContainText('Share a tailored proposal')
  await page.locator('#leadflow .story-step').nth(2).scrollIntoViewIfNeeded()
  await expect(page.locator('.lead-ui')).toContainText('Confirm the walkthrough')

  await page.locator('#afriscore').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'View 03 / PROTECT' }).click()
  await expect(page.locator('.score-ui')).toContainText('CONSENT GATE')
  await expect(page.locator('.score-ui')).toContainText('FINANCIAL PROFILE')
})

test('phone navigation works and the page has no horizontal overflow', async ({ page, isMobile }) => {
  test.skip(!isMobile)
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /AfriScore/ }).click()
  await expect(page).toHaveURL(/#afriscore$/)
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
  const dimensions = await page.evaluate(() => ({ page: document.documentElement.scrollWidth, viewport: window.innerWidth }))
  expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport + 1)
})
