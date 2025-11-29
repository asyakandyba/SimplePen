export function RateByStars({ value, selected }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(num => (
        <span
          key={num}
          style={{ cursor: 'pointer' }}
          onClick={() => selected(num)}
        >
          {num <= value ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
}
