import mouseHelper from '../configs/mouseHelper';
import puppeteer, {Browser, Page} from 'puppeteer';
import expectPuppeteer from 'expect-puppeteer';

describe('google registration', () => {
  const folder = 'screenshot';
  let browser: Browser;
  let page: Page;

  it('open register page', async ()=> {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await mouseHelper(page);
    await page.goto('https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp', {
      waitUntil: 'networkidle2',
    });
    await page.screenshot({path: `${folder}/step_0.png`});
  });

  it('fill data', async () => {
    const accountInfo = {
      lastName: 'CatheonLN',
      firstName: 'CatheonFN',
      userName: 'CatheonUN',
      password: 'CatheonPW!1',
    };
    await expectPuppeteer(page).toFill('#lastName', accountInfo.lastName);
    await expectPuppeteer(page).toFill('#firstName', accountInfo.firstName);
    await expectPuppeteer(page).toFill('#username', accountInfo.userName);
    await expectPuppeteer(page).toFill('input[name="Passwd"]', accountInfo.password);
    await expectPuppeteer(page).toFill('input[name="ConfirmPasswd"]', accountInfo.password);
    await expectPuppeteer(page).toClick('input[type="checkbox"]');
    await page.screenshot({path: `${folder}/step_1.png`});
  });

  it('submit form', async () => {
    
  });

  afterAll(async ()=>{
    await browser.close();
  });
});
