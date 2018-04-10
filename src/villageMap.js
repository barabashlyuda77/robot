function buildVillageMap(edges) {
  let map = {};

  function addEdge(from, to) {
    if (!map[from]) {
      map[from] = [to];
    } else {
      map[from].push(to);
    }
  }

  edges.forEach(function ([from, to]) {
    addEdge(from, to);
    addEdge(to, from);
  });

  return map;
}
module.exports = buildVillageMap;