import type { Row } from "../features/data/dataSlice";


export function computeTotals(rows: Row[]) {
const spend = rows.reduce((sum, r) => sum + r.spend, 0);
const conversions = rows.reduce((sum, r) => sum + r.conversions, 0);
const clicks = rows.reduce((sum, r) => sum + r.clicks, 0);
const impressions = rows.reduce((sum, r) => sum + r.impressions, 0);


const ctr = impressions > 0 ? clicks / impressions : 0;


return { spend, conversions, clicks, impressions, ctr };
}