const puppeteer = require("puppeteer");

const screenshooter = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://google.ca');
    await page.screenshot({ path: '1.png' });
    await browser.close();
    console.log("done");
    return true;
}

screenshooter();