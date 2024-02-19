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
    await page.goto('https://www.digitec.ch/de/s1/tag/drohnen-elektronik-1123',{waitUntil:'networkidle0'});

    // navigating to page
    // Simulate pressing the Page Down key.
//    const numberOfPageDowns = 10; // Adjust based on the page length
//    for (let i = 0; i < numberOfPageDowns; i++) {
//        await page.keyboard.press('PageDown');
//    }

    humanLikeScroll(page)

    // extracting content of the website
    const url = await page.url();
    const content = await page.content();
    console.log(url);
    console.log(content);
    await page.screenshot({path: './screens/home-digitec.png', fullPage: true, type:'png'});

    await browser.close();
})()



async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

async function humanLikeScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = Math.floor(Math.random() * 100 + 50); // Randomize distance to mimic human scrolling
            var delay = Math.floor(Math.random() * 100 + 50); // Randomize delay to mimic human pause
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, delay);
        });
    });
}


