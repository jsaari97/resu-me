const puppeteer = require("puppeteer");

const saveAsPdf = async (path) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(path);

  await page.pdf({
    path: "example.pdf",
  });

  await browser.close();
};

exports.saveAsPdf = saveAsPdf;
