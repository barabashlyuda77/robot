const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildVillageMap(edges) {
  let map = Object.create(null);
  function addEdge(from, to) {
    if (!map[from]) {
      map[from] = [to];
    } else {
      map[from].push(to);
    }
  }
  //not using for
  // for (let [from, to] of edges.map(r => r.split("-"))) {
  //   addEdge(from, to);
  //   addEdge(to, from);
  // }
  edges.map(r => r.split("-"))
        .forEach(function ([from, to]) {
          addEdge(from, to);
          addEdge(to, from);
        });

  return map;
}

const villageMap = buildVillageMap(roads);
console.log(villageMap);

module.exports = buildVillageMap;
