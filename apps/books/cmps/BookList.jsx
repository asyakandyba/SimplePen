import { BookPreview } from './BookPreview.jsx'

const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className="book-list container">
      {books.map(book => (
        <li key={book.id}>
          <BookPreview book={book} />
          <section className="book-features">
            <button className="book-btn">
              <Link to={`/book/${book.id}`}>Details</Link>
            </button>
            <button className="book-btn">
              <Link to={`/book/edit/${book.id}`}>Edit</Link>
            </button>
            <button className="book-btn" onClick={() => onRemoveBook(book.id)}>
              Remove
            </button>
          </section>
        </li>
      ))}
    </ul>
  )
}
