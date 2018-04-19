const _ = require('lodash');
const { areTasksToWorkOn, updateTasksStage } = require('./task');
const { randomLocation } = require('./villageMap');

const move = (map, location) => _.sample(map[location]);

const works = (tasks, map) => {
  let turn;
  let currentLocation = randomLocation(map);
  for (turn = 0; areTasksToWorkOn(tasks); turn++) {
    updateTasksStage(tasks, currentLocation);
    console.log(tasks);
    const logFrom = `Move from ${currentLocation}`;
    currentLocation = move(map, currentLocation);
    console.log(`${logFrom} to ${currentLocation}`);
  }
  return `Done in ${turn} turns`;
};

module.exports = {
  works,
  move,
};
