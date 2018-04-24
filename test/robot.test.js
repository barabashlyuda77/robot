const proxyquire = require('proxyquire');
const sinon = require('sinon');

const randomLocation = sinon.stub();
const { move, works } = proxyquire('../src/robot', {
  './villageMap': { randomLocation },
});
const { buildVillageMap } = require('../src/villageMap');
const { STARTED, UNSTARTED, FINISHED } = require('../src/task');

describe('#move', () => {
  context('when a State has one neighbour', () => {
    const map = buildVillageMap([['A', 'B']]);

    it('returns this neighbour', () => {
      expect(move(map, 'A')).to.eql('B');
    });
  });

  context('when a State has multiple neighbours', () => {
    const map = buildVillageMap([['A', 'B'], ['A', 'C']]);

    it('returns one of the neibours from a State', () => {
      expect(move(map, 'A')).to.be.oneOf(['B', 'C']);
    });
  });
});

describe('#works', () => {
  context('when a map with two states and one task', () => {
    const tasks = [{
      from: 'A',
      to: 'B',
      stage: UNSTARTED,
    }];
    const map = {
      A: ['B'],
      B: ['A'],
    };
    context('when one unstarted task', () => {
      context('when starting at A', () => {
        before(() => {
          randomLocation.returns('A');
        });

        it('moves twice', () => {
          expect(works(tasks, map)).to.eql('Done in 2 turns');
        });
      });
      context('when starting at B', () => {
        before(() => {
          randomLocation.returns('B');
        });

        it('moves three times', () => {
          expect(works(tasks, map)).to.eql('Done in 3 turns');
        });
      });
    });
    context('when one started task', () => {
      before(() => {
        tasks[0].stage = STARTED;
      });

      context('when starting at A', () => {
        before(() => {
          randomLocation.returns('A');
        });
        it('moves twice', () => {
          expect(works(tasks, map)).to.eql('Done in 2 turns');
        });
      });
      context('when starting at B', () => {
        before(() => {
          randomLocation.returns('B');
        });
        it('moves once', () => {
          expect(works(tasks, map)).to.eql('Done in 1 turns');
        });
      });
    });
    context('when one finished task', () => {
      before(() => {
        randomLocation.returns(tasks[0].to);
        tasks[0].stage = FINISHED;
      });
      it('would not move', () => {
        expect(works(tasks, map)).to.eql('Done in 0 turns');
      });
    });
  });
});
