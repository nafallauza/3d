const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {})});
try {
for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:375,height:812}]]) {
 const context=await browser.newContext({viewport,isMobile:name==='mobile',hasTouch:name==='mobile'});
 const page=await context.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 page.setDefaultTimeout(90000);
 await page.goto(process.env.BASE_URL || 'http://127.0.0.1:5174/',{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>document.querySelector('[modal-menu-open]')?.getAttribute('role')==='button',{},{timeout:90000});
 await page.locator('[cookies] a').last().click();
 console.log(name,'ready');
 const menu=page.locator('[modal-menu-open]');const menuPanel=page.locator('[modal-menu="menu"]');
 await menu.focus();await page.keyboard.press('Enter');
 await page.waitForTimeout(1800);
 assert.equal(await menuPanel.isVisible(),true,'menu open');
 assert.equal(await menuPanel.evaluate(e=>e.contains(document.activeElement)),true,'menu focus');
 await page.keyboard.press('Escape');await menuPanel.waitFor({state:'hidden'});
 assert.equal(await menuPanel.isVisible(),false,'menu close');
 assert.equal(await menu.evaluate(e=>e===document.activeElement),true,'menu restore focus');
 console.log(name,'menu keyboard and focus PASS');
 await menu.click();await page.waitForTimeout(1800);
 const blog=menuPanel.locator('a[href="#blog"]').first();await blog.click();await menuPanel.waitFor({state:'hidden'});
 assert.equal(await menuPanel.isVisible(),false,'blog closes menu');
 console.log(name,'blog navigation PASS');
 await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(1000);
 if(name==='mobile') { await menu.click();await menuPanel.waitFor({state:'visible'});await page.waitForTimeout(1800); }
 const cta=page.locator(name==='mobile' ? '[modal-menu="menu"] [modal-cta-open]:visible' : '.header [modal-cta-open]:visible').first();await cta.click();await page.waitForTimeout(1500);
 const ctaPanel=page.locator('[modal-cta="cta"]');
 assert.equal(await ctaPanel.isVisible(),true,'cta open');
 assert.equal(await ctaPanel.evaluate(e=>e.contains(document.activeElement)),true,'cta focus');
 await page.keyboard.press('Shift+Tab');assert.equal(await ctaPanel.evaluate(e=>e.contains(document.activeElement)),true,'cta focus trap');
 await page.keyboard.press('Escape');await ctaPanel.waitFor({state:'hidden'});
 assert.equal(await ctaPanel.isVisible(),false,'cta close');
 assert.equal(await page.evaluate(()=>document.activeElement!==document.body),true,'cta focus restore');
 console.log(name,'consultation modal PASS');
 await page.locator('#location').scrollIntoViewIfNeeded();await page.waitForTimeout(800);
 for(let i=1;i<=4;i++) { const spot=page.locator(`[data-hotspot="${i}"]`); if(name==='mobile')await spot.tap();else await spot.click();assert.equal(await page.locator(`#identity-panel-${i}`).isVisible(),true);}
 await page.locator('#identity-control-4').click();assert.equal(await page.locator('#identity-panel-4').isVisible(),false);
 await page.locator('#identity-control-1').focus();await page.keyboard.press('End');assert.equal(await page.locator('#identity-control-4').evaluate(e=>e===document.activeElement),true);
 await page.keyboard.press('Home');await page.keyboard.press('Enter');assert.equal(await page.locator('#identity-panel-1').isVisible(),true);
 await page.locator('#location').screenshot({path:new URL(`./${name}-identity.png`,import.meta.url).pathname});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'overflow');
 console.log(name,'identity hotspot accordion layout PASS');
 const slider=page.locator('[data-line-animation] [data-active]');await slider.scrollIntoViewIfNeeded();await slider.focus();await page.keyboard.press('End');await page.waitForTimeout(1000);assert.equal(await slider.getAttribute('aria-valuenow'),'100');
 await page.keyboard.press('Home');await page.waitForTimeout(1000);assert.equal(await slider.getAttribute('aria-valuenow'),'0');
 const target=await page.locator('[data-line-animation] [data-end]').boundingBox();const start=await slider.boundingBox();
 if(name==='mobile') {
  const session=await context.newCDPSession(page);
  await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:start.x+start.width/2,y:start.y+start.height/2}]});
  await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:target.x+target.width/2,y:target.y+target.height/2}]});
  await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 } else {await page.mouse.move(start.x+start.width/2,start.y+start.height/2);await page.mouse.down();await page.mouse.move(target.x+target.width/2,target.y+target.height/2,{steps:8});await page.mouse.up();}
 await page.waitForTimeout(1000);assert.equal(await slider.getAttribute('aria-valuenow'),'100','scaled drag');
 console.log(name,'slider keyboard and drag PASS');
 await page.locator('[data-glb-stage]').scrollIntoViewIfNeeded();
 if(name==='mobile') {const box=await page.locator('[data-glb-stage]').boundingBox(); const session=await context.newCDPSession(page);await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x+box.width*.4,y:box.y+box.height*.5}]});await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:box.x+box.width*.6,y:box.y+box.height*.5}]});await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
 assert.deepEqual(errors,[],'browser runtime errors');
 console.log(name,'model touch / runtime PASS');
 if(name==='mobile') { await page.setViewportSize({width:812,height:375});await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(1200);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'landscape overflow');console.log('mobile landscape and reduced motion layout PASS'); }
 await context.close();
}
}finally{await browser.close();}
