
export default function Stats({ totals }: unknown) {
  return (
    <div style={{ display: "flex", gap: 30, margin: "20px 0" }}>
      <div>Spend: ${totals.spend.toFixed(2)}</div>
      <div>Conversions: {totals.conversions}</div>
      <div>CTR: {(totals.ctr * 100).toFixed(2)}%</div>
    </div>
  );
}
