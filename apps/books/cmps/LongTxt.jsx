const { useState } = React

export function LongText({ txt, length = 100 }) {
  const [isReadMore, setIsReadMore] = useState(false)

  function toggleReadMore() {
    setIsReadMore(isReadMore => !isReadMore)
  }

  const firstPart = txt.slice(0, length)
  const rest = txt.slice(length)

  return (
    <section className="long-text">
      <p>
        {isReadMore ? txt : firstPart}
        {rest && (
          <span className="read-more-btn" onClick={toggleReadMore}>
            {isReadMore ? '... read less' : '... read more'}
          </span>
        )}
      </p>
    </section>
  )
}
