const { getDestination, createToDoList } = require('../src/task');

describe('#getDestination', () => {
  context('when there is one state', () => {
    it('throws an error', () => {
      expect(() => getDestination('A', ['A'])).to.throw('Not enough states');
    });
  });

  context('when there are two states', () => {
    it('returns a second state', () => {
      expect(getDestination('A', ['A', 'B'])).to.eql('B');
    });
  });

  context('when there are multiple states', () => {
    it('returns one of states except a starting location', () => {
      expect(getDestination('D', ['A', 'D', 'B', 'C'])).to.be.oneOf(['A', 'B', 'C']);
    });
  });

  context('when starting location is not part of a list of states', () => {
    it('throws an error', () => {
      expect(() => getDestination('C', ['A', 'B'])).to.throw('A state is not on a map');
    });
  });
});

describe('#createToDoList', () => {
  context('when there are no states', () => {
    it('returns empty list', () => {
      expect(createToDoList([])).to.eql([]);
    });
  });

  context('when there are two states', () => {
    it('returns two tasks', () => {
      expect(createToDoList(['A', 'B'], 1).length).to.eql(1);
    });
  });

  context('when a number of tasks is 0', () => {
    it('returns an empty list', () => {
      expect(createToDoList(['A', 'B', 'C'], 0)).to.eql([]);
    });
  });

  context('when a number of task is 5', () => {
    it('returns 5 tasks in a list', () => {
      expect(createToDoList(['A', 'B', 'C'], 5).length).to.eql(5);
    });
  });
});
