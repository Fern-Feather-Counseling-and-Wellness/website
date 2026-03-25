
const fs = require('fs');
const https = require('https');

function checkStatus(url){
  return new Promise((resolve)=>{
    try{
      const req = https.get(url, (res)=>{ resolve({url, status: res.statusCode}); });
      req.on('error', ()=>resolve({url, status: 0}));
      req.setTimeout(5000, ()=>{ req.abort(); resolve({url, status: 0}); });
    }catch(e){ resolve({url, status:0}); }
  });
}

(async ()=>{
  const site = 'https://fernfeatherwellness.com';
  const paths = ['/','/about.html','/services.html','/resources.html'];
  const results = [];
  for(const p of paths){
    const r = await checkStatus(site + p);
    results.push(r);
  }
  fs.writeFileSync('_bmad-poc/_bmad-output/implementation-artifacts/ff_nav_check.json', JSON.stringify(results,null,2));
  console.log('Wrote results to _bmad-poc/_bmad-output/implementation-artifacts/ff_nav_check.json');
})();