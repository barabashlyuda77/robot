const buildVillageMap = (edges) => {
  const map = {};

  const addEdge = (from, to) => {
    if (!map[from]) {
      map[from] = [to];
    } else {
      map[from].push(to);
    }
  };

  edges.forEach(([from, to]) => {
    addEdge(from, to);
    addEdge(to, from);
  });

  return map;
};

const getStates = map => Object.keys(map);

module.exports = {
  buildVillageMap,
  getStates,
};
