
import './App.css'
import React, { useMemo } from "react";
import { useAppSelector } from "./store/hooks";
import Table from "./components/Table";
import Filters from "./components/Filters";
import Stats from "./components/Stats";
import PerformanceChart from "./components/PerformanceChart";
import { computeTotals } from "./utils/computeMetrics";


function App() {
const { all, filters } = useAppSelector((s) => s.data);


const filtered = useMemo(() => {
return all.filter((r) => {
return (
(!filters.channel || r.channel === filters.channel) &&
(!filters.region || r.region === filters.region)
);
});
}, [all, filters]);


const totals = useMemo(() => computeTotals(filtered), [filtered]);


return (
<div style={{ padding: 20, fontFamily: "sans-serif" }}>
<h1>Marketing Performance Dashboard</h1>


<Filters />
<Stats totals={totals} />
<PerformanceChart data={filtered} />
<Table rows={filtered} />
</div>
);
}

export default App

