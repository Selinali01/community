const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ args: ['--no-sandbox','--autoplay-policy=no-user-gesture-required'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 760, deviceScaleFactor: 1 });
  await p.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 35000 });
  await new Promise(r => setTimeout(r, 4500));
  const N = 130, MAX = 600;
  const ease = t => t<0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; // smoothstep
  let f = 0;
  const shot = async () => { await p.screenshot({ path: `/tmp/frames/f${String(f).padStart(4,'0')}.png` }); f++; };
  // hold at top so "immediately present" reads
  for (let i=0;i<14;i++){ await shot(); }
  // smooth scroll 0 -> MAX
  for (let i=0;i<=N;i++){
    const y = Math.round(ease(i/N)*MAX);
    await p.evaluate(yy=>window.scrollTo(0,yy), y);
    await new Promise(r=>setTimeout(r,16));
    await shot();
  }
  // dwell on the settled reveal
  for (let i=0;i<26;i++){ await shot(); }
  console.log('frames', f);
  await b.close();
})();
