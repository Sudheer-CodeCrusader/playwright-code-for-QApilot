import  type { Page, BrowserContext } from '@playwright/test';
import * as jsondata from "../../data.json";
import { Browser } from '@playwright/test';

import axios from 'axios';
import { JSDocParsingMode } from 'typescript';
export class LoginAndLogout {
  readonly page: any;
  constructor() {
    // this.page = "";
  }

    //****************************************************CASE -1|| CASE -5  Verify that a user can log in with valid credentials & MULTI LOGIN ******************************//


  public async Login(page: any) {
    // Fill username
    
    await page.fill(jsondata.usernamefield, jsondata.TenantUsername);
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Fill password
    await page.fill(jsondata.PasswordField, jsondata.TenantPassword);
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Press Enter to log in
    await page.keyboard.press('Enter');
  
    console.log("Before proceedbutton");
    await page.waitForTimeout(5000);
  
    // Check if the proceed button is visible
    const isProceedButtonVisible = await page.isVisible(jsondata.proceedbutton);
  
    if (isProceedButtonVisible) {
      console.log("Proceed button is visible, proceeding with click flow.");
      await this.verifyElementIsVisible(page, 'Project Name', jsondata.proceedbutton);
      console.log("At proceedbutton");
      await page.click(jsondata.proceedbutton);
      console.log("After Clicked on proceedbutton success.");
      await page.waitForTimeout(3000);
    } else {
      console.log("Proceed button is not visible, skipping to project verification.");
    }

    // Verify the project selector is visible
    await this.verifyElementIsVisible(page, 'Project Name', jsondata.PostLoginSelector);
    console.log("Project is visible, login is successful.");
    await page.waitForTimeout(7000);
  }

  

    //****************************************************CASE - 2 Verify that user is able to logout ************************************************************************//
    public async Tenant_Logout(page: any){
      //await page.waitForTimeout(4000);
      try {
        
      const Profile_Icon = jsondata.ProfileIcon;
      const ProfileIcon = await page.waitForSelector(`xpath=${Profile_Icon}`, { timeout: 7000 });
      await ProfileIcon.click();
    } catch (error) {
      console.error("Error selecting or clicking the Profile Icon:", error);
      throw error;
  }
      await page.waitForTimeout(3000);
      const Tenant_LogOut_Profile = jsondata.TenantLogOut;
      const TenantLogOut = await page.waitForSelector(`xpath=${Tenant_LogOut_Profile}`,{ timeout: 5000 });
      await TenantLogOut.click();
      await page.waitForTimeout(3000);
    
    }


    //****************************************************CASE -3 Verify that the login page loads successfully with all essential elements***********************************//
  public async verifyEssentialElements(page: Page) {
    const elementsToCheck = {
      'QA Pilot Logo': jsondata.QApilot_Logo,'Email Text Label': jsondata.Email_Text,'Password Field Label': jsondata.Password_Field,'Login Button': jsondata.Login_Button,
      'Forgot Button': jsondata.Forgot_Button,'Google Icon': jsondata.Google_Icon
    };
    for (const [elementName, selector] of Object.entries(elementsToCheck)) {
      await this.verifyElementIsVisible(page, elementName, selector);
    }
  }
  public async verifyElementIsVisible(page: Page, elementName: string, selector: string) {
    try {
      await page.waitForSelector(selector, { timeout: 50000 });
      console.log(`${elementName} is present on the page.`);
    } catch (error) {
      console.error(`Error: ${elementName} is not present on the page.`);
      throw error;
    }
  }



