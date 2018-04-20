/* eslint-disable no-unused-expressions */
const {
  getDestination,
  createTaskList,
  startTask,
  UNSTARTED,
  STARTED,
  FINISHED,
  finishTask,
  isTaskUnstarted,
  isTaskStarted,
  isTaskFinished,
  isMatchFromLocation,
  isMatchToLocation,
  isUnstartedTaskAtLocation,
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
    const unstartedTask = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    const startedTask = startTask(unstartedTask);

    it('returns new task', () => {
      expect(startedTask).to.not.equal(unstartedTask);
    });
    it('returns started task', () => {
      expect(startedTask.stage).to.be.equal(STARTED);
    });
  });
  context('when starting started task', () => {
    const startedTask = {
      from: 'A',
      to: 'B',
      stage: STARTED,
    };

    it('throws an error', () => {
      expect(() => startTask(startedTask)).to.throw('Task was already started');
    });
  });
  context('when starting finished task', () => {
    const finishedTask = {
      from: 'A',
      to: 'B',
      stage: FINISHED,
    };

    it('throws an error', () => {
      expect(() => startTask(finishedTask)).to.throw('Task was already finished');
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

describe('#isTaskUnstarted', () => {
  context('when task is not started', () => {
    const unstartedTask = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    it('returns true', () => {
      expect(isTaskUnstarted(unstartedTask)).to.true;
    });
  });
  context('when task is in the progress', () => {
    const startedTask = {
      from: 'A',
      to: 'B',
      stage: STARTED,
    };

    it('returns false', () => {
      expect(isTaskUnstarted(startedTask)).to.false;
    });
  });
  context('when task is finished', () => {
    const finishedTask = {
      from: 'A',
      to: 'B',
      stage: FINISHED,
    };

    it('returns false', () => {
      expect(isTaskUnstarted(finishedTask)).to.false;
    });
  });
});

describe('#isTaskStarted', () => {
  context('when task is started', () => {
    const startedTask = {
      from: 'A',
      to: 'B',
      stage: STARTED,
    };

    it('returns true', () => {
      expect(isTaskStarted(startedTask)).to.true;
    });
  });
  context('when task is not started', () => {
    const unstartedTask = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    it('returns false', () => {
      expect(isTaskStarted(unstartedTask)).to.false;
    });
  });
  context('when task is finished', () => {
    const finishedTask = {
      from: 'A',
      to: 'B',
      stage: FINISHED,
    };

    it('returns false', () => {
      expect(isTaskStarted(finishedTask)).to.false;
    });
  });
});

describe('#isTaskFinished', () => {
  context('when task is finished', () => {
    const finishedTask = {
      from: 'A',
      to: 'B',
      stage: FINISHED,
    };

    it('returns true', () => {
      expect(isTaskFinished(finishedTask)).to.true;
    });
  });
  context('when task is started', () => {
    const startedTask = {
      from: 'A',
      to: 'B',
      stage: STARTED,
    };

    it('returns false', () => {
      expect(isTaskFinished(startedTask)).to.false;
    });
  });
  context('when task is not started', () => {
    const unstartedTask = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    it('returns false', () => {
      expect(isTaskFinished(unstartedTask)).to.false;
    });
  });
});

describe('#isMatchFromLocation', () => {
  context('when task fromLocation matches with a current location', () => {
    const task = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    it('returns true', () => {
      expect(isMatchFromLocation(task, 'A')).to.be.true;
    });
  });
  context('when task fromLocation is not match with a current location', () => {
    const task = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    it('returns false', () => {
      expect(isMatchFromLocation(task, 'B')).to.be.false;
    });
  });
});

describe('#isMatchToLocation', () => {
  context('when task toLocation matches with a current location', () => {
    const task = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    it('returns true', () => {
      expect(isMatchToLocation(task, 'B')).to.be.true;
    });
  });
  context('when task toLocation is not match with a current location', () => {
    const task = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    it('returns false', () => {
      expect(isMatchToLocation(task, 'A')).to.be.false;
    });
  });
});

describe('#isUnstartedTaskAtLocation', () => {
  context('when unstarted task is at fromLocation', () => {
    const task = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    it('returns true', () => {
      expect(isUnstartedTaskAtLocation(task, 'A')).to.be.true;
    });
  });
  context('when started task is at fromLocation', () => {
    const task = {
      from: 'A',
      to: 'B',
      stage: STARTED,
    };

    it('returns false', () => {
      expect(isUnstartedTaskAtLocation(task, 'A')).to.be.false;
    });
  });
  context('when finished task is at fromLocation', () => {
    const task = {
      from: 'A',
      to: 'B',
      stage: FINISHED,
    };

    it('returns false', () => {
      expect(isUnstartedTaskAtLocation(task, 'A')).to.be.false;
    });
  });
  context('when unstarted task is at toLocation', () => {
    const task = {
      from: 'A',
      to: 'B',
      stage: STARTED,
    };

    it('returns false', () => {
      expect(isUnstartedTaskAtLocation(task, 'B')).to.be.false;
    });
  });
});

describe('#isStartedTaskAtLocation', () => {
  context('when started task is at toLocation', () => {
    const startedTask = {
      from: 'A',
      to: 'B',
      stage: STARTED,
    };

    it('returns true', () => {
      expect(isStartedTaskAtLocation(startedTask, 'B')).to.be.true;
    });
  });
  context('when unstarted task is at toLocation', () => {
    const unstartedTask = {
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    };

    it('returns false', () => {
      expect(isStartedTaskAtLocation(unstartedTask, 'B')).to.be.false;
    });
  });
  context('when finished task is at toLocation', () => {
    const finishedTask = {
      from: 'A',
      to: 'B',
      stage: FINISHED,
    };

    it('returns false', () => {
      expect(isStartedTaskAtLocation(finishedTask, 'B')).to.be.false;
    });
  });
  context('when started task is at fromLocation', () => {
    const startedTask = {
      from: 'A',
      to: 'B',
      stage: STARTED,
    };

    it('returns false', () => {
      expect(isStartedTaskAtLocation(startedTask, 'A')).to.be.false;
    });
  });
});
