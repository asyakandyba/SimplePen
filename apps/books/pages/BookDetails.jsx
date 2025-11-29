import { AddReview } from '../cmps/AddReview.jsx'
import { LongText } from '../cmps/LongTxt.jsx'
import { ShowReviews } from '../cmps/ShowReview.jsx'
import { bookService } from '../services/book.service.js'
import { currencySign, setLanguage } from '../services/util.service.js'

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false)
  const { bookId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [bookId])

  function loadBook() {
    bookService.get(bookId).then(setBook).catch(console.log)
  }

  function onBack() {
    navigate('/book')
  }

  function saveReview(review) {
    bookService
      .addReview(bookId, review)
      .then(savedReview => {
        addReviewToggle()
        showSuccessMsg('Review saved!')
        let reviews
        if (book.reviews) reviews = [...book.reviews, review]
        else reviews = [review]
        setBook({ ...book, reviews })
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Problem saving review')
      })
  }

  function deleteReview(review) {
    bookService
      .removeReview(bookId, review)
      .then(() => {
        setBook(prevBook => ({
          ...prevBook,
          reviews: prevBook.reviews.filter(
            currReview => currReview.id !== review.id
          ),
        }))
        showSuccessMsg(`Review removed successfully (${bookId})`)
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Cannot remove Review')
      })
  }

  function addReviewToggle() {
    setIsAddReviewOpen(isAddReviewOpen => !isAddReviewOpen)
  }

  if (!book) return <div>Loading...</div>

  function pageCountText() {
    if (book.pageCount > 500) return 'Serious Reading'
    else if (book.pageCount > 200) return 'Descent Reading'
    else return 'Light Reading '
  }

  function bookState() {
    const bookAge = new Date().getFullYear() - book.publishedDate
    if (bookAge > 10) return 'Vintage'
    else if (bookAge < 1) return 'New'
  }

  function priceColorClass() {
    if (book.listPrice.amount > 150) return 'red'
    else if (book.listPrice.amount < 20) return 'green'
  }

  return (
    <section className="book-details container">
      {book.listPrice.isOnSale && <div className="on-sale">On Sale!</div>}
      <h1>{book.title}</h1>
      <h2>By {[...book.authors]}</h2>
      <p>Language: {setLanguage(book.language)}</p>
      <p>
        Pages: {book.pageCount}, {pageCountText()}
      </p>
      <p>
        Published: {book.publishedDate}, {bookState()}
      </p>
      <button onClick={addReviewToggle}>Write a Review</button>

      <h2>Description</h2>
      <LongText txt={book.description} length={100} />

      <p className={priceColorClass()}>
        {' '}
        {book.listPrice.amount +
          ' ' +
          currencySign(book.listPrice.currencyCode)}
      </p>
      <button onClick={onBack}>Back</button>

      <section className="book-img-container">
        <img src={book.thumbnail} />
        <button>
          <Link to={`/book/${book.prevBookId}`}>Prev</Link>
        </button>
        <button>
          <Link to={`/book/${book.nextBookId}`}>Next</Link>
        </button>
      </section>

      <ShowReviews book={book} deleteReview={deleteReview} />

      {isAddReviewOpen && (
        <AddReview saveReview={saveReview} addReviewToggle={addReviewToggle} />
      )}
    </section>
  )
}
