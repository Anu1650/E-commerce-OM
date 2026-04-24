const https = require('https');
const fs = require('fs');
const path = require('path');

const ids = {
  w3: '1515372039744-b8f02a3ae4',
  w5: '1542574621-e088a4464792-',
  w6: '1602810318383-e386cc2a3c',
  t1: '1595967783875-c371f35d80',
  t2: '1617114919297-3c8ddb01f5',
  t3: '1507003211169-0a1dd7228f',
  t4: '1603487788447-4140082ed3',
  t5: '1583391733956-3750e0ff4e',
  s1: '1617627143750-d86bc21e42',
  s2: '1610030469668-93510ec676',
  s3: '1591348279281-13637e6728',
  s4: '1625767386244-5aabd2cfe5',
  s5: '1597983073492-bc24159b4c'
};

const dl = (id, prodKey) => new Promise((resolve) => {
  const file = fs.createWriteStream(path.join(__dirname, 'assets', `${prodKey}.jpg`));
  const url = `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop`;
  
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
        res2.pipe(file);
        file.on('finish', () => file.close(resolve));
      }).on('error', resolve);
    } else {
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }
  }).on('error', resolve);
});

async function run() {
  const promises = [];
  for (const [key, id] of Object.entries(ids)) {
    promises.push(dl(id, key));
  }
  await Promise.all(promises);
  console.log('Downloaded 13 images');

  // Now rewrite index.html to use w1.png, w2.png, w3.jpg, w4.png, w5.jpg, etc.
  let content = fs.readFileSync('index.html', 'utf8');
  
  // Define categories and their items
  const items = {
    western: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6'],
    traditional: ['t1', 't2', 't3', 't4', 't5'],
    saree: ['s1', 's2', 's3', 's4', 's5']
  };

  // Find the exact object parts and systematically replace
  content = content.replace(/\{([^}]+)\}/g, (match, inner) => {
    if (!inner.includes('cat:') || !inner.includes('id:')) return match;
    
    // Extract the id
    const idMatch = inner.match(/id:'([^']+)'/);
    if (!idMatch) return match;
    const pid = idMatch[1];

    let ext = ['w1', 'w2', 'w4'].includes(pid) ? 'png' : 'jpg';

    return match.replace(/img:'[^']+'/g, `img:'./assets/${pid}.${ext}'`);
  });

  content = content.replace(/state\.v\s*<\s*20/g, 'state.v<21');
  content = content.replace(/state\.v\s*=\s*20/g, 'state.v=21');
  content = content.replace(/'ec_v2',\s*20/g, "'ec_v2',21");
  content = content.replace(/state\.v\s*<\s*1[0-9]/g, 'state.v<20');
  content = content.replace(/state\.v\s*=\s*1[0-9]/g, 'state.v=20');
  content = content.replace(/'ec_v2',\s*1[0-9]/g, "'ec_v2',20");

  fs.writeFileSync('index.html', content);
  console.log('index.html updated with distinct images!');
}

run();
