// Regenerates generated assets: OG image, apple-touch-icon and the CV PDF.
// Usage (from repo root): node tools/build-assets.js
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const url = (p) => 'file://' + path.join(root, p);
  const browser = await chromium.launch();

  // Open Graph image 1200x630
  let page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(url('tools/og-image.html'));
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(root, 'images/og-image.png') });

  // Apple touch icon 180x180 from the SVG favicon
  page = await browser.newPage({ viewport: { width: 180, height: 180 } });
  await page.setContent(`<html><body style="margin:0;background:#4f46e5">
    <img src="${url('images/favicon.svg')}" style="width:180px;height:180px;display:block"></body></html>`);
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(root, 'apple-touch-icon.png') });

  // CV PDF from the site's print stylesheet
  page = await browser.newPage();
  await page.goto(url('index.html'));
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  await page.pdf({
    path: path.join(root, 'files/Amer_Mahsoub_CV.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '14mm', bottom: '16mm', left: '14mm', right: '14mm' },
  });

  await browser.close();
  console.log('Assets built.');
})();
