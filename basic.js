// Puppeteer and Headless Chrome (or Firefox)
// npm init -y
// add "type":"module" to package.json
// npm install puppeteer@19.11.1

import puppeteer from 'puppeteer';

// Imidiately invoked function
//(()=>{})()
// As soon as the page loads
(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1600, height: 1000, hasTouch: false, isLandscape: true,});

    // navigating to page
    await page.goto('https://www.digitec.ch/de/s1/product/xtorm-xb401-titan-24000-mah-60-w-8880-wh-powerbank-22612378');

    // extracting content of the website
    const url = await page.url();
    const content = await page.content();
    console.log(url);
    console.log(content);
    await page.screenshot({path: './screens/home-digitec.png', fullPage: true, type:'png'});



    await browser.close();
})()
