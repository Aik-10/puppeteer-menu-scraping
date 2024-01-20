import puppeteer from 'puppeteer';

import { PuppeteerFetch } from './PuppeteerFetch'
import { PuppeteerFetchWeek } from './PuppeteerFetchWeek';


(async () => {
    const menuResult = new PuppeteerFetchWeek('https://fi.jamix.cloud/apps/menu/?anro=93077&k=48&mt=89');
    const data = await menuResult.fetchWeek()
    console.log(JSON.stringify(data))
})();


