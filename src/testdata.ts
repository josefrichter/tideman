import { names } from "./VoterForm";

export function create_command(ranksMatrix: number[][]): string {
  const candidate_count = ranksMatrix[0].length;

  let output = "./tideman";

  for (let i = 0; i < candidate_count; i++) {
    output += " " + names[i];
  }

  output += " < data.txt";

  return output;
}

export function create_test_data(ranksMatrix: number[][]): string {
  const voters_count = ranksMatrix.length;

  let output: string =
    voters_count +
    "\n" +
    ranksMatrix
      .map((row: number[]) => row.map((col: number) => names[col]).join("\n"))
      .join("\n") +
    "\n ";

  return output;
}

export function create_random_ranks_matrix(): number[][] {
  let candidate_count = randomNumber(2, 9);
  let voters_count = randomNumber(2, 9);

  let default_voters_ranks: number[][] = [];
  for (let i = 0; i < voters_count; i++) {
    let default_ranks = Array.from(Array(candidate_count).keys());
    default_ranks = shuffle(default_ranks);
    default_voters_ranks.push(default_ranks);
  }
  return default_voters_ranks;
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array: number[]): number[] {
  const shuffled = array
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
  return shuffled;
}
