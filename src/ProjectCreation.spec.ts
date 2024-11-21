import { test, expect, Page } from '@playwright/test';
// import * as jsondata from "../../data.json";
import fs, { cp } from "fs";
import jsondata from "../../LoginData.json";
import AndroidData from "../../CloudAndroidData.json";
import axios from "axios";
// import { auto } from "auto-playwright";
import { LoginAndLogout } from '../Pages/LoginAndLogOut.page';
import { CloudAndroid } from '../Pages/TestCaseRecordingForCloudAndriod.page';
import { CloudiOS } from '../Pages/TestCaseRecordingForCloudiOS.page';
import { CreateProject } from '../Pages/CreateProject.page'
import path from 'path';
test.use({ actionTimeout: 90000 });

const screenshotFolder = path.join(__dirname, "../../", 'ScreenShots');

test.describe("Test suit", () => {
  let page: Page;

  let Login = new LoginAndLogout();
  // let Android = new CloudAndroid();
  let Android = new CloudAndroid();
  let CPAT = new CreateProject();
  test.beforeAll(async ({ browser }) => {
    try{
    // const context = await browser.newContext();
    //page = await context.newPage();
    page = await browser.newPage();
    // await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(jsondata.URL);
    await page.waitForLoadState('load');
    await page.reload();
    }catch(error){
      console.error('Error occurred during beforeAll setup:', error);
    }
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
//   test('Test 2: Accept Tenant login confirmation pop-up', async () => {
//     test.setTimeout(240000);
//     try{
//     await page.waitForTimeout(1000);
//     await Login.accept_alertopup(page);
//     await page.waitForLoadState('load');
//     await page.waitForTimeout(3000);
//     const screenshotPath = path.join(screenshotFolder, 'Alertpop.png');
//     await page.screenshot({ path: screenshotPath });
//     console.log('Tenant login confirmation pop-up accepted successfully, and the screenshot has been saved.');
//   }catch(error){
//     console.error('An error occurred during the test case execution:', error);
//       const errorScreenshotPath = path.join(screenshotFolder, 'Alertpop_Error.png');
//       await page.screenshot({ path: errorScreenshotPath });
//       throw error;

//   }
//   });
  test('Test 3: Creating a new project by providing valid data.', async () => {
    test.setTimeout(240000);
    try{
    await page.waitForTimeout(1000);
    await CPAT.Create_Project_And_Assign_Team(page);
    await page.waitForLoadState('load');
    await page.waitForTimeout(5000);
    const screenshotPath = path.join(screenshotFolder, 'ProjectCreation.png');
    await page.screenshot({ path: screenshotPath });
    console.log('Project creation completed successfully, and the screenshot has been saved.');
    }catch(error){
      console.error('An error occurred during the test case execution:', error);
      const errorScreenshotPath = path.join(screenshotFolder, 'ProjectCreation_error.png');
      await page.screenshot({ path: errorScreenshotPath });
      throw error;
    }
  });
  test('Test 4: Updating the functionality of an already created project', async () => {
    test.setTimeout(240000);
    try{
    await page.waitForTimeout(1000);
    await CPAT.Update_Created_Project(page);
    await page.waitForLoadState('load');
    await page.waitForTimeout(5000);
    const screenshotPath = path.join(screenshotFolder, 'UpdateProject.png');
    await page.screenshot({ path: screenshotPath });
    console.log('Project updated successfully, and the screenshot has been saved.');
    }catch(error){
      console.error('An error occurred during the test case execution:', error);
      const errorScreenshotPath = path.join(screenshotFolder, 'UpdateProject_Error.png');
      await page.screenshot({ path: errorScreenshotPath });
      throw error;
    }
  });
 
  
 

});