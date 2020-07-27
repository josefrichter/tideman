import * as React from "react";
import "./styles.css";
import VoterForm from "./VoterForm";
import Matrix from "./Matrix";
import BoolMatrix from "./BoolMatrix";
import {
  create_ranks_matrix,
  record_preferences,
  create_pairs,
  sort_pairs,
  lock_pairs,
  print_winner
} from "./tideman";

export default function App() {
  const [votersXranks, setVotersXranks] = React.useState(
    create_ranks_matrix(3, 3) // default 3 voters, 3 candidates
  );

  // main flow
  const prefMatrix = record_preferences(votersXranks);
  const pairs = create_pairs(prefMatrix);
  const sortedPairs = sort_pairs(pairs);
  const locked = lock_pairs(sortedPairs, votersXranks[0].length);
  const winner = print_winner(locked);

  // event handlers
  const handleNoOfCandidatesInput = (event: any) => {
    let votersCount = votersXranks.length;
    let candidateCount = parseInt(event.target.value, 10);
    let newMatrix = create_ranks_matrix(votersCount, candidateCount);
    setVotersXranks(newMatrix);
  };

  const handleNoOfVotersInput = (event: any) => {
    let votersCount = parseInt(event.target.value, 10);
    let candidateCount = votersXranks[0].length;
    let newMatrix = create_ranks_matrix(votersCount, candidateCount);
    setVotersXranks(newMatrix);
  };

  const onUpdateRanks = (voterId: number, newRanks: []) => {
    let newMatrix = [...votersXranks];
    newMatrix[voterId] = newRanks;
    setVotersXranks(newMatrix);
  };

  var voterForms = [];
  for (let i = 0; i < votersXranks.length; i++) {
    voterForms.push(
      <VoterForm
        key={i}
        voterId={i}
        ranks={votersXranks[i]}
        onUpdateRanks={(newRanks: any) => onUpdateRanks(i, newRanks)}
      />
    );
  }

  return (
    <div className="App">
      <h1>Tideman Testing</h1>
      <h3>Start editing to see some magic happen!</h3>
      <br />
      <label>
        Candidate count:&nbsp;
        <input
          type="number"
          onChange={handleNoOfCandidatesInput}
          value={votersXranks[0].length}
          min={2}
          max={9}
          style={{ fontSize: "1em", padding: "5px" }}
        />
      </label>
      &emsp;&emsp;
      <label>
        Voters count:&nbsp;
        <input
          type="number"
          onChange={handleNoOfVotersInput}
          value={votersXranks.length}
          min={1}
          max={9}
          style={{ fontSize: "1em", padding: "5px" }}
        />
      </label>
      <br />
      <br />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {voterForms}
      </div>
      {/* <div>{JSON.stringify(votersXranks)}</div> */}
      <div>
        <h4>Ranks matrix</h4>
        <Matrix data={votersXranks} />
      </div>
      <div>
        <h4>Preferences matrix</h4>
        <Matrix data={prefMatrix} />
      </div>
      <div>
        <h4>Pairs</h4>
        {/* {JSON.stringify(pairs).replace(/"/g, "")} */}
        {pairs.map(p => "(" + p.winner + ", " + p.loser + ")  ")}
        {/* <p>Note: unlike in cs50, strength is added directly to each pair</p> */}
      </div>
      <div>
        <h4>Sorted Pairs</h4>
        {/* {JSON.stringify(sortedPairs).replace(/"/g, "")} */}
        {sortedPairs.map(p => "(" + p.winner + ", " + p.loser + ")  ")}
      </div>
      <div>
        <h4>Locked matrix</h4>
        <BoolMatrix data={locked} />
      </div>
      <div>
        <h4>Winner</h4>
        <h1>{winner}</h1>
      </div>
      <div>
        <p>
          Brought to you by&nbsp;
          <a href="https://www.iphonedesign.info/about">Josef Richter</a>
          <br />
          Created with React & TypeScript in Codesandbox.io (
          <a href="https://codesandbox.io/s/tideman-ib0i4?file=/src/tideman.ts">
            source
          </a>
          )
        </p>
        <p>
          See&nbsp;
          <a href="https://cs50.harvard.edu/x/2020/psets/3/tideman/">
            Tideman description here
          </a>
        </p>
        <h1>Big Thanks</h1>
        <p>to prof. David Malan & whole cs50 staff!</p>
      </div>
    </div>
  );
}
