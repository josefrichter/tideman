/* 

SPOILER ALERT!
this file contains the solutions to cs50!

typescript is pretty similar to C (even copy-pasted some code)
I even used C-style snake_case instead of usual TS camelCase
to make the code as similar as possible (in this file)

*/
import { names } from "./VoterForm";

// type (similar to struct in C)
export type Pair = {
  winner: number;
  loser: number;
  strength: number; // adding strenght here, unlike in cs50
  minority: number; // adding minority, unlike in cs50
};

// create rank matrix
// that has voters_count rows
// and candidate_count columns
// filled with generated default values 0,1,2,... on each row
// that are displayed when you load the page
export function create_ranks_matrix(
  voters_count: number,
  candidate_count: number
): number[][] {
  let default_ranks = Array.from(Array(candidate_count).keys());
  const default_voters_ranks = Array(voters_count).fill(default_ranks);
  return default_voters_ranks;
}

// same as in cs50, records the actual votes
export function record_preferences(matrix: number[][]): number[][] {
  // update preferences array based on current voter's ranks
  // e.g. ranks = [3, 0, 4, 1, 2] = the order of candidates by id
  // record how many people prefered once candidate over another candidate
  // e.g. 3 is prefered over 0, 4, 1, 2
  // 0 is prefered over 4, 1, 2
  // etc.
  // preferences[i][j] is number of voters who prefer i over j

  const voters_count = matrix.length;
  const candidate_count = matrix[0].length;

  // https://stackoverflow.com/a/49090833/199368
  let preferences = Array(candidate_count)
    .fill(0)
    .map(() => Array(candidate_count).fill(0));

  for (let h = 0; h < voters_count; h++) {
    const ranks = matrix[h];
    for (let i = 0; i < candidate_count; i++) {
      for (let j = i + 1; j < candidate_count; j++) {
        preferences[ranks[i]][ranks[j]] += 1;
        // suppose ranks = [3, 0, 4, 1, 2]
        // iteration 1: takes candidate at ranks[0] and candidate at ranks[1] -> preferences[3][0]++
        // iteration 2: takes candidate at ranks[0] and candidate at ranks[2] -> preferences[3][4]++
        // iteration 3: takes candidate at ranks[0] and candidate at ranks[3] -> preferences[3][1]++
        // iteration 4: takes candidate at ranks[0] and candidate at ranks[4] -> preferences[3][2]++

        // iteration 4: takes candidate at ranks[1] and candidate at ranks[2] -> preferences[0][4]++
        // iteration 5: takes candidate at ranks[1] and candidate at ranks[3] -> preferences[0][1]++
        // iteration 6: takes candidate at ranks[1] and candidate at ranks[4] -> preferences[0][2]++

        // iteration 7: takes candidate at ranks[2] and candidate at ranks[3] -> preferences[4][1]++
        // iteration 8: takes candidate at ranks[2] and candidate at ranks[4] -> preferences[4][2]++

        // iteration 9: takes candidate at ranks[3] and candidate at ranks[4] -> preferences[1][2]++
      }
    }
  }
  return preferences;
}

// TODO the output here seems to be always sorted by default?
export function create_pairs(preferences: number[][]): Pair[] {
  let pairs: Pair[] = [];
  const size: number = preferences.length; // rectangular matrix
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const strength = preferences[i][j] - preferences[j][i];
      if (strength > 0) {
        // create pair
        const pair: Pair = {
          winner: i,
          loser: j,
          strength: strength,
          minority: Math.min(preferences[i][j], preferences[j][i])
        };
        pairs.push(pair);
      }
    }
  }
  return pairs;
}

export function can_reach_from_to(
  from_node: number,
  to_node: number,
  in_matrix: boolean[][]
): boolean {
  if (in_matrix.length !== in_matrix[0].length) {
    console.log("error: expected rectangular matrix");
    return false;
  }

  let can_reach: boolean = false;

  for (let i: number = 0; i < in_matrix.length; i++) {
    if (in_matrix[from_node][i]) {
      if (i === to_node) {
        can_reach = true;
      } else {
        if (can_reach_from_to(i, to_node, in_matrix)) {
          // recursion
          can_reach = true;
        }
      }
    }
  }
  return can_reach;
}

export function sort_pairs(pairs: Pair[]): Pair[] {
  return pairs.sort(function(a, b) {
    let x = b.strength - a.strength;
    // return x === 0 ? a.minority - b.minority : x; // order by minority too?
    return x;
  });
}

export function lock_pairs(pairs: Pair[], size: number): boolean[][] {
  let locked: boolean[][] = Array(size)
    .fill(false)
    .map(() => Array(size).fill(false)); // fill with falses

  for (const pair of pairs) {
    const can_reach = can_reach_from_to(pair.loser, pair.winner, locked);
    if (!can_reach) {
      locked[pair.winner][pair.loser] = true;
    } else {
      locked[pair.winner][pair.loser] = false;
    }
  }
  return locked;
}

export function print_winner(locked: boolean[][]): string {
  let has_inbound_edges: number[] = [];

  for (let i = 0; i < locked.length; i++) {
    has_inbound_edges[i] = 0;
    for (let j = 0; j < locked.length; j++) {
      has_inbound_edges[i] += locked[j][i] ? 1 : 0;
    }
    if (has_inbound_edges[i] === 0) {
      return names[i];
    }
  }
  return "winner not found";
}
