// import  type { Page } from '@playwright/test';
import * as CloudData from "../../CloudAndroidData.json";
// import axios from 'axios';
export class CloudAndroid {
  readonly page: any;
  constructor() {
    // this.page = "";

  }

  public async Exeisting_Project_Search_Functionality(page: any) {
    await page.waitForTimeout(2000);
    await page.fill(CloudData.ProjectSearchField, CloudData.ProjectName);
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);

    // await new Promise(resolve => setTimeout(resolve, 2000));
    // const ClickOnProject_Name = CloudData.ClickOnProjectName;
    // const Click_Project_Name = await page.waitForSelector('xpath=' + ClickOnProject_Name);
    // await Click_Project_Name.click();
    await page.waitForTimeout(2000);
    const ClickOn_ProjectName = CloudData.ClickOnProjectName;
    const ClickOnProjectName = await page.waitForSelector('xpath=' + ClickOn_ProjectName);
    await ClickOnProjectName.click();
  }
  public async Choose_your_Connection_Configuration(page: any) {
    // await page.waitForNavigation({ waitUntil: 'load' });
    await page.waitForTimeout(2000);
    const Configuration_Icon = CloudData.ConfigurationIcon;
    const ConfigurationIcon = await page.waitForSelector('xpath=' + Configuration_Icon);
    await ConfigurationIcon.click();
    await page.waitForTimeout(1000);
    const Recording_Option_Selection = CloudData.RecordingOptionSelection;
    const RecordingOption_Selection = await page.waitForSelector('xpath=' + Recording_Option_Selection);
    await RecordingOption_Selection.click();
    await page.waitForTimeout(1000);
    const CloudDevice_Option_Selection = CloudData.CloudDeviceOptionSelection;
    const CloudDeviceOption_Selection = await page.waitForSelector('xpath=' + CloudDevice_Option_Selection);
    await CloudDeviceOption_Selection.click();
    await page.waitForTimeout(1000);
    const AndroidDevice_Selection = CloudData.AndroidDeviceSelection;
    const Android_Device_Selection = await page.waitForSelector('xpath=' + AndroidDevice_Selection);
    await Android_Device_Selection.click();
    await page.waitForTimeout(1000);
    const BrowserStack_Option_Selection = CloudData.BrowserStackOptionSelection;
    const BrowserStackOption_Selection = await page.waitForSelector('xpath=' + BrowserStack_Option_Selection);
    await BrowserStackOption_Selection.click();
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
    // await page.keyboard.press('Tab');
    // // Simulate pressing Enter key
    // await page.keyboard.press('Enter');
    // Simulate pressing Down Arrow key
    const Select_Device_Dropdown_Field = CloudData.SelectDeviceDropdownField;
    const SelectDevice_Dropdown_Field = await page.waitForSelector('xpath=' + Select_Device_Dropdown_Field);
    await SelectDevice_Dropdown_Field.click();
    await page.waitForTimeout(2000);
    await page.keyboard.press('ArrowDown');
    // Simulate pressing Enter key again
    await page.keyboard.press('Enter');
    // await page.waitForTimeout(1000);
    // const Device_Selection = CloudData.DeviceSelection;
    // const DeviceSelection = await page.waitForSelector('xpath=' + Device_Selection);
    // await DeviceSelection.click();
    await page.waitForTimeout(1000);
    const Next_Button = CloudData.NextButton;
    const NextButton = await page.waitForSelector('xpath=' + Next_Button);
    await NextButton.click();
  }

  public async SelectApp_TestCase(page: any) {
    await page.waitForTimeout(1000);
    const SelectApp_Field = CloudData.SelectAppField;
    const SelectAppField = await page.waitForSelector('xpath=' + SelectApp_Field);
    await SelectAppField.click();
    await page.waitForTimeout(1000);
    const App_Selection = CloudData.AppSelection;
    const AppSelection = await page.waitForSelector('xpath=' + App_Selection);
    await AppSelection.click();
    await page.waitForTimeout(1000);
    const SelectModule_Field = CloudData.SelectModuleField;
    const SelectModuleField = await page.waitForSelector('xpath=' + SelectModule_Field);
    await SelectModuleField.click();
    await page.waitForTimeout(1000);
    const Module_Selection = CloudData.ModuleSelection;
    const ModuleSelection = await page.waitForSelector('xpath=' + Module_Selection);
    await ModuleSelection.click();
    await page.waitForTimeout(1000);
    const SelectTestCase_Field = CloudData.SelectTestCaseField;
    const SelectTestCaseField = await page.waitForSelector('xpath=' + SelectTestCase_Field);
    await SelectTestCaseField.click();
    await page.waitForTimeout(1000);
    const TestCase_Selection = CloudData.TestCaseSelection;
    const TestCaseSelection = await page.waitForSelector('xpath=' + TestCase_Selection);
    await TestCaseSelection.click();
    await page.waitForTimeout(1000);
    const Select_PageField = CloudData.SelectPageField;
    const SelectPageField = await page.waitForSelector('xpath=' + Select_PageField);
    await SelectPageField.click();
    await page.waitForTimeout(1000);
    const Page_Selection = CloudData.PageSelection;
    const PageSelection = await page.waitForSelector('xpath=' + Page_Selection);
    await PageSelection.click();
    await page.waitForTimeout(1000);
    const Launch_Button = CloudData.LaunchButton;
    const LaunchButton = await page.waitForSelector('xpath=' + Launch_Button);
    await LaunchButton.click();
    await page.waitForTimeout(60000);
  }
  public async Testcase_Recording_Functionality(page : any){
    await page.waitForTimeout(2000);
    const Retry_Button = CloudData.RetryButton;
    const RetryButton = await page.waitForSelector('xpath=' + Retry_Button);
    await RetryButton.click();
    await page.waitForTimeout(2000);
    const Element_Selection = CloudData.ElementSelection;
    const ElementSelection = await page.waitForSelector('xpath=' + Element_Selection);
    await ElementSelection.click();
    await page.waitForTimeout(2000);
    const ClickElement_Option = CloudData.ClickElementOption;
    const ClickElementOption = await page.waitForSelector('xpath=' + ClickElement_Option);
    await ClickElementOption.click();
    await page.waitForTimeout(2000);
    const CreateStep_Button = CloudData.CreateStepButton;
    const CreateStepButton = await page.waitForSelector('xpath=' + CreateStep_Button);
    await CreateStepButton.click();
    await page.waitForTimeout(5000);
    const Recording_StopButton = CloudData.RecordingStopButton;
    const RecordingStopButton = await page.waitForSelector('xpath=' + Recording_StopButton);
    await RecordingStopButton.click();
    await page.waitForTimeout(2000);
    const Yes_Button = CloudData.YesButton;
    const YesButton = await page.waitForSelector('xpath=' + Yes_Button);
    await YesButton.click();

  }

}
