import { names } from "./VoterForm";
import { Pair, can_reach_from_to } from "./tideman";

export function create_nodes(size: number): {}[] {
  let nodes: {}[] = [];
  for (let i = 0; i < size; i++) {
    nodes.push({ id: i, label: names[i] });
  }
  return nodes;
}

export function create_edges(pairs: Pair[], size: number): {}[] {
  let locked: boolean[][] = Array(size)
    .fill(false)
    .map(() => Array(size).fill(false)); // fill with falses

  let edges: {}[] = [];

  for (const pair of pairs) {
    const can_reach = can_reach_from_to(pair.loser, pair.winner, locked);
    if (!can_reach) {
      locked[pair.winner][pair.loser] = true;
      edges.push({
        from: pair.winner,
        to: pair.loser,
        width: pair.strength / 3
      });
    } else {
      locked[pair.winner][pair.loser] = false;
      edges.push({
        from: pair.winner,
        to: pair.loser,
        width: pair.strength / 3,
        color: "red"
      });
    }
  }
  return edges;
}
