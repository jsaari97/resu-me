const puppeteer = require("puppeteer");

const saveAsPdf = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:5000/");

  await page.pdf({
    path: "example.pdf",
  });

  await browser.close();
};

exports.saveAsPdf = saveAsPdf;
