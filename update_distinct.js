const fs = require('fs');

const imgMap = {
  w1: "./assets/w1.png",
  w2: "./assets/w2.png",
  w3: "https://dummyimage.com/600x600/e91e63/fff?text=Summer+Dress",
  w4: "./assets/w4.png",
  w5: "https://dummyimage.com/600x600/1a237e/fff?text=Skinny+Jeans",
  w6: "https://dummyimage.com/600x600/90a4ae/fff?text=Linen+Shirt",
  t1: "./assets/traditional.png",
  t2: "https://dummyimage.com/600x600/4a148c/fff?text=Nehru+Jacket",
  t3: "https://dummyimage.com/600x600/d4af37/fff?text=Silk+Sherwani",
  t4: "https://dummyimage.com/600x600/b71c1c/fff?text=Mojari",
  t5: "https://dummyimage.com/600x600/e91e63/fff?text=Anarkali+Suit",
  s1: "./assets/saree.png",
  s2: "https://dummyimage.com/600x600/006064/fff?text=Cotton+Handloom",
  s3: "https://dummyimage.com/600x600/880e4f/fff?text=Designer+Party",
  s4: "https://dummyimage.com/600x600/d4af37/fff?text=Bridal+Saree",
  s5: "https://dummyimage.com/600x600/e1bee7/fff?text=Chanderi+Silk"
};

let content = fs.readFileSync('index.html', 'utf8');

// Replace imgs in the object literals
content = content.replace(/\{([^}]+)\}/g, (match, inner) => {
    if (!inner.includes('cat:') || !inner.includes('id:')) return match;
    const idMatch = inner.match(/id:'([^']+)'/);
    if (!idMatch) return match;
    const pid = idMatch[1];
    
    if (imgMap[pid]) {
      return match.replace(/img:'[^']+'/g, `img:'${imgMap[pid]}'`);
    }
    return match;
});

content = content.replace(/state\.v\s*<\s*30/g, 'state.v<31');
content = content.replace(/state\.v\s*=\s*30/g, 'state.v=31');
content = content.replace(/'ec_v2',\s*30/g, "'ec_v2',31");
content = content.replace(/state\.v\s*<\s*[1-2][0-9]/g, 'state.v<30');
content = content.replace(/state\.v\s*=\s*[1-2][0-9]/g, 'state.v=30');
content = content.replace(/'ec_v2',\s*[1-2][0-9]/g, "'ec_v2',30");

fs.writeFileSync('index.html', content);
console.log('Update distinct images complete.');
