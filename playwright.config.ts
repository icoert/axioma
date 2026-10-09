import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
 testDir:'./tests/e2e', fullyParallel:true, forbidOnly:!!process.env.CI, retries:process.env.CI?2:0, workers:process.env.CI?2:3,
 reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure',screenshot:'only-on-failure'},
 projects:[{name:'desktop',use:{...devices['Desktop Chrome'],channel:process.env.PW_CHANNEL??'chromium'}},{name:'mobile',use:{...devices['Pixel 7'],defaultBrowserType:'chromium',channel:process.env.PW_CHANNEL??'chromium'}}],
 webServer:{command:'npm run dev -- --port 4173 --strictPort',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI,timeout:30000},
});
