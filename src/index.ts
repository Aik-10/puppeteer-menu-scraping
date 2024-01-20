import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto('https://fi.jamix.cloud/apps/menu/?anro=93077&k=48&mt=89');
    await page.setViewport({ width: 1080, height: 1024 });

    let menuFound = false;

    while (!menuFound) {
        try {
            const siteContent: any = await page.waitForSelector('.menu-sub-view', { timeout: 2000 });
            const cacheData = await siteContent.evaluate(el => el.textContent);

            if (cacheData !== "Tälle päivälle ei löytynyt ruokalistaa.") {
                menuFound = true;
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

    if (menuFound) {
        const textDateSelector = await page.waitForSelector('.v-label-sub-title', { timeout: 1000 });
        const dateFormat = await textDateSelector?.evaluate(el => el.textContent);

        const data = await page.evaluate(() => {
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
        await page.screenshot({ path: `images/${dateFormat?.replaceAll(' ', '_')?.replaceAll('.', '_')}_menu.png`, fullPage: true });

        console.log(JSON.stringify({
            date: dateFormat,
            menu: data
        }));
    }

    await browser.close();
})();
