const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The matching needs to carefully replace the picsum URLs
let count = 0;
content = content.replace(/https:\/\/picsum\.photos\/seed\/photo-([a-zA-Z0-9\-]+)\/600\/600/g, (match, id) => {
    count++;
    // Unsplash direct URL
    return `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop`;
});

// Fix for URLs with different format (just in case)
content = content.replace(/https:\/\/picsum\.photos\/seed\/[a-zA-Z0-9\-]+\/600\/600/g, (match) => {
    count++;
    return `https://images.unsplash.com/photo-1523205771623-e0faa4d281?w=600&h=600&fit=crop`;
});

// Increment state version so the changes are picked up by the browser
content = content.replace(/state\.v(\s*<|=)\s*6/g, 'state.v$1 8');
content = content.replace(/'ec_v2',\s*6/g, "'ec_v2', 8");
content = content.replace(/state\.v\s*=\s*6/g, 'state.v = 8');

// Another pattern
content = content.replace(/state\.v<[1-7]/g, 'state.v<8');

const regexPlacehold = /https:\/\/placehold\.co\/([a-zA-Z0-9x]+)(\/[a-zA-Z0-9]+)?(\/[a-zA-Z0-9]+)?\?text=([^'"]+)/g;
content = content.replace(regexPlacehold, 'https://via.placeholder.com/$1?text=$4');

content = content.replace(/https:\/\/picsum\.photos\/seed\/notfound\/\d+\/\d+/g, 'https://via.placeholder.com/400?text=Not+Found');
content = content.replace(/https:\/\/picsum\.photos\/seed\/thumb\/\d+\/\d+/g, 'https://via.placeholder.com/60?text=Thumb');

fs.writeFileSync('index.html', content);
console.log(`Replaced ${count} Unsplash URLs`);
