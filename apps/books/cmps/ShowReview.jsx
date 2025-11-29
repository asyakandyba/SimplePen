const { useEffect } = React

export function ShowReviews({ book, deleteReview }) {
  const { reviews } = book
  if (!reviews || !reviews.length) return

  return (
    <section className="show-reviews">
      {reviews.map(review => (
        <div className="review-row" key={review.id}>
          <p>{review.fullname}</p>
          <p>{review.rating}</p>
          <p>{review.readAt}</p>
          <p>{review.description}</p>
          <button
            className="delete-review"
            onClick={() => {
              deleteReview(review)
            }}
          >
            X
          </button>
        </div>
      ))}
    </section>
  )
}
