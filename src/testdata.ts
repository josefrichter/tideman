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
