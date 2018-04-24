const _ = require('lodash');
const { areTasksToWorkOn, updateTasksStage } = require('./task');
const { randomLocation } = require('./villageMap');

const move = (map, location) => _.sample(map[location]);

const works = (tasks, map) => {
  let turn = 0;
  let currentLocation = randomLocation(map);
  let currentTasks = tasks;
  while (areTasksToWorkOn(currentTasks)) {
    currentTasks = updateTasksStage(currentTasks, currentLocation);
    console.log(currentTasks);
    console.log();
    const logFrom = `Move from ${currentLocation}`;
    currentLocation = move(map, currentLocation);
    console.log(`${logFrom} to ${currentLocation}`);
    turn += 1;
  }
  return `Done in ${turn} turns`;
};

module.exports = {
  works,
  move,
};
