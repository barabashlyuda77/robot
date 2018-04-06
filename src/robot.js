const _ = require('lodash');

const move = (map, currentLocation) => _.sample(map[currentLocation]);

module.exports = { move };
