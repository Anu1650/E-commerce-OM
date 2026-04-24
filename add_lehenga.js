const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The new product object to insert
const newProduct = `  {id:'t6',name:'Purple Floral Lehenga Choli',brand:'EthnicGlam',price:3499,mrp:5999,cat:'traditional',rating:4.8,reviews:128,assured:true,img:'./assets/purple_lehenga.jpg',colors:['#8b008b','#fce4ec'],sizes:['XS','S','M','L','XL'],desc:'Beautiful purple lehenga with intricate silver floral embroidery. Comes with matching choli and sheer dupatta.'},
`;

// Insert after id:'t5'
if (!content.includes("'t6'")) {
    content = content.replace(/\{id:'t5'[^}]+\},/, (match) => {
        return match + '\n' + newProduct;
    });
    
    // Bump version again
    content = content.replace(/state\.v\s*<\s*40/g, 'state.v<42');
    content = content.replace(/state\.v\s*=\s*40/g, 'state.v=42');
    content = content.replace(/'ec_v2',\s*40/g, "'ec_v2',42");
    content = content.replace(/state\.v\s*<\s*3[0-9]/g, 'state.v<40');
    content = content.replace(/state\.v\s*=\s*3[0-9]/g, 'state.v=40');
    content = content.replace(/'ec_v2',\s*3[0-9]/g, "'ec_v2',40");
    
    fs.writeFileSync('index.html', content);
    console.log('Added purple lehenga');
} else {
    console.log('Already added');
}