  //******************************************************CASE -4 Verify that clicking the "Forgot password?" link redirects the user to the password recovery page********************//
  public async verifyForgotifoundclick(page: Page) {
    // FIND FORGOT PASSWORD BUTTON
        const elementsToCheck = {
        'Forgot Button': jsondata.Forgot_Button,
    };
    for (const [elementName, selector] of Object.entries(elementsToCheck)) {
    //If Element visible Perform Click 
        await this.verifyElementIsVisible(page, elementName, selector);
        await page.click(selector);  // Click the "Forgot Button"
        console.log(`Clicked on ${elementName}`);
    // Verify if the current URL matches the expected URL if click performed
      const currentUrl = page.url();
      if (currentUrl === jsondata.Expected_URL) {
        console.log("Navigation to Forgot Password page was successful.");
      } else {
        console.error("Error: Redirected URL does not match the expected URL.");
        throw new Error("URL verification failed.");
      }
      // Verify the presence of the "Forgot Your Password?" text on the new page
      await this.verifyElementText(page, jsondata.Forgot_your_password_text, "Forgot Your Password?");
      await page.goto(jsondata.LoginURL);
      await page.waitForTimeout(2000);
      
    }
  }
  public async verifyElementIsVisibleinpage(page: Page, elementName: string, selector: string) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      console.log(`${elementName} is present on the page.`);
    } catch (error) {
      console.error(`Error: ${elementName} is not present on the page.`);
      throw error;
    }
  }
  public async verifyElementText(page: Page, selector: string, expectedText: string) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 });
      const actualText = await page.$eval(selector, el => el.textContent?.trim());
      if (actualText === expectedText) {
        console.log(`Text "${expectedText}" is present on the page.`);
        await page.goto(jsondata.URL);
      } else {
        console.error(`Error: Text does not match. Expected "${expectedText}", found "${actualText}".`);
        throw new Error("Text verification failed.");
        await page.goto(jsondata.URL);
      }
    } catch (error) {
      console.error("Error: Failed to verify text on the page.");
      throw error;
    }
  }
 
//***********************************************************CASE -6 HTTP MASTER CHECKS ***********************************************************//

public async httpMasterChecks(page: Page) { 
    // Define the xPaths and text values
    const projectSelector = jsondata.projectSelector
    const welcomeTextSelector = jsondata.welcomeTextSelector
    const sideMenuIconSelector = jsondata.sideMenuIconSelector
    const httpMasterSelector = jsondata.httpMasterSelector
    const expectedWelcomeText = jsondata.expectedWelcomeText
   // const proceedbutton = jsondata.proceedbutton

    try {
    
  
        const quickSearchInputXPath = "//input[@id='qksearch' and @placeholder='Quick Search']";
        await page.waitForSelector(quickSearchInputXPath, { timeout: 5000 });
        console.log("Quick Search input box found.");
        
        // Enter the text and search
        const searchText = "HTTP MASTER CREATE PROJECT SAMPLE";
        await page.fill(quickSearchInputXPath, searchText);
        console.log(`Entered text: '${searchText}'`);
        await page.press(quickSearchInputXPath, 'Enter');
        console.log("Pressed Enter to initiate search.");
        await page.waitForTimeout(2000);
    
        // Check if the result is visible and click
        const projectSelector = jsondata.projectSelector;
        await page.waitForSelector(projectSelector, { timeout: 5000 });
        console.log("Search result found.");
        const resultText = await page.textContent(projectSelector);
        console.log(`Result Text: ${resultText}`);
        console.log("At projectSelector");
        await page.click(jsondata.projectSelector);
        console.log("Came out of projectSelector");
        await page.waitForTimeout(5000);


        // Verify the welcome text after the click
        //await this.verifyElementText(page, welcomeTextSelector, expectedWelcomeText);
        // Click on the side menu icon
        await this.verifyElementIsVisibleinhttp(page, 'Side Menu Icon', sideMenuIconSelector);
        await page.click(sideMenuIconSelector);
        console.log("Clicked on Side Menu Icon.");


        // Click on HTTP Master option in submenu
        await this.verifyElementIsVisibleinhttp(page, 'HTTP Master Menu Item', httpMasterSelector);
        await page.click(httpMasterSelector);
        console.log("Clicked on HTTP Master in the submenu.");
        await page.goto(jsondata.URL);

    } catch (error) {
        console.error("Error during HTTP Master Checks:", error);
        throw error;
    }

}

// Example of existing helper function usage
public async verifyElementIsVisibleinhttp(page: Page, elementName: string, selector: string) {
    try {
        await page.waitForSelector(selector, { timeout: 8000 });
        console.log(`${elementName} is present on the page.`);
    } catch (error) {
        console.error(`Error: ${elementName} is not present on the page.`);
        throw error;
    }
}

