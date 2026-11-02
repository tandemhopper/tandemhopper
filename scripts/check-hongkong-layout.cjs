const fs = require('node:fs')
const {chromium} = require('playwright')

async function main(){
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
 const widths=[320,360,390,768,1024,1440]
 const routes=['/laender/hongkong','/laender/macau','/laender']
 const result=[]
 const errors=[]
 fs.mkdirSync('test-results/layout',{recursive:true})
 for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1})
  page.on('pageerror',error=>errors.push({width,error:error.message}))
  for(const route of routes){
   try{
    const response=await page.goto('http://127.0.0.1:3000'+route,{waitUntil:'domcontentloaded',timeout:30000})
    await page.waitForTimeout(700)
    const data=await page.evaluate(()=>{
      const els=[...document.querySelectorAll('h1,h2,h3')]
      const overflow=document.documentElement.scrollWidth-window.innerWidth
      const clipped=els.filter(e=>e.scrollWidth>e.clientWidth+4).map(e=>e.textContent?.trim().slice(0,45))
      const sel=location.pathname==='/laender/hongkong'?['.th-breadcrumb','.th-hero','.th-facts','.th-intro','.th-critical','.th-content-layout','.th-endbar']:location.pathname==='/laender/macau'?['.th-breadcrumb','.th-hero','.th-facts','.th-intro','.th-critical','.th-content-layout']:['.th-countries-head','.th-continent']
      const edges=sel.flatMap(k=>{const e=document.querySelector(k);if(!e)return[];const r=e.getBoundingClientRect();return[{selector:k,left:Math.round(r.left),right:Math.round(r.right)}]})
      const missingImgs=[...document.querySelectorAll('img')].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.getAttribute('src'))
      return {overflow,clipped,edges,missingImgs,sectionCount:document.querySelectorAll('.hk-chapter').length,photos:document.querySelectorAll('.hk-country img').length}
    })
    result.push({width,route,status:response?.status(),...data})
    if(data.overflow>1)errors.push({width,route,error:'Horizontal overflow '+data.overflow})
    if(data.clipped.length)errors.push({width,route,error:'Clipped headings: '+data.clipped.join(', ')})
    if(data.missingImgs.length)errors.push({width,route,error:'Missing images: '+data.missingImgs.join(', ')})
    if(route==='/laender/hongkong'&&(data.sectionCount!==7||data.photos<12))errors.push({width,route,error:'Missing chapters/photos'})
    if(route==='/laender/hongkong'&&(width===390||width===1440)){
      await page.screenshot({path:'test-results/layout/hongkong-'+width+'.png',fullPage:true})
      await page.locator('#saison').screenshot({path:'test-results/layout/hongkong-season-'+width+'.png'})
      await page.locator('#grounds').screenshot({path:'test-results/layout/hongkong-grounds-'+width+'.png'})
    }
   }catch(error){errors.push({width,route,error:String(error)})}
  }
  await page.close()
 }
 await browser.close()
 fs.writeFileSync('test-results/layout/report.json',JSON.stringify({result,errors},null,2))
 console.log(JSON.stringify({result:result.map(x=>({width:x.width,route:x.route,overflow:x.overflow,clipped:x.clipped,missing:x.missingImgs,sections:x.sectionCount,photos:x.photos})),errors},null,2))
 if(errors.length)process.exit(1)
}
main().catch(e=>{console.error(e);process.exit(1)})
