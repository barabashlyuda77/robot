const {
  getDestination,
  createTaskList,
  startTask,
  UNSTARTED,
  STARTED,
  FINISHED,
  finishTask,
} = require('../src/task');

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

describe('#createTaskList', () => {
  context('when there are no states', () => {
    it('returns empty list', () => {
      expect(createTaskList([])).to.eql([]);
    });
  });

  context('when there are two states', () => {
    it('returns two tasks', () => {
      expect(createTaskList(['A', 'B'], 1).length).to.eql(1);
    });
  });

  context('when a number of tasks is 0', () => {
    it('returns an empty list', () => {
      expect(createTaskList(['A', 'B', 'C'], 0)).to.eql([]);
    });
  });

  context('when a number of task is 5', () => {
    it('returns 5 tasks in a list', () => {
      expect(createTaskList(['A', 'B', 'C'], 5).length).to.eql(5);
    });
  });
});

describe('#startTask', () => {
  context('when starting unstarted task', () => {
    const task = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    const newTask = startTask(task);

    it('returns new task', () => {
      expect(newTask).to.not.equal(task);
    });
    it('returns started task', () => {
      expect(newTask.stage).to.be.equal(STARTED);
    });
  });
  context('when starting started task', () => {
    const task = {
      from: 'A',
      to: 'B',
      stage: STARTED,
    };

    it('throws an error', () => {
      expect(() => startTask(task)).to.throw('Task was already started');
    });
  });
  context('when starting finished task', () => {
    const task = {
      from: 'A',
      to: 'B',
      stage: FINISHED,
    };

    it('throws an error', () => {
      expect(() => startTask(task)).to.throw('Task was already finished');
    });
  });
});

describe('#finishTask', () => {
  context('when finishing started task', () => {
    const startedTask = {
      from: 'A',
      to: 'B',
      stage: STARTED,
    };

    const finishedTask = finishTask(startedTask);

    it('returns new task', () => {
      expect(finishedTask).to.not.equal(startedTask);
    });
    it('returns finished task', () => {
      expect(finishedTask.stage).to.be.equal(FINISHED);
    });
  });
  context('when finishing unstarted task', () => {
    const unstartedTask = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    it('throws an error', () => {
      expect(() => finishTask(unstartedTask)).to.throw('Task was not started');
    });
  });
  context('when finishing finished task', () => {
    const finishedTask = {
      from: 'A',
      to: 'B',
      stage: FINISHED,
    };

    it('throws an error', () => {
      expect(() => finishTask(finishedTask)).to.throw('Task was already finished');
    });
  });
});
