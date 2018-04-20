const _ = require('lodash');
const { getStates, randomLocation } = require('./villageMap');

const STARTED = 'started';
const UNSTARTED = 'unstarted';
const FINISHED = 'finished';

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
const isTaskUnstarted = task => task.stage === UNSTARTED;

const isTaskStarted = task => task.stage === STARTED;

const isTaskFinished = task => task.stage === FINISHED;

const startTask = (task) => {
  if (isTaskStarted(task)) throw new Error('Task was already started');
  if (isTaskFinished(task)) throw new Error('Task was already finished');

  return ({ ...task, stage: STARTED });
};

const finishTask = (task) => {
  if (isTaskUnstarted(task)) throw new Error('Task was not started');
  if (isTaskFinished(task)) throw new Error('Task was already finished');

  return ({ ...task, stage: FINISHED });
};

const isMatchFromLocation = (task, location) => location === task.from;

const isMatchToLocation = (task, location) => location === task.to;

const isUnstartedTaskAtLocation = (task, location) =>
  isMatchFromLocation(task, location) && isTaskUnstarted(task);

const isStartedTaskAtLocation = (task, location) =>
  isMatchToLocation(task, location) && isTaskStarted(task);

const updateTasksStage = (tasks, location) => (
  tasks.map((task) => {
    if (isUnstartedTaskAtLocation(task, location)) {
      console.log(`Get task at ${task.from}`);
      return startTask(task);
    }
    if (isStartedTaskAtLocation(task, location)) {
      console.log(`Finished task at ${task.to}`);
      return finishTask(task);
    }
    return task;
  })
);

const areTasksToWorkOn = tasks => tasks.some(task => !isTaskFinished(task));


module.exports = {
  createTaskList,
  areTasksToWorkOn,
  updateTasksStage,
  randomLocation,
  getDestination,
  startTask,
  STARTED,
  UNSTARTED,
  FINISHED,
  finishTask,
  isTaskUnstarted,
  isTaskStarted,
  isTaskFinished,
  isMatchFromLocation,
  isMatchToLocation,
  isUnstartedTaskAtLocation,
};
