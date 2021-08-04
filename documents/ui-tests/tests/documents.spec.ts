import { test, expect } from '@playwright/test';

const TARGET_URL = process.env.TARGET_URL ?? 'http://localhost:8888';

test('should check if the cube is loaded', async ({ page }) => {
  await page.goto(`${TARGET_URL}/lab`);
  await page.waitForSelector('#jupyterlab-splash', { state: 'detached' });
  await page.waitForSelector('div[role="main"] >> text=Launcher');

  // Click text=File
  await page.click('text=File');

  // Click ul[role="menu"] >> text=New
  await page.click('ul[role="menu"] >> text=New');

  // Click #jp-mainmenu-file-new >> text=Text File
  page.click('#jp-mainmenu-file-new >> text=Text File');

  // Click pre[role="presentation"]:has-text("​")
  await page.click('pre[role="presentation"]:has-text("​")');

  // Fill textarea
  await page.fill(
    'textarea',
    '{\n\t"x": 177,\n\t"y": 301,\n\t"content": "Hello YJS!"\n}'
  );

  // Press s with modifiers
  await page.keyboard.press('Control+s');

  // Click div[role="main"] >> text=Launcheruntitled.txt >> :nth-match(svg, 4)
  await page.click(
    'div[role="main"] >> text=Launcheruntitled.txt >> :nth-match(svg, 4)'
  );

  expect(page.url()).toBe(`${TARGET_URL}/lab`);

  // Click [aria-label="File Browser Section"] >> text=untitled.txt
  await page.click('[aria-label="File Browser Section"] >> text=untitled.txt', {
    button: 'right',
  });

  // Click text=Rename
  await page.click('text=Rename');

  // Click input jp-DirListing-editor
  await page.click('input[class="jp-DirListing-editor"]');

  // Fill input
  await page.fill('input[class="jp-DirListing-editor"]', 'untitled.example');

  // Press s with modifiers
  await page.keyboard.press('Enter');

  expect(await page.waitForSelector('text=untitled.example')).toBeTruthy();

  // Click text=untitled.example
  await page.click('text=untitled.example', { clickCount: 2 });

  await page.waitForSelector('div[role="main"] >> text=untitled.example');

  expect(await page.waitForSelector('text=Hello YJS!')).toBeTruthy();

  await page.dragAndDrop(
    'text=Hello YJS!',
    'div[role="region"]:has-text("Hello YJS!")'
  );

  // Click [aria-label="main sidebar"] path
  await page.click('[aria-label="main sidebar"] path');

  // Click text=Hello YJS!
  await page.click('text=Hello YJS!');

  // Press s with modifiers
  await page.keyboard.press('Control+s');

  // Compare screenshot with a stored reference.
  expect(await page.screenshot()).toMatchSnapshot('documents-example.png');
});
