const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// replace western category icon
content = content.replace(/<img src="https:\/\/[^"]+" alt="Western"[^>]*>/, '<img src="./assets/western.png" alt="Western">');
content = content.replace(/<img src="https:\/\/[^"]+" alt="Traditional"[^>]*>/, '<img src="./assets/traditional.png" alt="Traditional">');
content = content.replace(/<img src="https:\/\/[^"]+" alt="Saree"[^>]*>/, '<img src="./assets/saree.png" alt="Saree">');

// other category icons fallback (Orders, Wishlist, Help)
content = content.replace(/<img src="https:\/\/[^"]+" alt="Orders"[^>]*>/, '<div style="font-size:32px;display:flex;align-items:center;justify-content:center;width:56px;height:56px;background:#f5f5f5;border-radius:4px">📦</div>');
content = content.replace(/<img src="https:\/\/[^"]+" alt="Wishlist"[^>]*>/, '<div style="font-size:32px;display:flex;align-items:center;justify-content:center;width:56px;height:56px;background:#f5f5f5;border-radius:4px">❤</div>');
content = content.replace(/<img src="https:\/\/[^"]+" alt="Help"[^>]*>/, '<div style="font-size:32px;display:flex;align-items:center;justify-content:center;width:56px;height:56px;background:#f5f5f5;border-radius:4px">❓</div>');

// replace products
content = content.replace(/img:'https:\/\/[^']+',/g, (match, offset, fullCode) => {
    // context around it
    const before = fullCode.substring(offset - 40, offset);
    if (before.includes("'western'")) return "img:'./assets/western.png',";
    if (before.includes("'traditional'")) return "img:'./assets/traditional.png',";
    if (before.includes("'saree'")) return "img:'./assets/saree.png',";
    return match;
});

// banners
content = content.replace(/\{url:'https:\/\/[^']+',label:'New Arrivals – Western'\}/, "{url:'./assets/western.png',label:'New Arrivals – Western'}");
content = content.replace(/\{url:'https:\/\/[^']+',label:'Traditional Collection'\}/, "{url:'./assets/traditional.png',label:'Traditional Collection'}");
content = content.replace(/\{url:'https:\/\/[^']+',label:'Saree Festival'\}/, "{url:'./assets/saree.png',label:'Saree Festival'}");

// Side Banners
content = content.replace(/\{url:'https:\/\/[^']+',label:'Ethnic Wear Sale',cat:'traditional'\}/, "{url:'./assets/traditional.png',label:'Ethnic Wear Sale',cat:'traditional'}");
content = content.replace(/\{url:'https:\/\/[^']+',label:'Party Sarees',cat:'saree'\}/, "{url:'./assets/saree.png',label:'Party Sarees',cat:'saree'}");


// Force a localStorage update
content = content.replace(/state\.v\s*(<|==|===)\s*\d+/g, 'state.v<10');
content = content.replace(/state\.v\s*=\s*\d+/g, 'state.v=10');
content = content.replace(/'ec_v2',\s*\d+/g, "'ec_v2',10");

fs.writeFileSync('index.html', content);
console.log('Replaced remote images with local assets');
