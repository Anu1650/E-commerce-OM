const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/\{([^}]+)\}/g, (match, inner) => {
    if(!inner.includes('cat:')) return match;
    if(inner.includes("'western'")) return match.replace(/img:'[^']+'/g, "img:'./assets/western.png'");
    if(inner.includes("'traditional'")) return match.replace(/img:'[^']+'/g, "img:'./assets/traditional.png'");
    if(inner.includes("'saree'")) return match.replace(/img:'[^']+'/g, "img:'./assets/saree.png'");
    return match;
});
content = content.replace(/\{url:'https:\/\/[^']+',label:'New Arrivals – Western'\}/, "{url:'./assets/western.png',label:'New Arrivals – Western'}");
content = content.replace(/\{url:'https:\/\/[^']+',label:'Traditional Collection'\}/, "{url:'./assets/traditional.png',label:'Traditional Collection'}");
content = content.replace(/\{url:'https:\/\/[^']+',label:'Saree Festival'\}/, "{url:'./assets/saree.png',label:'Saree Festival'}");
content = content.replace(/\{url:'https:\/\/[^']+',label:'Ethnic Wear Sale',cat:'traditional'\}/, "{url:'./assets/traditional.png',label:'Ethnic Wear Sale',cat:'traditional'}");
content = content.replace(/\{url:'https:\/\/[^']+',label:'Party Sarees',cat:'saree'\}/, "{url:'./assets/saree.png',label:'Party Sarees',cat:'saree'}");

content = content.replace(/state\.v\s*<\s*10/g, 'state.v<11');
content = content.replace(/state\.v\s*=\s*10/g, 'state.v=11');
content = content.replace(/'ec_v2',\s*10/g, "'ec_v2',11");
fs.writeFileSync('index.html', content);
console.log('patched');
