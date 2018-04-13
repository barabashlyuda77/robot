const { expect } = require('chai');
const { buildVillageMap, getStates } = require('../src/villageMap');

describe('#buildVillageMap', () => {
  context('when creating a map with one road', () => {
    it('returns the map with two edges that connects the passed States', () => {
      expect(buildVillageMap([['A', 'B']])).to.deep.equal({
        A: ['B'],
        B: ['A'],
      });
    });
  });

  context('when creating a map with multiple roads', () => {
    it('returns the map containing each State as key', () => {
      expect(buildVillageMap([['A', 'B'], ['D', 'C']])).to.deep.equal({
        A: ['B'],
        B: ['A'],
        C: ['D'],
        D: ['C'],
      });
    });

    context('when a State is in multiple roads', () => {
      it('returns the map with multiple values for that State', () => {
        expect(buildVillageMap([['A', 'B'], ['A', 'C']])).to.deep.equal({
          A: ['B', 'C'],
          B: ['A'],
          C: ['A'],
        });
      });
    });
  });
});

describe('#getStates', () => {
  context('when creating a map with two states', () => {
    const villageMap = buildVillageMap([['A', 'B']]);

    it('returns this two states', () => {
      expect(getStates(villageMap)).to.eql(['A', 'B']);
    });
  });

  context('when creating a map with multiple states', () => {
    const villageMap = buildVillageMap([['A', 'B'], ['B', 'C'], ['C', 'D']]);

    it('returns all this states', () => {
      expect(getStates(villageMap)).to.eql(['A', 'B', 'C', 'D']);
    });
  });
});
