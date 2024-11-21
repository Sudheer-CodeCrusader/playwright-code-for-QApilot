import { test, expect, Page } from '@playwright/test';
// import * as jsondata from "../../data.json";
import fs from "fs";
import jsondata from "../../LoginData.json";
import AndroidData from "../../CloudAndroidData.json";
import axios from "axios";
// import { auto } from "auto-playwright";
import { LoginAndLogout } from '../Pages/LoginAndLogOut.page';
import { CloudAndroid } from '../Pages/TestCaseRecordingForCloudAndriod.page';
import { CloudiOS } from '../Pages/TestCaseRecordingForCloudiOS.page';
import path from 'path';
test.use({ actionTimeout: 90000 });

const screenshotFolder = path.join(__dirname, "../../", 'ScreenShots');

test.describe("Test suit", () => {
  let page: Page;

  let Login = new LoginAndLogout();
  // let Android = new CloudAndroid();
  let iOS = new CloudiOS();
  test.beforeAll(async ({ browser }) => {
    // const context = await browser.newContext();
    //page = await context.newPage();
    page = await browser.newPage();
    // await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(jsondata.URL);
    await page.waitForLoadState('load');
    await page.reload();
  });

  test.afterAll(async ({ browser }) => {
    await page.waitForTimeout(2000);
    browser.close;
  });


  test('Test 1: Tenant Login Functionality', async () => {
    test.setTimeout(240000);
    try{
    await page.waitForTimeout(1000);
    Login.Login(page);
    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);
    const screenshotPath = path.join(screenshotFolder, 'LoginPage.png');
    const fs = require('fs');
    if (!fs.existsSync(screenshotFolder)) {
      fs.mkdirSync(screenshotFolder, { recursive: true });
    }
    // Take a screenshot and save it to the folder
    await page.screenshot({ path: screenshotPath });
    console.log(' Tenant Login Functionality successfully, and the screenshot has been saved.');
  }catch(error){
    console.error('An error occurred during the test case execution:', error);
    const errorScreenshotPath = path.join(screenshotFolder, 'Alertpop_Error.png');
    await page.screenshot({ path: errorScreenshotPath });
    throw error;

  }
  });
  test('Test 2: Accept Tenant login confirmation pop-up', async () => {
    test.setTimeout(240000);
    try{
    await page.waitForTimeout(1000);
    await Login.accept_alertopup(page);
    await page.waitForLoadState('load');
    await page.waitForTimeout(3000);
    const screenshotPath = path.join(screenshotFolder, 'Alertpop.png');
    await page.screenshot({ path: screenshotPath });
    console.log('Tenant login confirmation pop-up accepted successfully, and the screenshot has been saved.');
  }catch(error){
    console.error('An error occurred during the test case execution:', error);
      const errorScreenshotPath = path.join(screenshotFolder, 'Alertpop_Error.png');
      await page.screenshot({ path: errorScreenshotPath });
      throw error;

  }
  });
  test('Test 3: Search the existing project', async () => {
    test.setTimeout(240000);
    try{
    await page.waitForTimeout(1000);
    await iOS.Exeisting_Project_Search_Functionality(page);
    await page.waitForLoadState('load');
    await page.waitForTimeout(5000);
    const screenshotPath = path.join(screenshotFolder, 'ExistingProjectSearch.png');
    await page.screenshot({ path: screenshotPath });
    console.log('Project search completed successfully, and the screenshot has been saved.');
    }catch(error){
      console.error('An error occurred during the test case execution:', error);
      const errorScreenshotPath = path.join(screenshotFolder, 'ExistingProjectSearch_Error.png');
      await page.screenshot({ path: errorScreenshotPath });
      throw error;
    }
  });
  test('Test 4: Choose your Connection Configuration', async () => {
    test.setTimeout(240000);
    try{
    await page.waitForTimeout(1000);
    await iOS.Choose_your_Connection_Configuration(page);
    await page.waitForLoadState('load');
    await page.waitForTimeout(3000);
    const screenshotPath = path.join(screenshotFolder, 'Choose_Connection.png');
    await page.screenshot({ path: screenshotPath });
    console.log('Choose your Connection Configuration functionality executed successfully, and the screenshot has been saved.');
    }catch(error){
      console.error('An error occurred during the test case execution:', error);
      const errorScreenshotPath = path.join(screenshotFolder, 'Choose_Connection_Error.png');
      await page.screenshot({ path: errorScreenshotPath });
      throw error;

    }
  });
  test('Test 5: Select App & Test Case Configuration Functionality', async () => {
    test.setTimeout(240000);
    try {
      await page.waitForTimeout(1000);
      await iOS.SelectApp_TestCase(page);
      await page.waitForLoadState('load');
      await page.waitForTimeout(3000);
      const screenshotPath = path.join(screenshotFolder, 'Select App & Test Case.png');
      await page.screenshot({ path: screenshotPath });
      console.log('App and Test Case Configuration functionality executed successfully, and the screenshot has been saved.');
    } catch (error) {
      console.error('An error occurred during the test case execution:', error);
      const errorScreenshotPath = path.join(screenshotFolder, 'SelectApp_TestCase_Error.png');
      await page.screenshot({ path: errorScreenshotPath });
      throw error;

    }

  });
  test('Test 6: Recording Test Case Functionality', async ({ page }) => {
    test.setTimeout(240000);
    try {
      await page.waitForTimeout(1000);
      await iOS.Testcase_Recording_Functionality(page);
      await page.waitForLoadState('load');
      await page.waitForTimeout(3000);
      const screenshotPath = path.join(screenshotFolder, 'RecordingTestCase.png');
      await page.screenshot({ path: screenshotPath });
      console.log('Test case recorded successfully and screenshot saved.');
    } catch (error) {
      console.error('An error occurred during the test case execution:', error);
      const errorScreenshotPath = path.join(screenshotFolder, 'RecordingTestCase_Error.png');
      await page.screenshot({ path: errorScreenshotPath });
      throw error;
    }
  });

});