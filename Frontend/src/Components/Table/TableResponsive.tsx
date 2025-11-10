import React from "react";
import "../css/TableResponsive.css";

interface TableProps {
  headerTitle?: string[];
  tableData?: React.ReactNode;
  colWidths?: string[];
}

export default function TableResponsive({
  headerTitle,
  tableData,
  colWidths,
}: TableProps) {
  return (
    <table className="table-responsive">
      {colWidths && (
        <colgroup>
          {colWidths.map((width, idx) => (
            <col key={idx} style={{ width }} />
          ))}
        </colgroup>
      )}
      <thead>
        <tr>
          {headerTitle &&
            headerTitle.map((title, idx) => <th key={idx}>{title}</th>)}
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
}
