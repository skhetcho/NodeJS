const puppeteer = require('puppeteer');
require('dotenv').config();

const scrapeImages = async (username) => {
    const browser = await puppeteer.launch( { headless: true });
    const page = await browser.newPage();
    
    await page.goto('https://www.instagram.com/accounts/login/');


    // Login form
    await page.screenshot({path: '1.png'});

    await page.type('[name=username]', `${process.env.INSTAGRAM_USERNAME}`);

    await page.type('[name=password]', `${process.env.INSTAGRAM_PASSWORD}`);

    await page.screenshot({path: '2.png'});

    await page.click('[type=submit]');

    // Social Page

    await page.waitFor(5000);

    await page.goto(`https://www.instagram.com/${username}`);

    await page.waitForSelector('img ', {
        visible: true,
    });


    await page.screenshot({path: '3.png'});


    // Execute code in the DOM
    const data = await page.evaluate( () => {

        const images = document.querySelectorAll('img');

        const urls = Array.from(images).map(v => v.src);

        return urls
    });
  
    await browser.close();

    console.log(data);

    return data;
}

scrapeImages(`${process.env.INSTAGRAM_TEST_USERNAME}`);