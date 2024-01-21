

import { dayMap } from '../utils/weekDays';
import { PuppeteerFetch } from './PuppeteerFetch';
import puppeteer, { Page } from 'puppeteer';

export class PuppeteerFetchWeek extends PuppeteerFetch {

    protected resultData: Array<FetchResult> = [];

    private async getCurrentDate(page: Page): Promise<string> {
        const textDateSelector = await page.waitForSelector('.v-label-sub-title', { timeout: 1000 });
        const date = await textDateSelector?.evaluate(el => el.textContent);

        return date?.split(' ')[0] ?? "unkown";
    }

    private async getDateMenu(page: Page): Promise<void> {
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

        this.resultData.push({ date, menu });
    }

    public async fetchWeek(): Promise<FetchResult[]> {
        this.browser = await puppeteer.launch({ headless: this.headless });
        const page = await this.browser.newPage();

        await page.goto(this.url);
        await page.setViewport({ width: this.width, height: this.height });

        while (true) {
            const currentWeekDay = await this.getCurrentDate(page);
            const dateDiff = dayMap["maanantai"] - dayMap[currentWeekDay];

            const elementPrevius = await page.waitForSelector('.v-button-date--previous', { visible: true });
            await page.waitForTimeout(800);

            if (dateDiff < -1) {
                elementPrevius?.click()
            } else {
                break;
            }
        }

        if (await this.getCurrentDate(page) != "maanantai") {
            await this.browser.close();
            return this.fetchWeek();
        }

        while (true) {
            const currentWeekDay = await this.getCurrentDate(page);

            const elementNext = await page.waitForSelector('.v-button-icon-align-right', { visible: true });
            await page.waitForTimeout(800);

            await this.getDateMenu(page);

            if (dayMap[currentWeekDay] < dayMap["sunnuntai"] - 1) {
                elementNext?.click()
            } else {
                break;
            }
        }

        await this.browser.close();

        return this.resultData;
    }
}

