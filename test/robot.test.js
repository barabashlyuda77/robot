const { expect } = require('chai');
const { move } = require('../src/robot');

describe('robot', () => {
  context('when a State has one neighbour', () => {
    const obj = {
      'A': ['B'],
      'B': ['A']
    };
    it('returns this neighbour', () => {
        expect(move(obj, 'A')).to.eql('B');
    });
  });

  context('when a State has multiple neighbours', () => {
    const obj = {
      'A': ['B', 'C'],
      'B': ['A'],
      'C': ['A']
    };

    it('returns one of the neibours from a State', () => {
        expect(move(obj, 'A')).to.be.oneOf(['B', 'C']);
    });
  });
});
