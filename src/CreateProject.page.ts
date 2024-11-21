// import  type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import fs from "fs";
import * as Project from "../../ProjectCreationData.json";
import BaseClassPage from "./BaseClassPage";

// import axios from 'axios';
export class CreateProject {
  readonly page: any;
  constructor() {
    // this.page = "";

  }

  public async Create_Project_And_Assign_Team(page: any) {
    let projectData=Project;
    await page.waitForTimeout(2000);
    // await page.fill(CloudData.ProjectSearchField, CloudData.ProjectName);
    const Project_Creation_Button = Project.ProjectCreationButton;
    const Project_CreationButton = await page.waitForSelector('xpath=' + Project_Creation_Button);
    await Project_CreationButton.click();
    const randomText = await BaseClassPage.generateRandomText(3);
    projectData.ProjectName = "AUTOMATION" + randomText;
    await page.fill(projectData.ProjectTitleField, projectData.ProjectName);
    fs.writeFile('ProjectCreationData.json', JSON.stringify(projectData, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        console.log("Data Inserted");
      }
    });
    await page.waitForTimeout(2000);
    const SelectApp_FameworkField = Project.SelectAppFameworkField;
    const SelectAppFameworkField = await page.waitForSelector('xpath=' + SelectApp_FameworkField);
    await SelectAppFameworkField.click();
    await page.waitForTimeout(2000);
    await page.keyboard.press('ArrowDown');
    // Simulate pressing Enter key again
    await page.keyboard.press('Enter');
    // const Framework_Selection = Project.FrameworkSelection;
    // const FrameworkSelection = await page.waitForSelector('xpath=' + Framework_Selection);
    // await FrameworkSelection.click();
    await page.waitForTimeout(2000);
    await page.fill(Project.DescriptionField , Project.Description);
    await page.waitForTimeout(2000);
    const Select_TeamField = Project.SelectTeamField;
    const SelectTeamField = await page.waitForSelector('xpath=' + Select_TeamField);
    await SelectTeamField.click();
    await page.waitForTimeout(2000);
    const Select_Team = Project.SelectTeam;
    const SelectTeam = await page.waitForSelector('xpath=' + Select_Team);
    await SelectTeam.click();
    await page.waitForTimeout(2000);
    const Create_Button = Project.CreateButton;
    const CreateButton = await page.waitForSelector('xpath=' + Create_Button);
    await CreateButton.click();
    // const successMessage = await page.locator('#success-message');

    // // Assertion: Ensure the success message is visible
    // const isSuccessMessageVisible = await successMessage.isVisible();
    // expect(isSuccessMessageVisible).toBeTruthy();
    
  }
  public async Update_Created_Project(page:any){
    await page.waitForTimeout(2000);
    await page.fill(Project.ProjectSearchField, Project.ProjectName);
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    const ClickOnMenu_Option = Project.ClickOnMenuOption;
    const ClickOnMenuOption = await page.waitForSelector('xpath=' + ClickOnMenu_Option);
    await ClickOnMenuOption.click();
    await page.waitForTimeout(2000);
    const SelectEdit_Option = Project.SelectEditOption;
    const SelectEditOption = await page.waitForSelector('xpath=' + SelectEdit_Option);
    await SelectEditOption.click();
    await page.waitForTimeout(2000);
    await page.fill(Project.ProjectTitleField, Project.UpdateProjectName);
    await page.waitForTimeout(2000);
    const UpdateProject_Button = Project.UpdateProjectButton;
    const UpdateProjectButton = await page.waitForSelector('xpath=' + UpdateProject_Button);
    await SelectEditOption.click();

  }

}
