// @ts-check
const { test, expect } = require('@playwright/test');

test.describe("Google Form", function () {
    test('Automate google form crio assignment', async ({ page }) => {
        const formUrl = 'https://forms.gle/wjPkzeSEk1CM7KgGA';
        const userName = 'Vivek Kumar Singh';
        const answerText = `I want to be the best QA Engineer! ${Date.now()}`;
        const selectedSkills = ['Java', 'Selenium', 'TestNG'];
        const desiredDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10); // 7 days earlier
        await page.goto(formUrl);

        // Fill form fields with improved locators
        await page.fill('input[aria-labelledby="i1"]', userName); // Use ID selector for username
        await page.fill('textarea[aria-label="Your answer"]', answerText); // Use name selector for answer field
        await page.check('#i16'); //select experience
        for (const skill of selectedSkills) {
            await page.check(`div[data-answer-value="${skill}"]`);
        } // Checkboxes using role and spread syntax

        // Choose dropdown option "Choose"
        await page.click('span:has-text("Choose")');
        await page.waitForTimeout(500);

        // Click desired dropdown option (assuming unique text content)
        await page.click('(//div[@data-value="Mr"])[2]', { force: true });


        // Fill date and time fields
        await page.fill('input[type="date"]', desiredDate);
        const currentTime = new Date();
        await page.fill('input[aria-label="Hour"]', currentTime.getHours().toString());
        await page.fill('input[aria-label="Minute"]', currentTime.getMinutes().toString());


        // await page.goto('https://www.amazon.in');
        // page.on('dialog', async (dialog) => {
        //     console.log(dialog.message()); // Log the dialog message (optional)
        //     await dialog.dismiss(); //  dialog.dismiss() to cancel
        // });

        // Submit form and wait for confirmation
        await page.click('span:has-text("Submit")');
        await page.waitForSelector('div[class="vHW8K"]');

        // Get and log response message
        const responseMessage = await page.textContent('div[class="vHW8K"]');
        console.log(responseMessage);
    })
});
