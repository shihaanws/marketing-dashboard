import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setFilter } from "../features/data/dataSlice";

export default function Filters() {
  const dispatch = useAppDispatch();
  const { all, filters } = useAppSelector((s) => s.data);

  const channels = [...new Set(all.map((r) => r.channel))];
  const regions = [...new Set(all.map((r) => r.region))];

  return (
    <div style={{ margin: "20px 0", display: "flex", gap: 20 }}>
      <div>
        <label>Channel:</label>
        <select
          value={filters.channel}
          onChange={(e) =>
            dispatch(setFilter({ key: "channel", value: e.target.value }))
          }
        >
          <option value="">All</option>
          {channels.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Region:</label>
        <select
          value={filters.region}
          onChange={(e) =>
            dispatch(setFilter({ key: "region", value: e.target.value }))
          }
        >
          <option value="">All</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
