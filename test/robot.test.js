const { expect } = require('chai');
const { move } = require('../src/robot');
const buildVillageMap = require('../src/villageMap');

describe('robot', () => {
  context('when a State has one neighbour', () => {
    const map = buildVillageMap([['A','B']]);

    it('returns this neighbour', () => {
        expect(move(map, 'A')).to.eql('B');
    });
  });

  context('when a State has multiple neighbours', () => {
    const map = buildVillageMap([['A','B'], ['A', 'C']]);

    it('returns one of the neibours from a State', () => {
        expect(move(map, 'A')).to.be.oneOf(['B', 'C']);
    });
  });
});
