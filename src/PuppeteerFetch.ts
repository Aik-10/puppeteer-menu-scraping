type T = any | unknown;

import puppeteer, { Browser } from 'puppeteer';

type FetchResult = {
    menu: any[]
    date: string
} | undefined

export class PuppeteerFetch {

    protected readonly url: string;
    protected width: number = 1080;
    protected height: number = 1024;

    protected queryState: boolean = false;

    public browser: Browser;

    constructor(url) {
        this.url = url;
    }

    public async fetch(): Promise<FetchResult> {
        this.browser = await puppeteer.launch({ headless: false/* "new" */ });
        const page = await this.browser.newPage();

        await page.goto(this.url);
        await page.setViewport({ width: this.width, height: this.height });

        while (!this.queryState) {
            try {
                const siteContent = await page.waitForSelector('.menu-sub-view', { timeout: 1000 });
                const cacheData = await siteContent?.evaluate(el => el.textContent);

                if (cacheData !== "Tälle päivälle ei löytynyt ruokalistaa.") {
                    this.queryState = true;
                } else {
                    const element = await page.waitForSelector('.v-button-icon-align-right', { visible: true });
                    await page.waitForTimeout(250);
                    await element?.click();
                }
            } catch (error) {
                console.error("Timeout reached. Menu not found.");
                break;
            }
        }

        if (this.queryState) {
            const textDateSelector = await page.waitForSelector('.v-label-sub-title', { timeout: 1000 });
            const date = await textDateSelector?.evaluate(el => el.textContent) ?? 'unkown';

            const menu = await page.evaluate(() => {
                const cards = Array.from(document.querySelectorAll('.v-slot .v-slot-multiline'));

                const extractCardData = (card) => {
                    const title = card.querySelector('.multiline-button-caption-text')?.textContent;
                    const contentElements: any = Array.from(card.querySelectorAll('.multiline-button-content-text'));
                    const content = contentElements.map(element => element.textContent);

                    return {
                        title,
                        content,
                    };
                };

                return cards.map(extractCardData);
            });

            await page.waitForTimeout(250);
            await page.screenshot({ path: `images/${date?.replaceAll(' ', '_')?.replaceAll('.', '_')}_menu.png`, fullPage: true });
            
            await this.browser.close();

            return { date, menu }
        }
    }
}

