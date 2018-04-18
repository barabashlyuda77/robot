const _ = require('lodash');
const roads = require('../src/config/roads');
const { buildVillageMap, getStates } = require('./villageMap');
const { move } = require('./robot');

const villageMap = buildVillageMap(roads);
let randomLocation = _.sample(getStates(villageMap));
_.range(10).forEach((i) => {
  const from = randomLocation;
  randomLocation = move(villageMap, randomLocation);
  console.log(`#${i + 1} = from ${from} to ${randomLocation}`);
});
