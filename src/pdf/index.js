const puppeteer = require("puppeteer");

const saveAsPdf = async (path) => {
  let browser = null;

  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(path);

    await page.pdf({
      path: "example.pdf",
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

exports.saveAsPdf = saveAsPdf;
