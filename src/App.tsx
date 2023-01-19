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
import {
  create_command,
  create_test_data,
  create_random_ranks_matrix
} from "./testdata";
import { create_nodes, create_edges } from "./graph";

// @ts-ignore
import Graph from "react-graph-vis";

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

  const graph = {
    nodes: create_nodes(votersXranks[0].length),
    edges: create_edges(sortedPairs, votersXranks[0].length)
  };
  const graphOptions = {
    layout: {
      hierarchical: false
    },
    physics: {
      enabled: true,
      barnesHut: {
        theta: 0.5,
        gravitationalConstant: -20000,
        centralGravity: 0.8,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 0
      }
    },
    edges: {
      smooth: true
    }
  };
  const testCommand = create_command(votersXranks);
  const testData = create_test_data(votersXranks);

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
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <div style={{ maxWidth: "250px", margin: "10px" }}>
          <label>
            Candidate&nbsp;count:&nbsp;
            <select
              value={votersXranks[0].length}
              onChange={handleNoOfCandidatesInput}
            >
              {Array.from(Array(8).keys()).map(k => (
                <option value={k + 2}>{k + 2}</option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ maxWidth: "250px", margin: "10px" }}>
          <label>
            Voters&nbsp;count:&nbsp;
            <select
              value={votersXranks.length}
              onChange={handleNoOfVotersInput}
            >
              {Array.from(Array(8).keys()).map(k => (
                <option value={k + 2}>{k + 2}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <br />
      <div>
        <button onClick={() => setVotersXranks(create_random_ranks_matrix())}>
          Randomize
        </button>
      </div>
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
      </div>
      <div>
        <h4>Sorted Pairs</h4>
        {/* {JSON.stringify(sortedPairs).replace(/"/g, "")} */}
        {sortedPairs.map(p => "(" + p.winner + ", " + p.loser + ")  ")}
        <br />
        <div className="Note">
          Important: your sorted pairs may look slightly different, depending on
          sorting method you applied, because tied pairs are actually not
          sorted, as per problem specification.
        </div>
        <br />
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
        <h4>Graph</h4>
        <div className="Note">
          Red edges *not* locked, because they would create circle. Graph is
          interactive&hellip;
        </div>
        <br />
        {/* <div>{JSON.stringify(graph)}</div> */}
        {/* <Graph graph={graph} options={options} events={events} style={{ height: "640px" }} /> */}
        <div>
          <Graph
            graph={graph}
            options={graphOptions}
            style={{
              height: "500px",
              maxWidth: "500px",
              margin: "0 auto",
              border: "1px solid #ccc"
            }}
          />
        </div>
      </div>
      <div>
        <h4>Testing in cs50 IDE</h4>
        <div className="Note">
          Copy the below into a file <b>data.txt</b> (including the last
          line-break character!)
        </div>
        <br />
        <pre className="TestData">{testData}</pre>
        <br />
        <div className="Note">and then run the following command</div>
        <pre>{testCommand}</pre>
      </div>
      <br />
      <div>
        <p>
          Brought to you by&nbsp;
          <a href="https://josefrichter.design">Josef Richter</a>
          <br />
          Created with React & TypeScript in Codesandbox.io
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
