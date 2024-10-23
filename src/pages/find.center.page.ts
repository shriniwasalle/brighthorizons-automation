import { Locator, Page } from "@playwright/test";

export default class FindCenterPage {
  private elements = {
    resultsNumber: '//span[@class="resultsNumber"]',
    resultsCenter:
      "//div[contains(@class, 'centerResult') and contains(@class, 'infoWindow')]",
    resultsCenterAddress: "//span[@class='centerResult__address']",
    mapTooltipTitle:
      "//div[@class='mapTooltip']/span[@class='mapTooltip__headline']",
    mapTooltipAddress:
      "//div[@class='mapTooltip']//div[@class='mapTooltip__address']",
  };

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fetchUrl(): Promise<string> {
    return this.page.url();
  }

  async enterLocation(location: string) {
    const txtLocation = this.page.getByPlaceholder(
      "Address, City, State or Zip"
    );

    await txtLocation.fill(location);
    await txtLocation.press("Enter");
  }

  async getCentersTotalCount(): Promise<number> {
    const centers = this.page.locator(this.elements.resultsNumber);
    await centers.waitFor();
    const centersTotal = await centers.textContent();

    return Number(centersTotal);
  }

  async getAllCentersResultsCount(): Promise<number> {
    const centersResults = this.page.locator(this.elements.resultsCenter);

    return await centersResults.count();
  }

  async getFirstCenterDetails() {
    const centersResults = this.page.locator(this.elements.resultsCenter);
    const resultCenterName = centersResults.nth(0).getByRole("heading");
    const resultCenterAddress = await centersResults
      .nth(0)
      .locator(this.elements.resultsCenterAddress)
      .textContent();

    return { resultCenterName, resultCenterAddress };
  }

  async getCenterMapPopupDetails() {
    const mapCenterName = await this.page
      .locator(this.elements.mapTooltipTitle)
      .textContent();

    const mapCenterAddress = await this.page
      .locator(this.elements.mapTooltipAddress)
      .textContent();

    return { mapCenterName, mapCenterAddress };
  }
}
