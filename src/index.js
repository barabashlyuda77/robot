const roads = require('../src/config/roads.js');
const buildVillageMap = require('./villagemap.js');
const buildVillageMap = require('./villagemap');
const { move } = require('./robot');

const villageMap = buildVillageMap(roads);
let randomLocation = _.sample(Object.keys(villageMap));
for (let i = 0; i < roads.length; i++) {
  const from = randomLocation;
  randomLocation = move(villageMap, randomLocation);
  console.log(`#${i} = from ${from} to ${randomLocation}`);
}
