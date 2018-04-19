const roads = require('../src/config/roads');
const { buildVillageMap } = require('./villageMap');
const robot = require('./robot');
const { createTaskList } = require('./task');

const villageMap = buildVillageMap(roads);
const taskList = createTaskList(villageMap, 1);
console.log('Tasks', taskList);
console.log(robot.works(taskList, villageMap));
