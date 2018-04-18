const _ = require('lodash');

function getDestination(fromLocation, states) {
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
    stage: 'unstarted',
  };
});
  });
}

module.exports = { getDestination, createToDoList };
