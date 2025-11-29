export function RateBySelect({ value, selected }) {
  return (
    <select value={value} onChange={e => selected(+e.target.value)}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  )
}