public async verifyElementTextinhttp(page: Page, selector: string, expectedText: string) {
    try {
        await page.waitForSelector(selector, { timeout: 5000 });
        const actualText = await page.$eval(selector, el => el.textContent?.trim());
        if (actualText === expectedText) {
            console.log(`Text "${expectedText}" is present on the page.`);
        } else {
            console.error(`Error: Text does not match. Expected "${expectedText}", found "${actualText}".`);
            throw new Error("Text verification failed.");
        }
    } catch (error) {
        console.error("Error: Failed to verify text on the page.");
        throw error;
    }
}

 
//******************************************************// CASE 7 Verify google sign //******************************************************
public async verifyGoogleSignIn(page: Page) {
  const googleSignInSelector = "//span[@class='nsm7Bb-HzV7m-LgbsSe-BPrWId']";

  try {
    // Wait for the Google sign-in button
    await page.waitForSelector(googleSignInSelector, { timeout: 50000 });
    console.log("Google sign-in button is present on the page.");

    // Click the Google sign-in button
    await page.click(googleSignInSelector);
    console.log("Clicked on the Google sign-in button.");

    // Wait for the new Google sign-in pop-up to appear
    const [popup] = await Promise.all([
      page.context().waitForEvent('page'), // Wait for the new pop-up page
      page.waitForTimeout(2000),          // Small delay for UI response
    ]);

    console.log("Google sign-in pop-up opened.");

    // Perform optional verification on the pop-up
    // Example: Verify the title of the pop-up
    await popup.waitForLoadState('domcontentloaded');
    const popupTitle = await popup.title();
    console.log(`Google sign-in pop-up title: ${popupTitle}`);

    // If you want to close the pop-up immediately:
    await popup.close();
    console.log("Google sign-in pop-up closed.");
  } catch (error) {
    console.error("Error: Unable to handle Google sign-in functionality.");
    throw error;
  }
}


  //****************************************************** //CASE 8 global search //quicksearch //******************************************************

public async performSearch(page: Page) {
  try {
    // XPath for the quick search input box
    const quickSearchInputXPath = "//input[@id='qksearch' and @placeholder='Quick Search']";

    // Wait for the input box to appear
    await page.waitForSelector(quickSearchInputXPath, { timeout: 5000 });
    console.log("Quick Search input box found.");

    // Enter the text "HTTP MASTER CREATE PROJECT SAMPLE"
    const searchText = "HTTP MASTER CREATE PROJECT SAMPLE";
    await page.fill(quickSearchInputXPath, searchText);
    console.log(`Entered text: '${searchText}'`);

    await page.press(quickSearchInputXPath, 'Enter');
    console.log("Pressed Enter to initiate search.");

    // Wait for 2 seconds to fetch results
    await page.waitForTimeout(2000);

    // XPath for the expected result
    const projectSelector = jsondata.projectSelector;

    // Check if the result element is visible
    await page.waitForSelector(projectSelector, { timeout: 5000 });
    console.log("Search result found.");

    // Return the result text (optional)
    const resultText = await page.textContent(projectSelector);
    console.log(`Result Text: ${resultText}`);
    await page.goto(jsondata.URL); //added

  } catch (error) {
    console.error("Error during quick search:", error);
    throw error;
  }
}

//******************************************************//CASE - 9 performSearchnoprojects //******************************************************

public async performSearchnoprojects(page: Page) {
  try {
    // XPath for the quick search input box
    const quickSearchInputXPath = "//input[@id='qksearch' and @placeholder='Quick Search']";

    // Wait for the input box to appear
    await page.waitForSelector(quickSearchInputXPath, { timeout: 5000 });
    console.log("Quick Search input box found.");

    // Enter the text "HTTP MASTER CREATE PROJECT SAMPLE"
    const searchText = "invalidsearch verification";
    await page.fill(quickSearchInputXPath, searchText);
    console.log(`Entered text: '${searchText}'`);

    await page.press(quickSearchInputXPath, 'Enter');
    console.log("Pressed Enter to initiate search.");

    // Wait for 2 seconds to fetch results
    await page.waitForTimeout(2000);

    // XPath for the expected result
    const Noprojectsfound = jsondata.Noprojectsfound;

    // Check if the result element is visible
    await page.waitForSelector(Noprojectsfound, { timeout: 5000 });
    console.log("Search result found.");

    // Return the result text (optional)
    const resultText = await page.textContent(Noprojectsfound);
    console.log(`Result Text: ${resultText}`);
    await page.goto(jsondata.URL);
  } catch (error) {
    console.error("Error during quick search:", error);
    throw error;
  }
}

