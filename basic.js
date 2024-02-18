// Puppeteer and Headless Chrome (or Firefox)
// npm init -y
// add "type":"module" to package.json
// npm install puppeteer@19.11.1

import puppeteer from 'puppeteer';

// Imidiately invoked function
//(()=>{})()
// As soon as the page loads
(async()=>{
    const browser = await puppeteer.launch({headless:"new"});
    const page = await browser.newPage();


    await browser.close();
})()
