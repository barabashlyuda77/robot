const { expect } = require('chai');
const buildVillageMap = require('../src/villagemap.js');

describe('buildVillageMap', () => {
    const arr = ['A-B'];

    const result = buildVillageMap(arr);

    it('returns an object', () => {
        expect(result).to.deep.equal({'A': ['B'], 'B': ['A']})
    });

    it('returns an object with key and few vallues in', () => {
        arr.push('A-C');
        expect(buildVillageMap(arr)).to.deep.equal({'A': ['B', 'C'], 'B': ['A'], 'C': ['A']})
    });
})