//******************************************************//CASE 10 downloadAgent CASE//******************************************************

  public async downloadAgent(page: Page) {
    try {
      // Wait for the help link icon and click it
      const helpLinkXPath = jsondata.helpLinkXPath;
      await page.waitForSelector(helpLinkXPath, { timeout: 5000 });
      await page.click(helpLinkXPath);
      console.log("Help link clicked");

      // Navigate to the download repository URL
      const downloadRepoURL = jsondata.downloadrepoURL;
      await page.goto(downloadRepoURL);
      console.log("Navigated to the download repository URL");

      // Check for the 'Local Agent Executor' element
      const localAgentXPath = "//h3[normalize-space()='Local Agent Executor']";
      const localAgentElement = page.locator(`xpath=${localAgentXPath}`);
      await localAgentElement.waitFor({ timeout: 5000 });
      console.log("'Local Agent Executor' element found");

      // Click the download icon
      const downloadIconXPath = jsondata.downloadIconXPath;
      const downloadIcon = page.locator(`xpath=${downloadIconXPath}`);
      await downloadIcon.click();
      console.log("Download icon clicked");

      // Wait for 2 seconds
      await page.waitForTimeout(2000);

      // Take a screenshot
      const screenshotPath = 'local_agent_download.png';
      await page.screenshot({ path: screenshotPath });
      console.log(`Screenshot taken and saved at: ${screenshotPath}`);

      // Close the download popup (if applicable)
      console.log("Popup closed (if applicable)");
        await page.goto(jsondata.URL);
    } catch (error) {
      console.error("Error in downloading the agent:", error);
    }
  }

  //-------------------------------------------CASE 11 send report to mail ----------------
  public async SendreporttoEmail(page: Page) {
    try {
      // Quick search input box
      const quickSearchInputXPath = "//input[@id='qksearch' and @placeholder='Quick Search']";
      await page.waitForSelector(quickSearchInputXPath, { timeout: 5000 });
      console.log("Quick Search input box found.");
      
      // Enter the text and search
      const searchText = "HTTP MASTER CREATE PROJECT SAMPLE";
      await page.fill(quickSearchInputXPath, searchText);
      console.log(`Entered text: '${searchText}'`);
      await page.press(quickSearchInputXPath, 'Enter');
      console.log("Pressed Enter to initiate search.");
      await page.waitForTimeout(2000);
  
      // Check if the result is visible and click
      const projectSelector = jsondata.projectSelector;
      await page.waitForSelector(projectSelector, { timeout: 5000 });
      console.log("Search result found.");
      const resultText = await page.textContent(projectSelector);
      console.log(`Result Text: ${resultText}`);
      await page.click(jsondata.projectSelector);
      await page.waitForTimeout(5000);
  
      // Click the sidebar for reports
      const reportsSidebarXPath = jsondata.reportsSidebarXPath;
      await page.waitForSelector(reportsSidebarXPath, { timeout: 5000 });
      await page.click(reportsSidebarXPath);
      console.log("Clicked on the sidebar for reports.");
  
      // Click the sub-element for Executions
      const ReportsXpath = jsondata.ReportsXpath;
      await page.waitForSelector(ReportsXpath, { timeout: 5000 });
      await page.click(ReportsXpath);
      console.log("Clicked on Executions sub-element.");
      await page.waitForTimeout(3000);
      // Search for the report in the reports search box
      const reportsSearchBoxXPath = jsondata.reportsSearchBoxXPath;
      await page.waitForSelector(reportsSearchBoxXPath, { timeout: 5000 });
      const reportText = "sudheer Automation report push";
      await page.fill(reportsSearchBoxXPath, reportText);
      console.log(`Entered text in Reports Search Box: '${reportText}'`);
      await page.press(reportsSearchBoxXPath, 'Enter');
      console.log("Pressed Enter to search the report.");
      await page.waitForTimeout(2000);
  
      // Locate the report and click it
      const reportSelectorXPath = "//h5[normalize-space()='sudheer Automation report push']";
      await page.waitForSelector(reportSelectorXPath, { timeout: 5000 });
      console.log(`Report with text '${reportText}' found.`);
      await page.click(reportSelectorXPath);
      console.log("Clicked on the report.");
  
      // Click the icon
      const iconXPath = "(//*[name()='svg'])[24]";
      await page.waitForSelector(iconXPath, { timeout: 5000 });
      await page.click(iconXPath);
      console.log("Clicked on the icon for the selected report.");
  
      // Additional checks and actions for popup
      const reportConfigPopupXPath = jsondata.Reportconfpopup;
      await page.waitForSelector(reportConfigPopupXPath, { timeout: 5000 });
      console.log("Report Configuration popup found.");
  
      const emailInputBoxXPath = jsondata.emailreportinputbox;
      await page.waitForSelector(emailInputBoxXPath, { timeout: 5000 });
      console.log("Email input box found.");
      const emailText = "saisudheer.ka@digitral.com";
      await page.fill(emailInputBoxXPath, emailText);
      console.log(`Entered email: '${emailText}'`);
  
      const emailSendButtonXPath = jsondata.emailsendinpopup;
      await page.waitForSelector(emailSendButtonXPath, { timeout: 5000 });
      await page.click(emailSendButtonXPath);
      console.log("Clicked the send button in the popup.");
      await page.goto(jsondata.URL);
    } catch (error) {
      console.error("Error during report search and email sending:", error);
      throw error;
    }
  }
  
  //-----------------------CASE 12 - 13 USER IS ABLE TO ADD AND DELETE TEXT CASE
  public async addordeletetestcase(page: Page) {
    try {
      // Quick search input box
      const quickSearchInputXPath = "//input[@id='qksearch' and @placeholder='Quick Search']";
      await page.waitForSelector(quickSearchInputXPath, { timeout: 5000 });
      console.log("Quick Search input box found.");
      
      // Enter the text and search
      const searchText = "HTTP MASTER CREATE PROJECT SAMPLE";
      await page.fill(quickSearchInputXPath, searchText);
      console.log(`Entered text: '${searchText}'`);
      await page.press(quickSearchInputXPath, 'Enter');
      console.log("Pressed Enter to initiate search.");
      await page.waitForTimeout(2000);
  
      // Check if the result is visible and click
      const projectSelector = jsondata.projectSelector;
      await page.waitForSelector(projectSelector, { timeout: 5000 });
      console.log("Search result found.");
      const resultText = await page.textContent(projectSelector);
      console.log(`Result Text: ${resultText}`);
      await page.click(projectSelector);
      await page.waitForTimeout(4000);
  
      // Navigate to the configurations side menu
      const configurationsSideMenuXPath = "(//*[name()='svg'][@class='ant-menu-item-icon'])[2]";
      await page.waitForSelector(configurationsSideMenuXPath, { timeout: 5000 });
      console.log("Configurations side menu found.");
      await page.click(configurationsSideMenuXPath);
      console.log("Clicked on the configurations side menu.");
      await page.waitForTimeout(2000);
  
      // Navigate to the "Test Cases" sub-option
      const createTestCaseSideNavXPath = "//a[normalize-space()='Test Cases']";
      await page.waitForSelector(createTestCaseSideNavXPath, { timeout: 5000 });
      console.log("Test Cases sub-option found.");
      await page.click(createTestCaseSideNavXPath);
      console.log("Clicked on the Test Cases sub-option.");
      await page.waitForTimeout(2000);
  
      // Click "Add Test Case" button
      const addTestCaseButtonXPath = "//button[@id='add_testcase']//span[@class='ant-btn-icon']//*[name()='svg']";
      await page.waitForSelector(addTestCaseButtonXPath, { timeout: 5000 });
      console.log("Add Test Case button found.");
      await page.click(addTestCaseButtonXPath);
      console.log("Clicked on the Add Test Case button.");
      await page.waitForTimeout(2000);
  
      // Fill out test case details
      const testCaseTitleXPath = "//input[@id='title']";
      await page.waitForSelector(testCaseTitleXPath, { timeout: 5000 });
      await page.fill(testCaseTitleXPath, "sudheer automation case");
      console.log("Filled in Test Case Title.");
  
      const testCaseIDXPath = "//input[@id='testcaseid']";
      await page.waitForSelector(testCaseIDXPath, { timeout: 5000 });
      await page.fill(testCaseIDXPath, "sudheer automate");
      console.log("Filled in Test Case ID.");
  
      const versionInfoXPath = "//span[@title='All Versions']";
      await page.waitForSelector(versionInfoXPath, { timeout: 5000 });
      await page.click(versionInfoXPath);
      console.log("Clicked on Version Info dropdown.");
  
      const versionDropdownOptionXPath = "//div[@class='ant-select-item ant-select-item-option' and @title='1']";
      await page.waitForSelector(versionDropdownOptionXPath, { timeout: 5000 });
      await page.click(versionDropdownOptionXPath);
      console.log("Selected version from dropdown.");
  
      const featureBoxXPath = "(//textarea[@id='feature'])[1]";
      await page.waitForSelector(featureBoxXPath, { timeout: 5000 });
      await page.fill(featureBoxXPath, "sample automation");
      console.log("Filled in Feature Box.");
  
      const testCaseStoryXPath = "(//textarea[@id='story'])[1]";
      await page.waitForSelector(testCaseStoryXPath, { timeout: 5000 });
      await page.fill(testCaseStoryXPath, "sample automation");
      console.log("Filled in Test Case Story.");
  
      // Click "Create Test Case" button
      const createTestCaseButtonXPath = "(//button[@id='create'])[1]";
      await page.waitForSelector(createTestCaseButtonXPath, { timeout: 5000 });
      await page.click(createTestCaseButtonXPath);
      console.log("Clicked on Create Test Case button.");
      console.log("Test case created successfully.");
      await page.waitForTimeout(2000);

      // Search for the created test case
      const testCasePageSearchXPath = "(//input[@id='qksearch'])[1]";
      await page.waitForSelector(testCasePageSearchXPath, { timeout: 5000 });
      console.log("Test case search input box found.");
      await page.waitForTimeout(2000);
      await page.fill(testCasePageSearchXPath, "sudheer automation case");
      console.log("Entered test case title for search.");
      await page.press(testCasePageSearchXPath, 'Enter');
      console.log("Pressed Enter to search for the test case.");
      await page.waitForTimeout(4000);
  
      // Verify if the test case is found
      const testCaseResultFoundXPath = "//h5[normalize-space()='sudheer automation case']";
      await page.waitForSelector(testCaseResultFoundXPath, { timeout: 5000 });
      console.log("Test case result found.");
      await page.waitForTimeout(2000);
      // Select the test case
      const checkBoxToSelectXPath = "(//input[@type='checkbox'])[2]";
      await page.waitForSelector(checkBoxToSelectXPath, { timeout: 5000 });
      await page.click(checkBoxToSelectXPath);
      console.log("Selected the test case.");
  
      // Click on the Delete button
      const deleteButtonXPath = "//div[@class='action-tool-card flex_grp_align_center']//button[2]";
      await page.waitForSelector(deleteButtonXPath, { timeout: 5000 });
      await page.click(deleteButtonXPath);
      console.log("Clicked on Delete button.");
      console.log("Test case deleted successfully.");

         // Click on the Delete button
         const deleteconfirmButtonXPath = jsondata.deleteconfirmButtonXPath;
         await page.waitForSelector(deleteconfirmButtonXPath, { timeout: 5000 });
         await page.click(deleteconfirmButtonXPath);
         console.log("Clicked on confirm Delete button.");
         console.log("Test case deleted successfully.");
         await page.goto(jsondata.URL);

    } catch (error) {
      console.error("Error during Add/Delete Test Case operation:", error);
      throw error;
    }
  }
  
  
