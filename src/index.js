const _ = require('lodash');
const roads = require('../src/config/roads');
const { buildVillageMap, getStates } = require('./villagemap');
const { move } = require('./robot');

const villageMap = buildVillageMap(roads);
let randomLocation = _.sample(getStates(villageMap));
for (let i = 1; i <= roads.length; i++) {
  const from = randomLocation;
  randomLocation = move(villageMap, randomLocation);
  console.log(`#${i} = from ${from} to ${randomLocation}`);
}
