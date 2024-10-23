import { expect, Locator, Page } from "@playwright/test";

export default class HomePage {
  private elements = {
    btnFindCenter:
      "//nav[contains(@class, 'js-nav-top')]//li[contains(@class,'displayed-desktop')]/a[normalize-space(text()) ='Find a Center']",
    btnSearchIcon:
      "//a[@href='#subnav-search-desktop-top']//span[contains(@class, 'icon-search')]",
    txtSearchField: "//nav[@id='subnav-search-desktop-top']",
  };

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navClickFindCenterButton() {
    await this.page.locator(this.elements.btnFindCenter).click();
  }

  async navClickSearchIcon() {
    await this.page.locator(this.elements.btnSearchIcon).click();
  }

  async getSearchField(): Promise<Locator> {
    return this.page
      .locator(this.elements.txtSearchField)
      .getByPlaceholder("Type to Search");
  }

  async enterSearchFieldText(inputText: string) {
    await (await this.getSearchField()).fill(inputText);
  }

  async clickSearchButton() {
    await this.page
      .locator("//nav[@id='subnav-search-desktop-top']")
      .getByPlaceholder("Type to Search")
      .locator("//following-sibling::button[text()='Search']")
      .click();
  }
}
