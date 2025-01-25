import { expect, test } from '@playwright/test'

test('get', async ({ request }) => {
  const response = await request.get('/facts/random')
  const data = await response.json()

  expect(await data.type).toBe('cat')
})
