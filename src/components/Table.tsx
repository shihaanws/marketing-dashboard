import { useMemo, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Pagination from "./Pagination";
import { setSort } from "../features/data/dataSlice";
import type { Row } from "../features/data/dataSlice";

type TableProps = {
  rows: Row[];
};

export default function Table({ rows }: TableProps) {
  const dispatch = useAppDispatch();
  const { page, rowsPerPage, sortKey, sortDir } = useAppSelector(
    (s) => s.data
  );

  // Early return if no data
  if (!rows || rows.length === 0) {
    return <div style={{ marginTop: 20 }}>No data available</div>;
  }

  // Memoize columns once
  const columns = useMemo(() => Object.keys(rows[0]), [rows]);

  // Optimized sorting with early returns
  const sortedIndexes = useMemo(() => {
    if (!sortKey) return rows.map((_, i) => i);

    const indices = Array.from({ length: rows.length }, (_, i) => i);
    
    return indices.sort((i, j) => {
      const a = rows[i][sortKey];
      const b = rows[j][sortKey];

      let comparison = 0;
      
      if (typeof a === "number" && typeof b === "number") {
        comparison = a - b;
      } else {
        comparison = String(a).localeCompare(String(b));
      }

      return sortDir === "asc" ? comparison : -comparison;
    });
  }, [rows, sortKey, sortDir]);

  // Pagination
  const start = (page - 1) * rowsPerPage;
  const paginatedIndexes = useMemo(
    () => sortedIndexes.slice(start, start + rowsPerPage),
    [sortedIndexes, start, rowsPerPage]
  );
  
  const visible = useMemo(
    () => paginatedIndexes.map((i) => rows[i]),
    [paginatedIndexes, rows]
  );

  // Memoized sort handler
  const handleSort = useCallback(
    (key: keyof Row) => {
      dispatch(setSort(key));
    },
    [dispatch]
  );

  // Memoized row renderer
  const RowRenderer = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const r = visible[index];
      return (
        <div
          style={{
            ...style,
            display: "flex",
            borderBottom: "1px solid #eee",
            padding: "4px 0",
          }}
        >
          {columns.map((key) => (
            <div
              key={key}
              style={{
                flex: 1,
                padding: "4px 8px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {String(r[key as keyof Row])}
            </div>
          ))}
        </div>
      );
    },
    [visible, columns]
  );

  return (
    <div style={{ marginTop: 20 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #ccc",
          fontWeight: "bold",
          paddingBottom: 6,
          cursor: "pointer",
        }}
      >
        {columns.map((key) => (
          <div
            key={key}
            style={{ flex: 1, padding: "0 8px" }}
            onClick={() => handleSort(key as keyof Row)}
          >
            {key}
            {sortKey === key ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
          </div>
        ))}
      </div>

      {/* Virtualized List */}
      <List
        height={400}
        itemCount={visible.length}
        itemSize={38}
        width="100%"
        style={{ border: "1px solid #eee" }}
      >
        {RowRenderer}
      </List>

      <Pagination total={rows.length} />
    </div>
  );
}