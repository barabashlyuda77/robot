const _ = require('lodash');

function getDestination(fromLocation, states) {
  if (!states.includes(fromLocation)) throw new Error('A state is not on a map');
  if (states.length === 1) throw new Error('Not enough states');

  const destination = _.sample(states);
  return (fromLocation === destination) ? getDestination(fromLocation, states) : destination;
}

function createToDoList(states, n) {
  return _.range(n).map(() => {
    const fromLocation = _.sample(states);
    return {
      from: fromLocation,
      to: getDestination(fromLocation, states),
    };
  });
}

module.exports = { getDestination, createToDoList };
