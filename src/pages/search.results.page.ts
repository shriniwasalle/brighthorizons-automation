import { expect, Locator, Page } from "@playwright/test";

export default class SearchResultsPage {
  private elements = {};

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getSearchResultsTitle(resultNumber: number): Promise<string | null> {
    const locator = this.page
      .locator("css=div.col > h3.title")
      .nth(resultNumber - 1);

    const actualText = await locator.textContent();

    return actualText;
  }
}
