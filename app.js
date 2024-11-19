import 'dotenv/config'
import puppeteer from "puppeteer";
import getSevenPayId from './helpers/readtxt.js'; 
import checkStatus from "./helpers/checkStatus.js";
import credentials from "./helpers/credentials.js";
import statusColor from "./helpers/statusColor.js";
import promptSync from 'prompt-sync';
const prompt = promptSync();


const browser = await puppeteer.launch({
  "args": ["--fast-start", "--disable-extensions", "--no-sandbox"],
  "ignoreHTTPSErrors": true,
  "headless": false,
  defaultViewport: null,
});

const page = await browser.newPage();

const autoSendSale = async (page, browser) => {

  console.log(`\nStarting application ...`)
  await page.goto(`${credentials.prod.url}login/auth`, {
      waitUntil: "domcontentloaded",
  })

  console.log(`Authenticating User...`)

  const isLoggedIn = await page.$('[name="j_username"]');

  if(isLoggedIn){
    await page.type('[name="j_username"]', credentials.prod.username)
    await page.type('[name="j_password"]', credentials.prod.password)
    await page.click('[type="submit"]')
  } else {
    console.log("User Already Logged in")
  }
  
  console.log(`${statusColor.yellow}[PAYCONNECT DASHBOARD]${statusColor.white}`)
  await page.goto(`${credentials.prod.url}`, {
      waitUntil: "domcontentloaded"
  })

    try {
      const references = await getSevenPayId(); 
      
      for (let i = 0; i < references.length; i++) {
      console.log(`\nSearching transaction reference: ${references[i]}`)

          await new Promise(r => setTimeout(r, 2000))
          await page.click('[id="clearDateCreatedFrom"]')   

          await page.type('[id="sevenPayID"]', references[i])
          await page.click('[value="Search"]')
          await new Promise(r => setTimeout(r, 750))

          const sevenPayID = await page.$('.list table tbody tr td > a');

          if(sevenPayID){
            console.log(`Transaction reference ${statusColor.green}${references[i]}${statusColor.white} found`)

            await page.keyboard.down('Control');
            await sevenPayID.click(); 
            await page.keyboard.up('Control');

            await new Promise(r => setTimeout(r, 200))
            await page.evaluate(() => {
              const clearPayId = document.getElementById('sevenPayID');
              clearPayId.value = '';
            });
          } else {
            console.log('Transaction not found!');
            await page.goto(credentials.prod.url, { waitUntil: "domcontentloaded"})
          }
      }

    console.log('[1] Restart Application \n[2] Check Transaction Status\n[Any] End Session')
    let selector = prompt('Select: ');
    if(selector == 1){
      autoSendSale(page, browser);
    } else if(selector == 2){
      checkStatus(page, browser)
    } else {
      await browser.close();
    }

    // selector == 1 ? checkStatus(page, browser) : await browser.close();

    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

autoSendSale(page, browser);