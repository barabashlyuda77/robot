const _ = require('lodash');
const { getStates } = require('./villageMap');

const STARTED = 'started';
const UNSTARTED = 'unstarted';
const FINISHED = 'finished';

const randomLocation = map => _.sample(getStates(map));

const getDestination = (fromLocation, states) => {
  if (!states.includes(fromLocation)) throw new Error('A state is not on a map');
  if (states.length === 1) throw new Error('Not enough states');

  const destination = _.sample(states);
  return (fromLocation === destination) ? getDestination(fromLocation, states) : destination;
};

const createTaskList = (map, n) => _.range(n).map(() => {
  const fromLocation = randomLocation(map);
  return {
    from: fromLocation,
    to: getDestination(fromLocation, getStates(map)),
    stage: UNSTARTED,
  };
});

const startTask = task => ({ ...task, stage: STARTED });

const finishTask = task => ({ ...task, stage: FINISHED });

const isTaskStarted = task => task.stage === STARTED;

const isTaskUnstarted = task => task.stage === UNSTARTED;

const isMatchFromLocation = (task, location) => location === task.from;

const isMatchToLocation = (task, location) => location === task.to;

const isUnstartedTaskAtLocation = (task, location) =>
  isMatchFromLocation(task, location) && isTaskUnstarted(task);

const isStartedTaskAtLocation = (task, location) =>
  isMatchToLocation(task, location) && isTaskStarted(task);

const updateTasksStage = (tasks, location) => {
  tasks.forEach((task) => {
    if (isUnstartedTaskAtLocation(task, location)) {
      startTask(task);
      console.log(`Get task at ${task.from}`);
    }
    if (isTaskStartedAtLocation(task, location)) {
      finishTask(task);
      console.log(`Finished task at ${task.to}`);
    }
  });
};
const isTaskFinished = task => task.stage === FINISHED;

const areTasksToWorkOn = tasks => tasks.some(task => !isTaskFinished(task));


module.exports = {
  createTaskList,
  areTasksToWorkOn,
  updateTasksStage,
  randomLocation,
  getDestination,
};
