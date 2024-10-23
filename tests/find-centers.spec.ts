import { expect, test } from "@playwright/test";
import { rejectAllCookieSettings } from "./helper.ts";
import HomePage from "../src/pages/home.page.ts";
import FindCenterPage from "../src/pages/find.center.page.ts";

const InputData = {
  location: "New York",
};

test("Verify comments", async ({ browser }) => {
  const page =
    await test.step("Navigate to homepage and reject privacy terms", async () => {
      const page = await rejectAllCookieSettings(browser);
      return page;
    });

  await test.step("Navigate to center page", async () => {
    const homePage = new HomePage(page);
    await homePage.navClickFindCenterButton();
  });

  await test.step("Verify URL", async () => {
    const findCenterPage = new FindCenterPage(page);

    expect(await findCenterPage.fetchUrl()).toContain("/child-care-locator");
  });

  const findCenterPage =
    await test.step("Enter location and verify results", async () => {
      const findCenterPage = new FindCenterPage(page);
      await findCenterPage.enterLocation(InputData.location);

      const centersCount = await findCenterPage.getCentersTotalCount();

      const centersResultsCount =
        await findCenterPage.getAllCentersResultsCount();

      expect(centersCount).toEqual(centersResultsCount);

      return findCenterPage;
    });

  await test.step("Select first center and verify map popup details", async () => {
    const { resultCenterName, resultCenterAddress } =
      await findCenterPage.getFirstCenterDetails();

    await resultCenterName.click();

    const { mapCenterName, mapCenterAddress } =
      await findCenterPage.getCenterMapPopupDetails();

    expect(mapCenterName).toEqual(await resultCenterName.textContent());
    expect(mapCenterAddress).toEqual(resultCenterAddress?.trim());
  });
});
