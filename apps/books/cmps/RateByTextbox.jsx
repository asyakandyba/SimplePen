export function RateByTextbox({ value, selected }) {
  return (
    <input
      type="number"
      min="1"
      max="5"
      value={value}
      onChange={e => selected(+e.target.value)}
    />
  )
}
