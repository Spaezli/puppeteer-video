/*
test interactions with a form and ui elements
https://youtube.com/
Get a screenshot and a blurred screenshot
Complete and submit the search form with value from cli or env
'#search-input #search' and '#search-icon-legacy'
screenshot of search results
output text from firstMatch 'ytd-video-renderer h3 a#video-title'
click on firstMatch, navigate
click on dismiss button for login '#dismiss-button'
wait for and check number of comments `ytd-comments-header-renderer h2`
screenshot of video playing
get text for first suggested 'ytd-compact-video-renderer'
output comment count and first suggested video title
*/

import puppeteer from 'puppeteer';

const log = console.log();
//node test.js "Green"
const searchTermCLI = process.argv.length >= 3 ? process.argv[2] : 'Volbeat';
// access environment variable
//export SEARCHTXT="Green Day"
const searchTermENV = process.env.SEARCHTXT ?? 'Volbeat';


(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://youtube.com/');
    await page.waitForSelector('#search-input #search');
    await page.type('#search-input #search', searchTermCLI, {delay: 100});
    await page.emulateVisionDeficiency('blurredVision')
    await page.screenshot({path:'./screens/youtube-home-blurred.jpg'});
    await page.emulateVisionDeficiency('none')
    await page.screenshot({path:'./screens/youtube-home.jpg'});
    //Waiting till all within that one finished
    await Promise.all([
        page.waitForNavigation(),
        page.click('#search-icon-legacy'),
            ]);



    await browser.close();
})();