//---------------------CASE 14 - send email by merging --------------------
public async mergeandSendreporttoEmail(page: Page) {
  try {
    // Quick search input box
    const quickSearchInputXPath = "//input[@id='qksearch' and @placeholder='Quick Search']";
    await page.waitForSelector(quickSearchInputXPath, { timeout: 5000 });
    console.log("Quick Search input box found.");
    
    // Enter the text and search
    const searchText = "HTTP MASTER CREATE PROJECT SAMPLE";
    await page.fill(quickSearchInputXPath, searchText);
    console.log(`Entered text: '${searchText}'`);
    await page.press(quickSearchInputXPath, 'Enter');
    console.log("Pressed Enter to initiate search.");
    await page.waitForTimeout(2000);

    // Check if the result is visible and click
    const projectSelector = jsondata.projectSelector;
    await page.waitForSelector(projectSelector, { timeout: 5000 });
    console.log("Search result found.");
    const resultText = await page.textContent(projectSelector);
    console.log(`Result Text: ${resultText}`);
    await page.click(jsondata.projectSelector);
    await page.waitForTimeout(5000);

    // Click the sidebar for reports
    const reportsSidebarXPath = jsondata.reportsSidebarXPath;
    await page.waitForSelector(reportsSidebarXPath, { timeout: 5000 });
    await page.click(reportsSidebarXPath);
    console.log("Clicked on the sidebar for reports.");

    // Click the sub-element for Executions
    const ReportsXpath = jsondata.ReportsXpath;
    await page.waitForSelector(ReportsXpath, { timeout: 5000 });
    await page.click(ReportsXpath);
    console.log("Clicked on Executions sub-element.");
    await page.waitForTimeout(3000);
    // Search for the report in the reports search box
    const reportsSearchBoxXPath = jsondata.reportsSearchBoxXPath;
    await page.waitForSelector(reportsSearchBoxXPath, { timeout: 5000 });
    const reportText = "sudheer Automation report push";
    await page.fill(reportsSearchBoxXPath, reportText);
    console.log(`Entered text in Reports Search Box: '${reportText}'`);
    await page.press(reportsSearchBoxXPath, 'Enter');
    console.log("Pressed Enter to search the report.");
    await page.waitForTimeout(2000);

    // Locate the report1 and click it
    const reportSelectorXPath = jsondata.reportSelectorXPath;
    await page.waitForSelector(reportSelectorXPath, { timeout: 5000 });
    console.log(`Report with text '${reportText}' found.`);
    await page.click(reportSelectorXPath);
    console.log("Clicked on the report.");
    await page.waitForTimeout(5000);

        // Locate the report2 and click it
        const reportSelectorXPath1 = jsondata.reportSelectorXPath1;
        await page.waitForSelector(reportSelectorXPath1, { timeout: 5000 });
        console.log(`Report with text '${reportText}' found.`);
        await page.click(reportSelectorXPath1);
        console.log("Clicked on the report.");
        await page.waitForTimeout(5000);

    // Click the icon
    const mergeandsend = jsondata.mergeandsend;
    await page.waitForSelector(mergeandsend, { timeout: 5000 });
    await page.click(mergeandsend);
    console.log("Clicked on the icon for the selected report.");
    await page.waitForTimeout(5000);

    // Additional checks and actions for popup
    const reportConfigPopupXPath = jsondata.Reportconfpopup;
    await page.waitForSelector(reportConfigPopupXPath, { timeout: 5000 });
    console.log("Report Configuration popup found.");
    await page.waitForTimeout(5000);

    //input text box
    const reportconftitle = jsondata.reportconftitle;
    await page.waitForSelector(reportconftitle, { timeout: 5000 });
    console.log("Email input box found.");
    const emailTexttitle = "sudheer automate report";
    await page.fill(reportconftitle, emailTexttitle);
    console.log(`Entered email: '${emailTexttitle}'`);
    await page.waitForTimeout(5000);


    //input email 
    const emailInputBoxXPath = jsondata.emailreportinputbox;
    await page.waitForSelector(emailInputBoxXPath, { timeout: 5000 });
    console.log("Email input box found.");
    const emailText = "saisudheer.ka@digitral.com";
    await page.fill(emailInputBoxXPath, emailText);
    console.log(`Entered email: '${emailText}'`);
    await page.waitForTimeout(5000);

    const emailSendButtonXPath = jsondata.emailsendinpopup;
    await page.waitForSelector(emailSendButtonXPath, { timeout: 5000 });
    await page.click(emailSendButtonXPath);
    console.log("Clicked the send button in the popup.");
    await page.goto(jsondata.URL);
    await page.waitForTimeout(5000);
  } catch (error) {
    console.error("Error during report search and email sending:", error);
    throw error;
  }
}


}
