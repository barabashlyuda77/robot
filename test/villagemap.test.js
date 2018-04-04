const { expect } = require('chai');
const buildVillageMap = require('../src/villagemap.js');

describe('buildVillageMap', () => {
  context('when creating a map with one road', () => {
    it('returns the map with two edges that connects the passed States', () => {
        expect(buildVillageMap(
          ['A-B']
        )).to.deep.equal({
          'A': ['B'],
          'B': ['A']
        });
    });
  });

  context('when creating a map with multiple roads', () => {
    it('returns the map containing each State as key', () => {
      expect(buildVillageMap(
        ['A-B', 'D-C']
      )).to.deep.equal({
        'A': ['B'],
        'B': ['A'],
        'C': ['D'],
        'D': ['C']
      });
    });

    context('when a State is in multiple roads', () => {
      it('returns the map with multiple values for that State', () => {
        expect(buildVillageMap(
          ['A-B', 'A-C']
        )).to.deep.equal({
          'A': ['B', 'C'],
          'B': ['A'],
          'C': ['A']
        });
      });
    })
  });
});
