import * as React from "react";

export const names: string[] = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Emily",
  "Frankie",
  "Geena",
  "Henry",
  "Indira"
]; // some predefined names. NOT cs50

export default function VoterForm(props: any) {
  let ranks = props.ranks;

  let handleChange = (rank: number, newVal: number) => {
    let ranksCopy = [...ranks]; // copy
    const currentIndexOfNewVal = ranks.indexOf(newVal);
    [ranksCopy[rank], ranksCopy[currentIndexOfNewVal]] = [
      ranksCopy[currentIndexOfNewVal],
      ranksCopy[rank]
    ]; // swap
    props.onUpdateRanks(ranksCopy);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: 10 }}>
      Ballot #{props.voterId + 1}:<br />
      {ranks.map((value: number, i: number) => (
        <CandidatePicker
          candidateCount={ranks.length}
          selected={value}
          key={i}
          onChange={(newVal: number) => handleChange(i, newVal)}
        />
      ))}
      <div>ranks={JSON.stringify(ranks)}</div>
    </div>
  );
}

function CandidatePicker(props: any) {
  let options = [];
  for (let i = 0; i < props.candidateCount; i++) {
    options.push(
      <option key={i} value={i}>
        {names[i]}
      </option>
    );
  }

  let onChange = (event: any) => {
    //console.log(~~event?.target.value)
    props.onChange(parseInt(event.target.value, 10)); // it's also the "rank"
  };

  return (
    <select onChange={onChange} value={props.selected}>
      {options}
    </select>
  );
}
