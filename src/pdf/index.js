const puppeteer = require("puppeteer");

const saveAsPdf = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://google.com/");
  await page.pdf();

  await browser.close();
};

exports.saveAsPdf = saveAsPdf;
