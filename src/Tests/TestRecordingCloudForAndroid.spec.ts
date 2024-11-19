import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import fs from "fs";
const jsondata = require("../../data.json");

import axios from "axios";
import { LoginAndLogout } from '../Pages/LoginAndLogOut.page';
import { CloudAndroid } from '../Pages/TestCaseRecordingForCloudAndriod.page';

test.use({ actionTimeout: 90000 });

test.describe("Test suit", () => {
  let page: Page;
  let Login = new LoginAndLogout();
  let Android = new CloudAndroid();

  // Setup browser and page before all tests
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(jsondata.URL);
    await page.waitForLoadState('load');
    await page.reload();
    
  });

  // Close the browser after all tests
  test.afterAll(async () => {
    // Wait for 2 seconds before closing
    await page.waitForTimeout(4000);

    // Close the page and browser
    await page.close();
    await page.context().browser()?.close();
  });

  test.beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay
  });

  test('Test 1: Tenant Login Functionality', async () => {
    test.setTimeout(240000);
    //await page.waitForTimeout(3000);
    Login.Login(page);
    await page.waitForLoadState('load');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: jsondata.SearchedProject });
    await page.waitForTimeout(5000);
  });


  test('Test 2: Tenant Logout Functionality', async () => {
    test.setTimeout(240000);
    Login.Login(page);
    await page.waitForLoadState('load');
    Login.Tenant_Logout(page);
    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: jsondata.SearchedProject });
  });

  test('Test 3: Verify that the login page loads successfully with all essential elements', async () => {
    // await page.goto(jsondata.URL);
    await page.waitForLoadState('load');
    
    // Call verifyEssentialElements to check all elements
    await Login.verifyEssentialElements(page);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: jsondata.SearchedProject });
   });

  
  test('Test 4: verifyForgotifoundclick', async () => {
    await page.waitForLoadState('load');
    // Call verifyForgotifoundclick to check element, click, navigate, and verify text
    await Login.verifyForgotifoundclick(page);
      await page.waitForTimeout(1000);
    await page.screenshot({ path: jsondata.SearchedProject });
    //await page.waitForTimeout(5000);
  });

  
  test('Test 5: Tenant Login and HTTP Master Checks', async () => {
    test.setTimeout(240000);
    // Step 1: Perform Login
    await page.waitForTimeout(1000);
    await Login.Login(page);
    await page.waitForLoadState('load');
    await page.waitForTimeout(4000);
    // Step 2: Call httpMasterChecks after login
    await page.waitForTimeout(4000);
    const httpMaster = new LoginAndLogout();
    await page.waitForTimeout(4000);
    await httpMaster.httpMasterChecks(page);
    await page.waitForLoadState('load');
    await page.screenshot({ path: jsondata.SearchedProject });
});

  
test('Test 6: Verify that the google sign-in option initiates Google authentication ', async () => {
  test.setTimeout(240000);
  // Step 1: Perform Login
  await page.waitForTimeout(1000);
  await Login.verifyGoogleSignIn(page);
  await page.waitForLoadState('load');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: jsondata.SearchedProject });
});


test('Test 7: verify for global search ', async () => {
  test.setTimeout(240000);
  // Step 1: Perform Login
  await page.waitForTimeout(1000);
  await Login.Login(page);
  await page.waitForLoadState('load');
  await Login.performSearch(page)
  await page.waitForTimeout(3000);
  await page.screenshot({ path: jsondata.SearchedProject });
});

test('Test 8: No results or projects found ', async () => {
  test.setTimeout(240000);
  // Step 1: Perform Login
  await page.waitForTimeout(1000);
  await Login.Login(page);
  await page.waitForLoadState('load');
  await Login.performSearchnoprojects(page)
  await page.waitForTimeout(3000);
  await page.screenshot({ path: jsondata.SearchedProject });
});


test('Test 9: Multi-Login Functionality with Persistent Sessions', async ({ browser }) => {
  test.setTimeout(240000);

  //const LoginPage = new LoginAndLogout();
  const numberOfLogins = 3; // Number of separate sessions to test
  const contexts: BrowserContext[] = []; // Array to hold contexts for each session

  for (let i = 1; i <= numberOfLogins; i++) {
    console.log(`Attempt ${i}: Starting login in a new session...`);

    // Step 1: Create a new context for an isolated session
    const context = await browser.newContext();
    contexts.push(context); // Store the context to keep the session active

    // Step 2: Open a new page in this context and perform login
    const page = await context.newPage();
    await page.goto(jsondata.URL);  // Assuming this is the app's login URL
    await Login.Login(page);    // Perform login in this session

    await page.waitForLoadState('load');
    await page.waitForTimeout(1000);

    // Step 3: Verify login success (check if PostLoginSelector is present)
    if (jsondata.PostLoginSelector && await page.$(jsondata.PostLoginSelector)) {
      console.log(`Login attempt ${i} was successful in new session.`);
    } else {
      console.error(`Login attempt ${i} failed. Post-login element not found.`);
      throw new Error(`Multi-login test failed on attempt ${i}`);
    }

    // Step 4: Take a screenshot for each session to verify successful login
    await page.screenshot({ path: `${jsondata.SearchedProject}_Session_${i}.png` });
  }

  // Verify all contexts are still active
  for (let i = 0; i < contexts.length; i++) {
    const context = contexts[i];
    const pages = context.pages();
    console.log(`Session ${i + 1} is active with ${pages.length} page(s) open.`);
  }

  console.log(`Completed ${numberOfLogins} independent login sessions successfully.`);
});
 

  
test('Test 10: Download Agent Case ', async () => {
  test.setTimeout(240000);
  // Step 1: Perform Login
  await page.waitForTimeout(3000);
  await Login.Login(page);
  // await page.waitForLoadState('load');
  await Login.downloadAgent(page)
  await page.waitForTimeout(3000);
});


//-----------------------------------------SEND REPORT TO MAIL----------------------------------
test('Test 11: Send report to email ', async () => {
  test.setTimeout(240000);
  // Step 1: Perform Login
  await page.waitForTimeout(3000);
  await Login.Login(page);
  // await page.waitForLoadState('load');
  await Login.SendreporttoEmail(page)
});

test('Test 12: addordeleettestcase ', async () => {
  test.setTimeout(240000);
  // Step 1: Perform Login
  await page.waitForTimeout(3000);
  await Login.Login(page);
  // await page.waitForLoadState('load');
  await Login.addordeletetestcase(page)
});



});









