import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setPage } from "../features/data/dataSlice";

export default function Pagination({ total }: { total: number }) {
  const dispatch = useAppDispatch();
  const { page, rowsPerPage } = useAppSelector((s) => s.data);

  const pages = Math.ceil(total / rowsPerPage);

  return (
    <div style={{ marginTop: 15 }}>
      <button disabled={page === 1} onClick={() => dispatch(setPage(page - 1))}>
        Prev
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page} / {pages}
      </span>

      <button
        disabled={page === pages}
        onClick={() => dispatch(setPage(page + 1))}
      >
        Next
      </button>
    </div>
  );
}
