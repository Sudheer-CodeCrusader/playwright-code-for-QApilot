// import  type { Page } from '@playwright/test';
import * as jsondata from "../../LoginData.json";
// import axios from 'axios';
export class LoginAndLogout {
  readonly page: any;
  constructor() {
    // this.page = "";

  }

  public async InValidPassword_Login(page: any) {
    // await page.goto(jsondata.URL);
    await page.fill(jsondata.usernamefield, jsondata.TenantUsername);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.fill(jsondata.PasswordField, jsondata.InvalidPassword);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.keyboard.press('Enter');
    const expectedErrorMessage = jsondata.LoginExpectedErrorMessage;
    const actualErrorMessage = await page.textContent(jsondata.LoginActualErrorMessage);
    // Assertion for login actual success message matches the expected success message
    if (actualErrorMessage === expectedErrorMessage) {
      console.log('In valid password validation passed');
    } else {
      console.error('Error: In valid password validation failed.');
    }
  }

  public async InvalidUsername_Login(page: any) {
    // await page.goto(jsondata.URL);
    await page.fill(jsondata.usernamefield, jsondata.InValidusername);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.fill(jsondata.PasswordField, jsondata.TenantPassword);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.keyboard.press('Enter');
    const expectedErrorMessage = jsondata.InvalidUsernameExpectedMessage;
    const actualErrorMessage = await page.textContent(jsondata.InvalidUsernameActualMessage);
    // Assertion for login actual success message matches the expected success message
    if (actualErrorMessage === expectedErrorMessage) {
      console.log('In valid Username validation passed');
    } else {
      console.error('Error: In valid Username validation failed.');
    }
  }
  public async Login(page: any) {
    // await page.goto(jsondata.URL);
    await page.fill(jsondata.usernamefield, jsondata.TenantUsername);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.fill(jsondata.PasswordField, jsondata.TenantPassword);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.keyboard.press('Enter');
  }
  public async accept_alertopup(page : any){
    await page.waitForTimeout(2000);
    const Alert_PopupAccept = jsondata.AlertPopupAccept;
    const AlertPopupAccept = await page.waitForSelector('xpath=' + Alert_PopupAccept);
    await AlertPopupAccept.click();
  }
  public async Tenant_Logout(page: any){
    await page.waitForTimeout(2000);
    const Profile_Icon = jsondata.ProfileIcon;
    const ProfileIcon = await page.waitForSelector('xpath=' + Profile_Icon);
    await ProfileIcon.click();
    await page.waitForTimeout(1000);
    const Tenant_LogOut_Profile = jsondata.TenantLogOut;
    const TenantLogOut = await page.waitForSelector('xpath=' + Tenant_LogOut_Profile);
    await TenantLogOut.click();
  
  }
}