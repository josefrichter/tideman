import * as React from "react";

export default function Matrix(props: any) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <table>
        <tbody>
          {props.data.map((row: any, i: number) => (
            <tr key={i}>
              {row.map((col: any, j: number) => (
                <td key={j}>{col ? 1 : 0}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
