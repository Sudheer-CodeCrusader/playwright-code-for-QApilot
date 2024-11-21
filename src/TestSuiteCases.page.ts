// import  type { Page } from '@playwright/test';
// import { test, expect } from '@playwright/test';
import fs from "fs";
import * as CloudData from "../../CloudAndroidData.json";
import * as CloudData1 from "../../CloudiOSData.json";
import * as TestSuiteData from "../../TestSuiteData.json";
import BaseClassPage from "./BaseClassPage";

// import axios from 'axios';
export class TestSuite {
  readonly page: any;
  constructor() {
    // this.page = "";

  }

  public async Exeisting_Project_Search_Adroid(page: any) {
    await page.waitForTimeout(2000);
    await page.fill(CloudData.ProjectSearchField, CloudData.ProjectName);
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    const ClickOn_ProjectName = CloudData.ClickOnProjectName;
    const ClickOnProjectName = await page.waitForSelector('xpath=' + ClickOn_ProjectName);
    await ClickOnProjectName.click();
  }
  public async Exeisting_Project_Search_iOS(page: any) {
    await page.waitForTimeout(2000);
    await page.fill(CloudData1.ProjectSearchField, CloudData1.ProjectName);
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    const ClickOn_ProjectName = CloudData.ClickOnProjectName;
    const ClickOnProjectName = await page.waitForSelector('xpath=' + ClickOn_ProjectName);
    await ClickOnProjectName.click();
  }
  public async TestCases_TO_TestSuite(page: any) {
    await page.waitForTimeout(2000);
    const Configuration_Icon = CloudData.ConfigurationIcon;
    const ConfigurationIcon = await page.waitForSelector('xpath=' + Configuration_Icon);
    await ConfigurationIcon.click();
    await page.waitForTimeout(2000);
    const TestSuite_Option = TestSuiteData.TestSuiteOption;
    const TestSuiteOption = await page.waitForSelector('xpath=' + TestSuite_Option);
    await TestSuiteOption.click();
    await page.waitForTimeout(2000);
    await page.fill(TestSuiteData.SearchField, TestSuiteData.SearchText);
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    const TestSuite_Selection = TestSuiteData.TestSuiteSelection;
    const TestSuiteSelection = await page.waitForSelector('xpath=' + TestSuite_Selection);
    await TestSuiteSelection.click();
    await page.waitForTimeout(2000);
    const ImprotTestCase_Option = TestSuiteData.ImprotTestCaseOption;
    const ImprotTestCaseOption = await page.waitForSelector('xpath=' + ImprotTestCase_Option);
    await ImprotTestCaseOption.click();
    await page.waitForTimeout(2000);
    const CheckBox_1 = TestSuiteData.CheckBox1;
    const CheckBox1 = await page.waitForSelector('xpath=' + CheckBox_1);
    await CheckBox1.click();
    await page.waitForTimeout(2000);
    const CheckBox_2 = TestSuiteData.CheckBox2;
    const CheckBox2 = await page.waitForSelector('xpath=' + CheckBox_2);
    await CheckBox2.click();
    await page.waitForTimeout(2000);
    const MoveToTestSuite_Button = TestSuiteData.MoveToTestSuiteButton;
    const MoveToTestSuiteButton = await page.waitForSelector('xpath=' + MoveToTestSuite_Button);
    await MoveToTestSuiteButton.click();
    await page.waitForTimeout(2000);
    const Yes_Button = TestSuiteData.YesButton;
    const YesButton = await page.waitForSelector('xpath=' + Yes_Button);
    await YesButton.click();
    await page.waitForTimeout(2000);
    const Close_Icon = TestSuiteData.CloseIcon;
    const CloseIcon = await page.waitForSelector('xpath=' + Close_Icon);
    await CloseIcon.click();
    await page.waitForTimeout(2000);
    const BackTo_TestSuite = TestSuiteData.BackToTestSuite;
    const BackToTestSuite = await page.waitForSelector('xpath=' + BackTo_TestSuite);
    await BackToTestSuite.click();

  }
  public async Create_TestPlan_From_TestSuite(page: any) {
    await page.waitForTimeout(2000);
    const Configuration_Icon = CloudData.ConfigurationIcon;
    const ConfigurationIcon = await page.waitForSelector('xpath=' + Configuration_Icon);
    await ConfigurationIcon.click();
    await page.waitForTimeout(2000);
    const TestSuite_Option = TestSuiteData.TestSuiteOption;
    const TestSuiteOption = await page.waitForSelector('xpath=' + TestSuite_Option);
    await TestSuiteOption.click();
    await page.waitForTimeout(2000);
    const TestSuite_ExecuteButton = TestSuiteData.TestSuiteExecuteButton;
    const TestSuiteExecuteButton = await page.waitForSelector('xpath=' + TestSuite_ExecuteButton);
    await TestSuiteExecuteButton.click();
    await page.waitForTimeout(2000);
    const ConfirmTest_Suite = TestSuiteData.ConfirmTestSuite;
    const ConfirmTestSuite = await page.waitForSelector('xpath=' + ConfirmTest_Suite);
    await ConfirmTestSuite.click();

  }
  public async TestPlan_Creation_For_TestSuite_Android(page: any) {
    await page.waitForTimeout(2000);
    const randomText = await BaseClassPage.generateRandomText(3);
    await page.fill(TestSuiteData.TestPlanTitleField, (TestSuiteData.TestPlanTitle) + (randomText));
    await page.waitForTimeout(2000);
    const NextButton_1 = TestSuiteData.NextButton1;
    const NextButton1 = await page.waitForSelector('xpath=' + NextButton_1);
    await NextButton1.click();
    await page.waitForTimeout(2000);
    const Browser_StackOption = TestSuiteData.BrowserStackOption;
    const BrowserStackOption = await page.waitForSelector('xpath=' + Browser_StackOption);
    await BrowserStackOption.click();
    await page.waitForTimeout(2000);
    const Device_Selection = TestSuiteData.DeviceSelection;
    const SelectDevice_Dropdown_Field = await page.waitForSelector('xpath=' + Device_Selection);
    await SelectDevice_Dropdown_Field.click();
    await page.waitForTimeout(2000);
    await page.keyboard.press('ArrowDown');
    // Simulate pressing Enter key again
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    const Version_Selection_DropdownField = CloudData.VersionSelectionDropdownField;
    const Version_Selection_Dropdown_Field = await page.waitForSelector('xpath=' + Version_Selection_DropdownField);
    await Version_Selection_Dropdown_Field.click();
    await page.waitForTimeout(1000);
    const v1Locator = page.locator(CloudData.Version1);
    const v2Locator = page.locator(CloudData.Version2);
    // Check if v1.22.3 is available (e.g., by checking visibility or existence)
    if (await v1Locator.isVisible()) {
      // If v1.22.3 is visible, click it
      await v1Locator.click();
    } else {
      // Else click v2.2.1
      await v2Locator.click();
    }
    await page.waitForTimeout(2000);
    const TestData_Field = TestSuiteData.TestDataField;
    const TestDataField = await page.waitForSelector('xpath=' + TestData_Field);
    await TestDataField.click();
    await page.waitForTimeout(2000);
    const TestData_Selection = TestSuiteData.TestDataSelection;
    const TestDataSelection = await page.waitForSelector('xpath=' + TestData_Selection);
    await TestDataSelection.click();
    await page.waitForTimeout(2000);
    const Appsource_Field = TestSuiteData.AppsourceField;
    const AppsourceField = await page.waitForSelector('xpath=' + Appsource_Field);
    await AppsourceField.click();
    await page.waitForTimeout(2000);
    const SelectApp_Source = TestSuiteData.SelectAppSource;
    const SelectAppSource = await page.waitForSelector('xpath=' + SelectApp_Source);
    await SelectAppSource.click();
    await page.waitForTimeout(2000);
    const NextButton_2 = TestSuiteData.NextButton1;
    const NextButton2 = await page.waitForSelector('xpath=' + NextButton_2);
    await NextButton2.click();
    await page.waitForTimeout(2000);
    const Save_Button = TestSuiteData.SaveButton;
    const SaveButton = await page.waitForSelector('xpath=' + Save_Button);
    await SaveButton.click();
    await page.waitForTimeout(2000);
    const Execute_Button = TestSuiteData.ExecuteButton;
    const ExecuteButton = await page.waitForSelector('xpath=' + Execute_Button);
    await ExecuteButton.click();
    await page.waitForTimeout(2000);
    const Yes_Button = TestSuiteData.YesButton;
    const YesButton = await page.waitForSelector('xpath=' + Yes_Button);
    await YesButton.click();
    await page.waitForTimeout(150000);

  }
  //iOS Cases
  public async Import_TestCases_To_TestSuite_iOS(page: any) {
    await page.waitForTimeout(2000);
    const Configuration_Icon = CloudData.ConfigurationIcon;
    const ConfigurationIcon = await page.waitForSelector('xpath=' + Configuration_Icon);
    await ConfigurationIcon.click();
    await page.waitForTimeout(2000);
    const TestSuite_Option = TestSuiteData.TestSuiteOption;
    const TestSuiteOption = await page.waitForSelector('xpath=' + TestSuite_Option);
    await TestSuiteOption.click();
    await page.waitForTimeout(2000);
    await page.fill(TestSuiteData.SearchField, TestSuiteData.iOSSearchText);
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    const iOS_TestSuiteName = TestSuiteData.iOSTestSuiteName;
    const iOS_TestSuite_Name = await page.waitForSelector('xpath=' + iOS_TestSuiteName);
    await iOS_TestSuite_Name.click();
    await page.waitForTimeout(2000);
    const ImprotTestCase_Option = TestSuiteData.ImprotTestCaseOption;
    const ImprotTestCaseOption = await page.waitForSelector('xpath=' + ImprotTestCase_Option);
    await ImprotTestCaseOption.click();
    await page.waitForTimeout(2000);
    const CheckBox_1 = TestSuiteData.CheckBox1;
    const CheckBox1 = await page.waitForSelector('xpath=' + CheckBox_1);
    await CheckBox1.click();
    await page.waitForTimeout(2000);
    const CheckBox_2 = TestSuiteData.CheckBox2;
    const CheckBox2 = await page.waitForSelector('xpath=' + CheckBox_2);
    await CheckBox2.click();
    await page.waitForTimeout(2000);
    const MoveToTestSuite_Button = TestSuiteData.MoveToTestSuiteButton;
    const MoveToTestSuiteButton = await page.waitForSelector('xpath=' + MoveToTestSuite_Button);
    await MoveToTestSuiteButton.click();
    await page.waitForTimeout(2000);
    const ConfirmTest_Suite = TestSuiteData.ConfirmTestSuite;
    const ConfirmTestSuite = await page.waitForSelector('xpath=' + ConfirmTest_Suite);
    await ConfirmTestSuite.click();
    await page.waitForTimeout(2000);
    const Close_Icon = TestSuiteData.CloseIcon;
    const CloseIcon = await page.waitForSelector('xpath=' + Close_Icon);
    await CloseIcon.click();
    await page.waitForTimeout(2000);
    const BackTo_TestSuite = TestSuiteData.BackToTestSuite;
    const BackToTestSuite = await page.waitForSelector('xpath=' + BackTo_TestSuite);
    await BackToTestSuite.click();
  }
  public async Create_TestPlan_For_TestSuite_iOS(page: any){
    await page.waitForTimeout(2000);
    const TestSuite_ExecuteButton = TestSuiteData.TestSuiteExecuteButton;
    const TestSuiteExecuteButton = await page.waitForSelector('xpath=' + TestSuite_ExecuteButton);
    await TestSuiteExecuteButton.click();
    await page.waitForTimeout(2000);
    const ConfirmTest_Suite = TestSuiteData.ConfirmTestSuite;
    const ConfirmTestSuite = await page.waitForSelector('xpath=' + ConfirmTest_Suite);
    await ConfirmTestSuite.click();
    await page.waitForTimeout(2000);
    const randomText = await BaseClassPage.generateRandomText(3);
    await page.fill(TestSuiteData.TestPlanTitleField, (TestSuiteData.TestPlanTitle) + (randomText));
    await page.waitForTimeout(2000);
    const NextButton_1 = TestSuiteData.NextButton1;
    const NextButton1 = await page.waitForSelector('xpath=' + NextButton_1);
    await NextButton1.click();
    await page.waitForTimeout(2000);
    const Browser_StackOption = TestSuiteData.BrowserStackOption;
    const BrowserStackOption = await page.waitForSelector('xpath=' + Browser_StackOption);
    await BrowserStackOption.click();
    const iOS_DeviceSelection = TestSuiteData.iOSDeviceSelection;
    const SelectDevice_Dropdown_Field = await page.waitForSelector('xpath=' + iOS_DeviceSelection);
    await SelectDevice_Dropdown_Field.click();
    await page.waitForTimeout(2000);
    await page.keyboard.press('ArrowDown');
    // Simulate pressing Enter key again
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    const Version_Selection_DropdownField = CloudData.VersionSelectionDropdownField;
    const Version_Selection_Dropdown_Field = await page.waitForSelector('xpath=' + Version_Selection_DropdownField);
    await Version_Selection_Dropdown_Field.click();
    await page.waitForTimeout(1000);
    const v1Locator = page.locator(CloudData.Version1);
    const v2Locator = page.locator(CloudData.Version2);
    // Check if v1.22.3 is available (e.g., by checking visibility or existence)
    if (await v1Locator.isVisible()) {
      // If v1.22.3 is visible, click it
      await v1Locator.click();
    } else {
      // Else click v2.2.1
      await v2Locator.click();
    }
    await page.waitForTimeout(2000);
    const TestData_Field = TestSuiteData.TestDataField;
    const TestDataField = await page.waitForSelector('xpath=' + TestData_Field);
    await TestDataField.click();
    await page.waitForTimeout(2000);
    const TestData_Selection = TestSuiteData.TestDataSelection;
    const TestDataSelection = await page.waitForSelector('xpath=' + TestData_Selection);
    await TestDataSelection.click();
    await page.waitForTimeout(2000);
    const Appsource_Field = TestSuiteData.AppsourceField;
    const AppsourceField = await page.waitForSelector('xpath=' + Appsource_Field);
    await AppsourceField.click();
    await page.waitForTimeout(2000);
    const iOS_AppSourceSelection = TestSuiteData.iOSAppSourceSelection;
    const iOSAppSourceSelection = await page.waitForSelector('xpath=' + iOS_AppSourceSelection);
    await iOSAppSourceSelection.click();
    await page.waitForTimeout(2000);
    const NextButton_2 = TestSuiteData.NextButton1;
    const NextButton2 = await page.waitForSelector('xpath=' + NextButton_2);
    await NextButton2.click();
  }

  public async Execute_iOS_TestPlan(page: any){
    await page.waitForTimeout(2000);
    const Save_Button = TestSuiteData.SaveButton;
    const SaveButton = await page.waitForSelector('xpath=' + Save_Button);
    await SaveButton.click();
    await page.waitForTimeout(2000);
    const Execute_Button = TestSuiteData.ExecuteButton;
    const ExecuteButton = await page.waitForSelector('xpath=' + Execute_Button);
    await ExecuteButton.click();
    await page.waitForTimeout(2000);
    const Yes_Button = TestSuiteData.YesButton;
    const YesButton = await page.waitForSelector('xpath=' + Yes_Button);
    await YesButton.click();
    await page.waitForTimeout(150000);
  }



}
