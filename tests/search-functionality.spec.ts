import { test, expect } from "@playwright/test";
import HomePage from "../src/pages/home.page.ts";
import SearchResultsPage from "../src/pages/search.results.page.ts";
import { rejectAllCookieSettings } from "./helper.ts";

const InputData = {
  searchInputText: "Employee Education in 2018: Strategies to Watch",
};

test("Verify search functionality", async ({ browser }) => {
  const page =
    await test.step("Navigate to homepage and reject all privacy terms", async () => {
      const page = await rejectAllCookieSettings(browser);
      return page;
    });

  const homePage = await test.step("Click on search icon", async () => {
    const homePage = new HomePage(page);
    await homePage.navClickSearchIcon();
    return homePage;
  });

  await test.step("Verify search field", async () => {
    const txtSearchField = await homePage.getSearchField();
    await expect(txtSearchField).toBeVisible();
  });

  const searchResultsPage =
    await test.step("Enter text and search results", async () => {
      const searchResultsPage = new SearchResultsPage(page);
      await homePage.enterSearchFieldText(InputData.searchInputText);

      await homePage.clickSearchButton();

      return searchResultsPage;
    });

  await test.step("Fetch and verify title of first search result", async () => {
    const actualText = await searchResultsPage.getSearchResultsTitle(1);
    expect(actualText).toEqual(InputData.searchInputText);
  });

  await page.close();
});
