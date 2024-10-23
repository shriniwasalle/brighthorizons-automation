import { Browser, Page } from "@playwright/test";

export async function rejectAllCookieSettings(browser: Browser): Promise<Page> {
  const elements = {
    btnRejectAll: "//button[@id='onetrust-reject-all-handler']",
  };

  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto("/");
  try {
    const btnPrivacyReject = page.locator(elements.btnRejectAll);
    await btnPrivacyReject.click();
  } catch (error) {
    console.log(
      "Privacy button not found or not visible, continuing with normal operations.."
    );
  }

  return page;
}
